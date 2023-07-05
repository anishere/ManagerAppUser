import React, { useState } from 'react';
import './login.scss'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authSlice';
import { useEffect } from 'react';

function Login(props) {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)

    const navigate = useNavigate()


    //redux
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.authenticated);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    //nếu call api thanh công thì res sẽ có email
    //fail bại sẽ ko có email trả về
    //**** */
    const  handleLogin = () => {
        const res = dispatch(login({email : name.trim(), password}))
        if(res && res.arg.email === 'eve.holt@reqres.in'){
            toast.success('Login success')
            navigate('/')
        }
    }

    const handleBack = () => {
        navigate('/')
    }

    const handlePressEnter = (e) => {
        if(e.key === 'Enter') {
            handleLogin()
        }
    }

    useEffect(() => {
        if( error ) {
            toast.error('User not found')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);
    
    if( isAuth ) {
        navigate('/')
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
                    onKeyDown={(e) => handlePressEnter(e)}
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
                {loading && <i className="fas fa-circle-notch fa-spin"></i>}
                &nbsp; Log in
            </button>
            <div className='goBack'>
                <span onClick={() => {handleBack()}}>
                    <i className="fa-solid fa-angle-left mx-1"></i>
                    Go back
                </span>
            </div>
        </div>
    );
}

export default Login;