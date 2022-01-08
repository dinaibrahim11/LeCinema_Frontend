
// import { Button } from 'bootstrap';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import './UsersList.css';
function UsersList() {
 const [role,setRole]=useState("");
 const [users,setUsers]=useState([]);




useEffect(() => {
  getUsers();
}, []);


function getUsers(){
    fetch("http://localhost:8000/api/users",{
      method: "GET"
    }).then((res)=>{
        res.json().then(result => {
            setUsers(result)
        })
    })
}
console.warn(users)

function authorize(id)
{
  //console.log(id);
  let data={role}
  //console.log(data);

  setRole("Manager")
  fetch("http://localhost:8000/api/users/"+id, {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(data)
  }).then((resp)=>{
    // console.warn("resp",resp);;
    resp.json().then((result)=>{
      console.warn("result",result)
      //window.location.reload();
      getUsers(); 
    })
  }).catch((err) => {
    console.log(err);
  })
}

function deleteuser(id)
{
  console.log(id);
  // TODOO: by id
  fetch('http://localhost:8000/api/users/'+id, {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((resp)=>{
    // console.warn("resp",resp);;
    resp.json().then((result)=>{
      console.warn(result)
      window.location.reload();
      getUsers();
    })
  }).catch((err) => console.log(err));
}



  return (
    <div className="App">
    
        
      <div>
      <table className="movies-table">
                <tr>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>userName</th>
                    <th>email</th>
                    <th>role</th>
                    <th>give permissions</th>
                    <th>delete account</th>
                </tr>
                {users && users.map((user) => (
                    <tr className="movie" key={user._id}>
                        <td>
                            {user.firstName} 
                        </td>
                        <td>
                            {user.lastName}
                        </td>
                        <td>
                            {user.userName}
                        </td>
                      
                        <td>
                            {user.email}
                        </td>
                        <td>
                            {user.role}
                        </td>
                        <td><Button onClick= {()=>authorize(user._id)}>authorize</Button></td>
                        <td><Button onClick= {()=>deleteuser(user._id)}>delete</Button></td>
                    </tr>
                ))}
            </table>
            </div>



    </div>
    
  );
}
export default UsersList;
