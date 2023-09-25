import React from 'react';
import axios from "axios"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from "sweetalert2";
function ResetPassword() {
    const validationSchema = Yup.object().shape({
    
      email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(40, 'Password must not exceed 40 characters'),
        reEnterPassword: Yup.string()
        .required('reEnterPassword is required')
        .oneOf([Yup.ref('reEnterPassword'), null], 'reEnterPassword does not match'),
        confirmpassword : Yup.string()
        .required('confirmpassword is required')
        .oneOf([Yup.ref('confirmpassword'), null], 'confirmpassword does not match'),
      
    });


  
   function sendData(user){
    const { email, oldpassword, newpassword, confirmpassword} = user
    if( email && oldpassword && (newpassword===confirmpassword)){
  axios.post("http://localhost:9002/resetpassword", user)
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
   }

    const {
      register,
      handleSubmit,
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
        <form >
            <h2>Register</h2>
           

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
            
          <div className="form-group">
          <label>Re-Enter Password</label>
          <input  name="reEnterPassword" type="reEnterPassword" {...register('reEnterPassword')} className={`form-control ${errors.reEnterPassword ? 'is-invalid' : ''}`}/>
          <div className="invalid-feedback">{errors.reEnterPassword?.message}</div>
          </div>

          <div className="form-group">
          <label>confirm Password</label>
          <input  name="confirmpassword" type="confirmpassword" {...register('confirmpassword')} className={`form-control ${errors.confirmpassword ? 'is-invalid' : ''}`}/>
          <div className="invalid-feedback">{errors.confirmpassword?.message}</div>
          </div>

                    
          <div className="form-group">
          <button type="submit" className="btn btn-primary" onSubmit={handleSubmit(onSubmit)}>Reset Password</button>
          
            
        </div>
        
        </form>
        </div>
        
    
    )


    }
export default ResetPassword