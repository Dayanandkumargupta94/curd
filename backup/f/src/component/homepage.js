import React from "react"
import { useHistory } from "react-router-dom"

const Homepage = ({ user, setLoginUser }) => {
    const history = useHistory()
    return(
        <div className="homepage">
            <h1>Hello {user.firstname}</h1>
            <div className="button btn btn-lg btn-primary mx-2"  onClick={() => history.push("/profileupdate")}>Update Profile</div>
            <div className="button btn btn-lg btn-warning mx-2" onClick={() => setLoginUser({})} >Logout</div>
        </div>
    )
}


export default Homepage