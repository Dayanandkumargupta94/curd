import React from 'react';
import axios from "axios"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from "sweetalert2";
function Register() {
    const validationSchema = Yup.object().shape({
      firstname: Yup.string().required('firstname is required'),
      lastname: Yup.string().required('lastname is required'),
    //   username: Yup.string()
    //     .required('Username is required')
    //     .min(6, 'Username must be at least 6 characters')
    //     .max(20, 'Username must not exceed 20 characters'),
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
      acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
      address: Yup.string().required('address is required'),
      phoneno: Yup.string().required('phoneno is required'),
      companyname: Yup.string().required('companyname is required'),


    });


  
   function sendData(user){
  axios.post("http://localhost:9002/register", user)
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
            <h2>Register</h2>
            <div className="form-group">
            <label>First Name</label>
            <input name="firstname" type="text"  {...register('firstname')}  className={`form-control ${errors.firstname ?  'is-invalid' : ''}`}/>
            <div className="invalid-feedback">{errors.firstname?.message}</div>
            </div>
            <div className="form-group">
            <label> Last Name</label>
            <input name="lastname" type="text"  {...register('lastname')}  className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}/>
            <div className="invalid-feedback">{errors.lastname?.message}</div>
            </div>


            <div className="form-group">
            <label> Last Name</label>
            <input name="lastname" type="text"  {...register('lastname')}  className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}/>
            <div className="invalid-feedback">{errors.lastname?.message}</div>
            </div>
            

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
          <label>Address Name</label>
          <input  name="address" type="address" {...register('address')} className={`form-control ${errors.address ? 'is-invalid' : ''}`}/>
          <div className="invalid-feedback">{errors.address?.message}</div>
          </div>
            
          <div className="form-group">
          <label>Phone Number</label>
          <input  name="phoneno" type="phoneno" {...register('phoneno')} className={`form-control ${errors.phoneno ? 'is-invalid' : ''}`}/>
          <div className="invalid-feedback">{errors.phoneno?.message}</div>
          </div>
            
          <div className="form-group">
          <label>Company Name</label>
          <input  name="companyname" type="companyname" {...register('companyname')} className={`form-control ${errors.companyname ? 'is-invalid' : ''}`}/>
          <div className="invalid-feedback">{errors.companyname?.message}</div>
          </div>
          <div className="form-group form-check">
          <input  name="acceptTerms"  type="checkbox" {...register('acceptTerms')}  className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : '' }`} />
          <label htmlFor="acceptTerms" className="form-check-label">
            I have read and agree to the Terms
          </label>
          <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
        </div>
            
          <div className="form-group">
          <button type="submit" className="btn btn-primary">Register</button>
          <button type="button" onClick={reset} className="btn btn-warning float-right"> Reset </button>
            
        </div>
        
        </form>
        </div>
        
    
    )


    }
export default Register