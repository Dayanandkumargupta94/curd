import React from 'react';
import axios from "axios"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


function Log() {
    const history = useHistory()
    const validationSchema = Yup.object().shape({
      
      email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(40, 'Password must not exceed 40 characters'),
        
       
    });


  
   function sendData(user){
  axios.post("http://localhost:9002/log", user)
    .then((res) => {
      Swal.fire({
        title: res.data.message,
        showClass: {
          popup: "animate__animated animate__fadeInDown"
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp"
        }
        
       
      });
    //   setLoginUser(res.data.user)
    //   history.push("/")

    })
    .catch((error) => {
      Swal.fire({
        title: "Registration Failed",
        text: "An error occurred while registering. Please try again later.",
        icon: "error",
        showClass: {
          popup: "animate__animated animate__fadeInDown"
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp"
        }
      });
    });

   }
  

   const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });
  
    const onSubmit = data => {
      console.log(JSON.stringify(data, null, 2));
      sendData(data)
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login">
            {/* {console.log("User", user)}  */}
            <h2>Login</h2>
            <div className="form-group">
          <label>Email</label>
          <input name="email" type="text"  {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`}/>
          <div className="invalid-feedback">{errors.email?.message}</div>
          </div>
          <div className="form-group">
          <label>Password</label>
          <input  name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}/>
          <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

            <button className="button btn btn-sm btn-success my-2" onClick={(reset) => history.push("/forgetpassword")}>Forget Password</button>
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group mr-2" role="group" aria-label="First group">
                    <button className="button btn btn-primary my-2" onClick={reset} >Login</button>
                </div>
                <div className="btn-group mr-2" role="group" aria-label="Second group">
                    <button className="button btn btn-primary my-2" onClick={(reset) => history.push("/register")}>Register</button>
                </div>
                <div className="btn-group mr-2" role="group" aria-label="Second group">
                    <button className="button btn btn-warning my-2" onClick={(reset) => history.push("/resetpassword")}>Reset Password</button>
                </div>
            </div>


            </div>
            </form>
        </div>
    )
}


export default Log