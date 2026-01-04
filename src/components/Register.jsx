import { NavLink } from 'react-router-dom'
import './Style.css'
import {  useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast, { ToastBar, Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function Register() {

    const {register, handleSubmit,watch, setFocus, formState:{ errors }} = useForm();


const onRegister = async (data) => {
  toast.loading('Loading content..', { id: 'Toaster' });

  const res = await axios.post("http://localhost:5308/register", data);
  const resData = res.data;

  setTimeout(() => {
    if (resData.status) {
      toast.success('Registered successfully !', { id: 'Toaster' });
    } else {
      toast.error('Registration failed !', { id: 'Toaster' });
    }
  }, 2000);
};

    const password = watch('password');

    useEffect (()=>{
        setFocus('fullName');
    }, [])

    return (
        <>
         <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
            <div className="login-container">
                <div className="login-box">
                    <form onSubmit={handleSubmit(onRegister)}>
                        <div className="input-field">
                            <label>Full Name: </label>
                            <div className="input-with-icon">
                                <i className="ri-user-fill"></i>
                                <input 
                                {...register('fullName',{required: "Full Name is required"
                                    ,minLength:{
                                        value: 8,
                                        message: "Full Name should be at least 8 characters"
                                    }
                                })}
                                type='text'></input>
                            </div>
                            {
                                errors.fullName && 
                                <p style={{marginTop: '5px', color: 'red', fontSize:'13px', fontWeight:'520'}}>{errors.fullName.message}</p>
                            }
                        </div>
                        <div className="input-field">
                            <label>User Name: </label>
                            <div className="input-with-icon">
                                <i className="ri-user-2-fill"></i>
                                <input 
                                {...register('userName',{required: "User Name is required" })}
                                type='email'></input>
                            </div>
                            {
                                errors.userName && 
                                <p style={{marginTop: '5px', color: 'red', fontSize:'13px', fontWeight:'520'}}>{errors.userName.message}</p>
                            }
                        </div>
                        <div className="input-field">
                            <label>Mobile Number: </label>
                            <div className="input-with-icon">
                                <i className="ri-phone-fill"></i>
                                <input
                                {...register('mobileNo',{required: "Mobile Number is required" 
                                    ,pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Mobile Number must be 10 digits"
                                    }
                                })}
                                type='number'></input>
                            </div>
                            {
                                errors.mobileNo && 
                                <p style={{marginTop: '5px', color: 'red', fontSize:'13px', fontWeight:'520'}}>{errors.mobileNo.message}</p>
                            }
                        </div>
                        <div className="input-field">
                            <label>Password: </label>
                            <div className="input-with-icon">
                                <i className="ri-key-fill"></i>
                                <input
                                {...register('password',{required: "Password is required"
                                    ,minLength:{
                                        value: 8,
                                        message: "Full Name should be at least 8 characters"
                                    }
                                })}
                                type='password'></input>
                            </div>
                            {
                                errors.password && 
                                <p style={{marginTop: '5px', color: 'red', fontSize:'13px', fontWeight:'520'}}>{errors.password.message}</p>
                            }
                        </div>
                        <div className="input-field">
                            <label>Confirm Password: </label>
                            <div className="input-with-icon">
                                <i className="ri-key-fill"></i>
                                <input
                                {...register('confirmPassword',{required: "Confirm Password is required" 
                                    ,validate:(value)=> value === password || "Passwords do not match"
                                })}
                                type='password'></input>
                            </div>
                            {
                                errors.confirmPassword && 
                                <p style={{marginTop: '5px', color: 'red', fontSize:'13px', fontWeight:'520'}}>{errors.confirmPassword.message}</p>
                            }
                        </div>
                        <button type='submit'>Register</button>
                        <p>Already have an account? <NavLink to='/'>Click Here</NavLink> for Login</p>
                    </form>
                    <div className="gradient">
                        <h2>Register Here !!</h2>
                    </div>
                </div>

            </div>
        </>
    )
}