import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2";

const Register = () => {

    const history = useHistory()

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        reEnterPassword: "",
        address: "",
        phoneno: "",
        companyname: ""

    })


    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    const register = () => {
        const { firstname,lastname, email, password, reEnterPassword,address,phoneno,companyname  } = user
        if (firstname && lastname  && email && password && (password === reEnterPassword) &&  address && phoneno && companyname) {

            axios.post("http://localhost:9002/register", user)
                .then(res => {Swal.fire({
                  title: res.data.message,
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
                })
                history.push("/login")}
                )

        } else {
            Swal.fire({
                title: "Invalid Input !",
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
        }


    }
    return (
        <div className="register">
            {console.log("User", user)}
            <h2>Register</h2>
            <input className="form-control my-2" type="text" name="firstname" value={user.firstname} placeholder="First Name " onChange={handleChange} />
            <input className="form-control my-2" type="text" name="lastname" value={user.lastname} placeholder="Last Name " onChange={handleChange} />
            <input className="form-control my-2" type="text" name="email" value={user.email} placeholder="Email" onChange={handleChange} />
            <input className="form-control my-2" type="password" name="password" value={user.password} placeholder=" Your Password" onChange={handleChange} />
            <input className="form-control my-2" type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder=" Re-enter Password" onChange={handleChange} />

            
            <input className="form-control my-2" type="text" name="address" value={user.address} placeholder="Address" onChange={handleChange} />
            <input className="form-control my-2" type="tel" name="phoneno" value={user.name} placeholder="Phone No" onChange={handleChange} />
            <input className="form-control my-2" type="text" name="companyname" value={user.name} placeholder="Company Name" onChange={handleChange} />

            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group mr-2" role="group" aria-label="First group">
                    <div className="button btn btn-primary my-2" onClick={register} >Register</div>
                </div>
                <div className="btn-group mr-2" role="group" aria-label="Second group">
                    <div className="button btn btn-primary my-2" onClick={() => history.push("/login")}>Login</div>
                </div>

            </div>



        </div>
    )
}


export default Register