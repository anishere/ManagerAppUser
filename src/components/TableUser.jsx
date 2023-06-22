import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import {fetchAllUsers} from '../services/UserService'
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser'
import _ from 'lodash';
import ModalDeleteUser from './ModalDeleteUser';

function TableUser(props) {
    const [listUsers, setListUsers] = useState([])
    const [totalPages, setTotalPages] = useState(0)

    //đặt flag để cho modal mở hay đóng
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false)

    const [dataUserEdit, setDataUserEdit] = useState({})

    const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false)
    const [dataUserDelete, setDataUserDelete] = useState({})

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

    const handlePageClick = (even) => {
        getUsers(+even.selected + 1)
    }

    return (<>
        <div className='my-3 d-flex justify-content-between align-items-center'>
          <span className='fw-bold'>List Users</span>
          <button
           className='btn btn-primary'
           onClick={() => setIsShowModalAddNew(true)}
          >Add new user</button>
        </div>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>ID</th>
            <th>email</th>
            <th>First name</th>
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
                                <button className='btn btn-warning mx-3'
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