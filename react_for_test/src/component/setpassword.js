import React, {useState} from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2";

const Setpassword = ({ otpp, setOtp }) => {

const history = useHistory()

const[ user,setUser] = useState({ 
    email: otpp.email,
    otp:"",
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

const setpassword = () => {
    const {email, otp, newpassword, confirmpassword} = user
    console.log(otp);
    console.log(otpp.otp);
    if(newpassword == confirmpassword){
      if(otp == otpp.otp){
        axios.post("http://localhost:9002/resetpass",user)
        .then(res => Swal.fire({
            title: res.data.message,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          }))
          history.push("/login")
    }else{
        Swal.fire({
            title: "OTP is not correct",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
    }
    }else{
      axios.post("http://localhost:9002/resetpass",user)
        .then(res => Swal.fire({
            title: "Confirm password not matched",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          }))
    }
}

  return (
    <div className="resetpassword">
    {console.log(user)}
    <h2>Set new Password</h2>
    <input className="form-control my-2" type="text" hidden name="email" value={otpp.email} onChange={handleChange}  placeholder="Enter your Email"/>
    <input className="form-control my-2" type="text" name="otp" value={user.otp} onChange={handleChange}  placeholder="OTP"/>
    <input className="form-control my-2" type="password" name="newpassword" value={user.newpassword} onChange={handleChange}  placeholder="New Password"/>
    <input className="form-control my-2" type="password" name="confirmpassword" value={user.confirmpassword} onChange={handleChange}  placeholder="Confirm Password"/>
    
    <div className="button btn btn-md btn-primary" onClick={setpassword}>Reset Password</div>

  
    {/* <div className="button btn btn-sm btn-warning" onClick={() => history.push("/resetpassword")}>Reset Password</div> */}
</div>
  )
}


export default Setpassword