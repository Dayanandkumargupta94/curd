
import React from 'react';
import axios from "axios"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from "sweetalert2";

function Forgetpassword() {
    const validationSchema = Yup.object().shape({
      
      email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
      
    });

    
   function sendData(user){
    axios.post("http://localhost:9002/forgetpassword", user)
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
    
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
      });
    
      const onSubmit = data => {
        console.log(JSON.stringify(data, null, 2));
        sendData(data)
      };


    // const Login = () => {

    return (
       <div>
        {/* <form onClick={handleSubmit(onSubmit)} > */}
        <div className="form-group">
        <label>Email</label>
        <input name="email" type="text"  {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`}/>
        <div className="invalid-feedback">{errors.email?.message}</div>
        <div className="button btn btn-primary my-2" onClick={handleSubmit(onSubmit)}>Submit</div>
        </div>
        {/* </form> */}
       </div>
    )
}


export default Forgetpassword