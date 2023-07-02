import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import {fetchAllUsers} from '../services/UserService'
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser'
import _ from 'lodash';
import ModalDeleteUser from './ModalDeleteUser';
import './TableUser.scss'
import {debounce} from 'lodash'
import { CSVLink} from "react-csv";
import { toast } from 'react-toastify';
import Papa from "papaparse";

function TableUser(props) {
    const [listUsers, setListUsers] = useState([])
    const [totalPages, setTotalPages] = useState(0)

    //đặt flag để cho modal mở hay đóng
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false)

    const [dataUserEdit, setDataUserEdit] = useState({})

    const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false)
    const [dataUserDelete, setDataUserDelete] = useState({})

    // eslint-disable-next-line no-unused-vars
    const [sortBy, setSortBy] = useState('asc')
    // eslint-disable-next-line no-unused-vars
    const [sortField, setSortField] = useState('id')

    //Mảng quản lí table export (mảng cha)
    const [dataExport, setDataExport] = useState([])

    //truyền hàm để ko bị lỗi 're-render'
    const handleClose = () => {
        setIsShowModalAddNew(false)
        setIsShowModalEditUser(false)
        setIsShowModalDeleteUser(false)
    }

    const handleUpdateTable = (user) => {
        setListUsers([user,...listUsers])
    }

    //Cung cấp data EditUser và show modal
    const handleEditUser = (user) => {
        setIsShowModalEditUser(true)
        setDataUserEdit(user)
    }

    //lấy data từ component con và update user
    const handleUpdateUser = (user) => {
        //sử dụng _.clone của lodash giải quyết vấn đề cùng địa chỉ
        let cloneListUser = _.clone(listUsers)
        let index = listUsers.findIndex(item => item.id === user.id)
        cloneListUser[index].first_name = user.first_name
        setListUsers(cloneListUser)
    }

    const handleDeleteUser = (user) => {
        setIsShowModalDeleteUser(true)
        setDataUserDelete(user)
    }

    //nếu api sống thì chỉ cần nhận tín hiệu từ modal và call api getUser cho table là dc
    const handleDeleteUserFromModal = (user) => {
        //sử dụng _.clone của lodash giải quyết vấn đề cùng địa chỉ
        let cloneListUser = _.clone(listUsers)
        cloneListUser = cloneListUser.filter(item => item.id !== user.id)
        setListUsers(cloneListUser)
    }

    useEffect(() => {
        //dry
        //mặc định page là 1
        getUsers(1)
    },[])

    
    const getUsers = async (page) => {
        //get api
        let res = await fetchAllUsers(page);
        if(res && res.data){
            setTotalPages(res.total_pages)
            setListUsers(res.data)
        }
    }

    //selected bắt đầu từ 0 1 2 // page bắt đầu từ 1 2 3
    const handlePageClick = (even) => {
        getUsers(+even.selected + 1)
    }

    const handleSort = (sortField, sortBy) => {
        //Quản lí sortField, sortBy để khi người dùng back lại trang vẫn sắp xếp như vậy
        setSortField(sortField)
        setSortBy(sortBy)
        //Nếu api sống thì chỉ cần call api bước này và truyền sortField, sortBy
        //Và Page muốn lấy
        let cloneListUser = _.clone(listUsers)
        cloneListUser = _.orderBy(cloneListUser, sortField, sortBy);
        //Sau đó call api ListUser là ok
        setListUsers(cloneListUser);
    }

    //Dùng lodash debounce bọc hàm để xử lí khi gõ vào ô input call api quá nhiều lần
    const handleSearchUserS = debounce((e) => {
        let term = e.target.value
        console.log('check call api', term)
        //Nếu api sống thì ta chỉ cần call api và truyền term(keySearch) vào
        //Lọc term(keySearch) và cập nhật lại list user
        if (term) {
            let cloneListUser = _.clone(listUsers)
            cloneListUser = cloneListUser.filter(item => item.email.includes(term))
            setListUsers(cloneListUser);
        } else {
            getUsers()
        }
    }, 300)

    // [ mảng table(cha)
    //     ["firstname", "lastname", "email"], mảng rowHeader
    //     ["Ahmed", "Tomi", "ah@smthing.co.com"], rowItem
    //     ["read", "Label", "rl@smthing.co.com"], rowItem
    //     ["name", "Min l3b", "ymin@cocococo.com"] rowItem

    // ];
    const handleExport = (event, done) => {
        //Mảng Table(cha) 
        let result = []
        if(listUsers && listUsers.length > 0) {
            //Push mảng chứa rowHeader
            result.push(['Id', 'Email', 'First Name', 'Last Name'])
            // eslint-disable-next-line array-callback-return
            listUsers.map((item) => {
                //Mảng chứa rowItem (mỗi item tương đương một hàng)
                let arrBody = []
                arrBody[0] = item.id
                arrBody[1] = item.email
                arrBody[2] = item.first_name
                arrBody[3] = item.last_name
                result.push(arrBody)
            })
            //set mảng table cho state
            setDataExport(result)
            done()
        }
    }

    const handleImportCSV = (e) => {
        if(e.target && e.target.files && e.target.files[0]) {
            let file = e.target.files[0]

            if(file.type !== 'text/csv') {
                toast.error('Type file is not a CSV file')
                return 
            }

            Papa.parse(file, { //hàm thư viện
                // header: true,
                complete: function(results) { //hàm thư viện
                    let rawCSV = results.data // Lấy ra arrTable
                    if(rawCSV.length > 0) { //Ràng buộc table phải có data
                        if(rawCSV[0] && rawCSV[0].length === 3) { //Ràng buộc số cột của table

                            // if(rawCSV[0][0] !== 'email' //Ràng buộc tên cột nhưng ko sử dụng
                            // || rawCSV[0][0] !== 'email' //có thể ko ràng buộc
                            // || rawCSV[0][0] !== 'email') 
                            // {
                            //     toast.error('Format Header in file wrong...')
                            // } else {

                                let result = []
                                // eslint-disable-next-line array-callback-return
                                rawCSV.map((item, index) => { 
                                    //Bỏ qua dòng đầu tiên là header và
                                    //ràng buộc số cột của mỗi dòng phải bằng 3
                                    if(index > 0 && item.length === 3) { 
                                        let obj = {}
                                        obj.email = item[0]
                                        obj.first_name = item[1]
                                        obj.last_name = item[2]
                                        result.push(obj)
                                    }
                                })
                                console.log(result)
                                setListUsers(result)
                            //}
                        } else {
                            toast.error('The number of columns must be THREE')
                        }
                    } else {
                        toast.error('Not found data in CSV file...')
                    }
                }
            });
        }
    }

    return (<>
        <div className='my-3 d-sm-flex justify-content-between align-items-center'>
          <span className='fw-bold'>List Users</span>
          <div className='d-flex my-sm-0 my-2'>
            <label htmlFor='importUsers' className='btn btn-primary'>
                <i className="fa-solid fa-file-import me-1"></i>
                Import
            </label>
            <input 
                id='importUsers' 
                type="file" hidden
                onChange={(e) => handleImportCSV(e)}
            />
            <CSVLink 
                data={dataExport}
                filename={"ListUsers.csv"}
                className="btn btn-primary mx-2"
                asyncOnClick={true}
                onClick={handleExport}
            >
                <i className="fa-solid fa-file-arrow-down me-1"></i>
                Export
            </CSVLink>
            <button
                className='btn btn-primary'
                onClick={() => setIsShowModalAddNew(true)}
            >
                    <i className="fa-regular fa-plus me-1"></i> 
                    Add New
            </button>
          </div> 
        </div>
        <div className='my-3 col-12 col-sm-4'>
            <input 
                className='form-control border-success border-2 rounded-pill col-4'
                type="text" 
                placeholder='Search users by email...'
                onChange={(e) => {handleSearchUserS(e)}}
            />
        </div>
        <Table striped bordered hover responsive>
        <thead>
            <tr>
            <th>
                <div className='sort d-flex justify-content-between'>
                    <span>ID</span>
                    <span>
                    <i 
                        className="fa-solid fa-arrow-down-long px-1"
                        onClick={() => handleSort('id', 'desc')}
                    ></i>
                    <i 
                        className="fa-solid fa-arrow-up-long"
                        onClick={() => handleSort('id', 'asc')}
                    ></i>
                    </span>
                </div>
            </th>
            <th>email</th>
            <th>
            <div className='sort d-flex justify-content-between'>
                    <span>First name</span>
                    <span>
                    <i 
                        className="fa-solid fa-arrow-down-long px-1"
                        onClick={() => handleSort('first_name', 'desc')}
                    ></i>
                    <i 
                        className="fa-solid fa-arrow-up-long"
                        onClick={() => handleSort('first_name', 'asc')}
                    ></i>
                    </span>
                </div>
            </th>
            <th>Last name</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {listUsers && listUsers.length > 0 &&
                listUsers.map((item, index) => {
                    return (
                        <tr key={`index-${index}`}>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>
                                <button className='btn btn-success mx-3'
                                    onClick={() => {handleEditUser(item)}}
                                >Edit
                                </button>
                                {/* test */}
                                <button className='btn btn-danger'
                                    onClick={() => {handleDeleteUser(item)}}
                                >Delete</button>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
        </Table>
        <div className='Paginate'>
            <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPages}

            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            />
        </div>  
        <ModalAddNew 
        show={isShowModalAddNew} 
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
        />
        <ModalEditUser
        show = {isShowModalEditUser}
        handleClose = {handleClose}
        dataUserEdit = {dataUserEdit}
        handleUpdateUser = {handleUpdateUser}
        />
        <ModalDeleteUser
        show = {isShowModalDeleteUser}
        handleClose = {handleClose}
        dataUserDelete = {dataUserDelete}
        handleDeleteUserFromModal = {handleDeleteUserFromModal}
        />
    </>);
}

export default TableUser;