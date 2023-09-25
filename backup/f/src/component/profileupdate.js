import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2";

const Profileupdate = ({users, setLoginUser}) => {

    const history = useHistory()

    const [values, setValues] = useState(users)


    const handleChange = e => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value });
    }
    const update = () => {
        const { firstname,lastname, email, address,phoneno,companyname  } = values
        if (firstname && lastname  && address && phoneno && companyname) {

            axios.post("http://localhost:9002/profileupdate", values)
                .then(res => {Swal.fire({
                  title: res.data.message,
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
                })
                setLoginUser(values)
                history.push("/")})

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
            <h2>Update Profile</h2>
            <h1>{console.log(users)}</h1>
            <label htmlFor="email"> Email </label>
            <input value={values.email} className="form-control my-2" readOnly type="text" name="email" onChange={handleChange} />

            <label htmlFor="firstname"> First Name </label>
            <input className="form-control my-2" type="text" name="firstname"  value={values.firstname} onChange={handleChange} />

            <label htmlFor="lastname"> Last Name </label>
            <input className="form-control my-2" type="text" name="lastname"  value={values.lastname} onChange={handleChange} />
            
            <label htmlFor="address"> Address </label>
            <input className="form-control my-2" type="text" name="address" value={values.address} onChange={handleChange} />

            <label htmlFor="phoneno"> Phone Number </label>
            <input className="form-control my-2" type="tel" name="phoneno" value={values.phoneno} onChange={handleChange} />

            <label htmlFor="companyname"> Company Name </label>
            <input className="form-control my-2" type="text" name="companyname" value={values.companyname} onChange={handleChange} />

            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group mr-2" role="group" aria-label="First group">
                    <div className="button btn btn-success my-2" onClick={update} >Update</div>
                </div>
                <div className="btn-group mr-2" role="group" aria-label="Second group">
                    <div className="button btn btn-warning my-2" onClick={() => history.push("/")}>Cancel</div>
                </div>

            </div>



        </div>
    )
}


export default Profileupdate