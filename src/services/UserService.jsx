import axios from './CustomizeAxios'
const fetchAllUsers = (page) => {
    //call api
    return axios.get(`/api/users?page=${page}`)
}

const postCreateUser = (name, job) => {
    return axios.post('/api/users',{name, job})
}

const putUpdateUser = (name, job, uid) => {
    return axios.put(`/api/users/${uid}`,{name, job})
}

const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`)
}

export {fetchAllUsers, postCreateUser, putUpdateUser, deleteUser} 