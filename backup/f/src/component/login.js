import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2";

const Login = ({ setLoginUser}) => {

    const history = useHistory()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })


    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    const login = () => {
        const {email, password} = user
        if (email && password) {

            axios.post("http://localhost:9002/login", user)
                .then(res => {Swal.fire({
                  title: res.data.message,
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
                })

              setLoginUser(res.data.user)
              history.push("/")
                
              })

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
        <div className="login">
            {console.log("User", user)}
            <h2>Login</h2>
            <input className="form-control my-2" type="text" name="email" value={user.email} placeholder=" Your Email" onChange={handleChange} />
            <input className="form-control my-2" type="password" name="password" value={user.password} placeholder=" Your Password" onChange={handleChange} />
            
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group mr-2" role="group" aria-label="First group">
                    <div className="button btn btn-primary my-2" onClick={login} >Login</div>
                </div>
                <div className="btn-group mr-2" role="group" aria-label="Second group">
                    <div className="button btn btn-primary my-2" onClick={() => history.push("/register")}>Register</div>
                </div>
                <div className="btn-group mr-2" role="group" aria-label="Second group">
                    <div className="button btn btn-warning my-2" onClick={() => history.push("/resetpassword")}>Reset Password</div>
                </div>
            </div>



        </div>
    )
}


export default Login