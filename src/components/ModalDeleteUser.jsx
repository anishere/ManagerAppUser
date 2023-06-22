import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {toast } from 'react-toastify';
import {deleteUser} from '../services/UserService'

function ModalDeleteUser(props) {
    const {show, handleClose, dataUserDelete, handleDeleteUserFromModal} = props;

    const handleConfirm = async () => {
        //nếu api sống thì chỉ cần send id user lên api và confirm thành công 
        let res = await deleteUser(dataUserDelete.id)
        if(res && +res.statusCode === 204) {
            toast.success('User deleted successfully')
            handleClose();
            //thì chỉ cần gửi tính hiệu để table call api listUser là xong
            handleDeleteUserFromModal(dataUserDelete);
        }
    }

    return (
        <>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
            <Modal.Title>Create a new user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure Delete this user 
                <br />
                <b>Email : {dataUserDelete.email}</b>
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

export default ModalDeleteUser;