import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
 

function Registrationlist() {
var [data, setData] = useState()
var [reload, setReload] = useState(1)
// const[lodder, setLodder]=useState(false);
const[alert_msg, setAlert_msg]=useState("");

var call_api = async()=>{
    try {
        const res = await axios.get("http://localhost:9002/registrationlist");
        var result =res.data
        console.log(res.data)
        setData(result)
        .then(res => {Swal.fire({
            title: res.data.message,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        }
        )
    } catch (error) {
    }

    }
    
      useEffect(()=>{
        call_api()
    },[reload])

const delete_btn = (identity)=>{
      // setLodder(true)
console.log("identity_________________________")
console.log(identity)
axios.User("http://localhost:9002/user_delete", {
    user_id: identity,
  })
  .then(function (response) {
    console.log(response.data);
    setReload(reload+1)
    // setLodder(false)
    console.log("deleted successfull")
    setAlert_msg("deleted successfull")
  })
  .catch(function (error) {
    setReload(reload)
    // setLodder(false)

    console.log(error);

  });

  }
    
    return(
      <div className=" mt-3  border border-info container-fluid bg-white">

     <div className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"><h3 >Registration List</h3></div>
     <hr/>
      {alert_msg!==""?<div class="alert alert-info mt-2" role="alert">
      {alert_msg}
      </div>:console.log("abc")}
      
<table onClick={()=>{alert_msg!==""?setAlert_msg("") :console.log("-") }} className="table">
  
            <thead >
                <tr >
                    <th scope="col" >S.No.</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email Id</th>
                    <th scope="col">Password</th>
                    <th scope="col">Address</th>
                    <th scope="col">Phone</th>
                    <th scope="col">companyname</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
{data?.map((item,index) => (
   <tr><td>{index+1}</td><td>{item.firstname}</td>{item.lastname}<td>{item.email}</td><td>{item.password}</td><td>{item.address}</td> <td>{item.phoneno}</td> <td>{item.companyname}</td> <button className="btn btn-info btn-sm" onClick={()=>{delete_btn(item._id)}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
   <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
   <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
 </svg></button></tr> 
))}

            </tbody>
        </table>
        </div>
    );
  }
  
  export default Registrationlist
  
  