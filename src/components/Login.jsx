import { NavLink, useNavigate } from 'react-router-dom'
import './Style.css'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function Login() {

  const { register, handleSubmit, reset, formState: { errors }, setFocus, setValue } = useForm();
  const navigate = useNavigate();

  const onLogin = async (data) => {
    toast.loading('Checking credentials..!', { id: 'loader' });

    setTimeout(async () => {
      try {
        const res = await axios.post('http://localhost:5308/login', data);
        const resData = res.data;

        if (resData.status === true) {
          toast.success(resData.message, { id: 'loader' });
          reset();
          navigate('/dashboard'); 
        } else {
          toast.error(resData.message, { id: 'loader' });

          if (resData.message === 'User not found') {
            reset({ password: '' });
            setFocus('password');
          }
        }
      } catch (error) {
        toast.error('Something went wrong!', { id: 'loader' });
        console.error(error);
      }
    }, 2000);
  };

  useEffect(() => {
    setFocus('userName');
  }, [setFocus]);

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
          <div className="gradient">
            <h2>Welcome User!!</h2>
          </div>
          <form onSubmit={handleSubmit(onLogin)}>
            <i className="ri-hand-heart-fill"></i>

            <div className="input-field">
              <label>User Name: </label>
              <div className="input-with-icon">
                <i className="ri-user-fill"></i>
                <input
                  {...register('userName', {
                    required: "User Name is required"
                  })}
                  type='email'
                />
              </div>
              {errors.userName && (
                <p style={{ marginTop: '5px', color: 'red', fontSize: '13px', fontWeight: '520' }}>
                  {errors.userName.message}
                </p>
              )}
            </div>

            <div className="input-field">
              <label>Password: </label>
              <div className="input-with-icon">
                <i className="ri-key-fill"></i>
                <input
                  {...register('password', {
                    required: "Password is required"
                  })}
                  type='password'
                />
              </div>
              {errors.password && (
                <p style={{ marginTop: '5px', color: 'red', fontSize: '13px', fontWeight: '520' }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            <button type='submit'>Login</button>
            <p>New user? <NavLink to='/register'>Click Here</NavLink> for Sign Up</p>
          </form>
        </div>
      </div>
    </>
  );
}