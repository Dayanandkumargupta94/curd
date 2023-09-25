import React, {useState} from "react"
import axios from "axios"
// import { useHistory } from "react-router-dom"
import Swal from "sweetalert2";

function Resetpassword() {

    // const history = useHistory()

    const[ user,setUser] = useState({ 
        email:"",
        oldpassword:"",
        newpassword:"",
        confirmpassword:""     
    })

const handleChange = e => {
    const{ name, value} = e.target
    setUser({
        ...user,
        [name]:value
    })
}

const resetpassword = () => {
    console.log(user);
    const { email, oldpassword, newpassword, confirmpassword} = user
    if( email && oldpassword && (newpassword===confirmpassword)){
    
       axios.post("http://localhost:9002/resetpassword",user)
        .then(res => Swal.fire({
            title: res.data.message,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          }))
    }else{
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
    //  axios.post("http://localhost:9002/login",user)
    //  .then(res => alert(res.data.message))
}


// const Login = () => {

    return(
        <div className="resetpassword">
            {console.log(user)}
            <h2>Reset Password</h2>
            <input className="form-control my-2" type="text" name="email" value={user.email} onChange={handleChange}  placeholder="Enter your Email"/>
            <input className="form-control my-2" type="password" name="oldpassword" value={user.oldpassword} onChange={handleChange}  placeholder="Enter your old Password"/>
            <input className="form-control my-2" type="password" name="newpassword" value={user.newpassword} onChange={handleChange}  placeholder="Enter your new Password"/>
            <input className="form-control my-2" type="password" name="confirmpassword" value={user.confirmpassword} onChange={handleChange}  placeholder="Enter your Confirm Password"/>
            
            <div className="button btn btn-md btn-primary" onClick={resetpassword}>Reset Password</div>

          
            {/* <div className="button btn btn-sm btn-warning" onClick={() => history.push("/resetpassword")}>Reset Password</div> */}
        </div>
    )
}


export default Resetpassword