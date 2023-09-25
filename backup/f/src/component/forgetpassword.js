
import React, {useState} from "react"
import axios from "axios"
import Swal from "sweetalert2";
// import { useHistory } from "react-router-dom"

function Forgetpassword() {

    // const history = useHistory()

    const[ user,setUser] = useState({ 
        email:"",
        password:""     
    })

const handleChange = e => {
    const{ name, value} = e.target
    setUser({
        ...user,
        [name]:value
    })
}

const forgetpassword = () => {
    axios.post("http://localhost:9002/login",user)
    .then(res => Swal.fire({
        title: res.data.message,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }))
}


// const Login = () => {

    return(
        <div className="form-group">
            {console.log(user)}
            <h1>Forget Password</h1>
            <input type="text" className="form-control" name="email" value={user.email} onChange={handleChange}  placeholder="Enter your Email"/>
            <input type="password" className="form-control" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" />
    
            <div className="button btn btn-primary" onClick={forgetpassword}>Submit</div>
            {/* <div>or</div>
            <div className="button" onClick={() => history.push("/register")}>Register</div> */}
            {/* <div className="button btn btn-sm btn-warning" onClick={() => history.push("/resetpassword")}>Reset Password</div> */}
        </div>
    )
}


export default Forgetpassword