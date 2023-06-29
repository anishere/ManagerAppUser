import React, { useEffect, useState } from 'react';
import './login.scss'
import {loginApi} from '../../services/UserService'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Login(props) {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        let token = localStorage.getItem('token')
        if(token) {
            navigate('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const  handleLogin = async () => {
        setIsLoading(true)
        let res = await loginApi(name, password)
        if(res && res.token) {
            localStorage.setItem('token', res.token)
            navigate('/')
            toast.success('Log in success')
        } else {
            if( res && res.status === 400) {
                toast.error(res.data.error)
            }
        }
        setIsLoading(false)
    }

    return (
        <div className='login col-11 col-sm-4'>
            <div className='title'>Log in</div>
            <div className='text'>Email or Username ( eve.holt@reqres.in )</div>
            <input 
                type="text" 
                placeholder='Email or Username'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <div className='wrap-password'>
                <input 
                    type={isShowPassword === true ? 'text' : 'password'} 
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <i 
                    className={isShowPassword ? "fa-solid fa-eye" : 'fa-sharp fa-solid fa-eye-slash'}
                    onClick={(e) => setIsShowPassword(!isShowPassword)}
                ></i>
            </div>
            <button 
                className={name && password ? 'active' : ''}
                disabled = {name && password ? false : true}
                onClick={() => handleLogin()}
            >
                {isLoading && <i class="fas fa-circle-notch fa-spin"></i>}
                &nbsp; Log in
            </button>
            <div className='goBack'>
                <i className="fa-solid fa-angle-left mx-1"></i>
                Go back
            </div>
        </div>
    );
}

export default Login;