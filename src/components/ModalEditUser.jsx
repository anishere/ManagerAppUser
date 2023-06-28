import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import {toast } from 'react-toastify';
import { putUpdateUser } from '../services/UserService';

function ModalAddNew(props) {
    const {show, handleClose, dataUserEdit, handleUpdateUser} = props;
    //two way binding để lấy giá trị của name và job khi save
    const [name, setName] = useState('')
    const [job, setJob] = useState('')

    useEffect(() => {
      setName(dataUserEdit.first_name)
    }, [dataUserEdit])

    //trên thực tế thì chỉ cần put api thành công và call api(get api tại table) là dc
    const handleConfirm = async () => {
      //get api ( put name job từ ô input và user id từ button EditUser lên api)
      let res = await putUpdateUser(name, job, dataUserEdit.id)
      //xác nhận call api thành công bằng if
      if(res && res.updatedAt) {
        //truyền data từ input cho hàm của component cha
        handleUpdateUser({
          first_name: name,
          //id dc lấy khi bấm EditUser
          id: dataUserEdit.id
        })
        handleClose()
        toast.success('Updated user')
      }
    }

    return (
        <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit an user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div classNameName="mb-3">
                <label htmlFor="exampleInputEmail1" classNameName="form-label">Name</label>
                <input 
                    type="text" 
                    classNameName="form-control" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div classNameName="mb-3">
                <label htmlFor="exampleInputPassword1" classNameName="form-label">Job</label>
                <input 
                type="text" 
                classNameName="form-control" 
                id="exampleInputPassword1"
                value={job}
                onChange={(e) => setJob(e.target.value)}
            />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
        </Modal>
        </>
    );
}

export default ModalAddNew;