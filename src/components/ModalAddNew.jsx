import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { postCreateUser } from '../services/UserService';
import {toast } from 'react-toastify';

function ModalEditUser(props) {
    const {show, handleClose, handleUpdateTable} = props;
    //two way binding để lấy giá trị của name và job khi save
    const [name, setName] = useState('')
    const [job, setJob] = useState('')

    const handleSave = async () => {
      let res = await postCreateUser(name, job)
      if(res && res.id) {
        handleClose()
        setName('')
        setJob('')
        handleUpdateTable({first_name: name, id: res.id})
        toast.success('A User has been created')
      } else {
        //error
        toast.error('An error has occurred')
      }
     
    }

    return (
        <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Job</label>
                <input 
                type="text" 
                className="form-control" 
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
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Modal>
        </>
    );
}

export default ModalEditUser;