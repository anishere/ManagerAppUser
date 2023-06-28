import React, { useState } from 'react';
import './login.scss'

function Login(props) {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)

    return (
        <div className='login col-11 col-sm-4'>
            <div className='title'>Log in</div>
            <div className='text'>Email or Username</div>
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
            >Log in</button>
            <div className='goBack'>
                <i className="fa-solid fa-angle-left mx-1"></i>
                Go back
            </div>
        </div>
    );
}

export default Login;