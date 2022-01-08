
import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import './UsersList.css';
function UsersList() {
 const [role,setRole]=useState("");
 const [users,setUsers]=useState([]);




useEffect(() => {
  getUsers();
}, []);


function getUsers(){
    fetch("http://localhost:8000/api/users").then((result)=>{
        result.json().then(resp => {
            setUsers(resp)
        })
        })
}
console.warn(users)

function authorize(id)
{
  let data={role}
setRole("Manager")
  fetch("http://localhost:8000/api/users/{id}", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(data)
  }).then((resp)=>{
    // console.warn("resp",resp);;
    resp.json().then((result)=>{
      console.warn("result",result)
      getUsers();
    })
  })
}
function deleteuser(email)
{
  
  fetch('http://localhost:8000/api/users/${email}', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((resp)=>{
    // console.warn("resp",resp);;
    resp.json().then((result)=>{
      console.warn(result)
      getUsers();
    })
  })
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
                    <tr className="movie" key={user.id}>
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
                        <td><Button onClick= {()=>authorize(user.id)}>authorize</Button></td>
                        <td><Button onClick= {()=>deleteuser(user.email)}>delete</Button></td>
                    </tr>
                ))}
            </table>
            </div>



    </div>
    
  );
}
export default UsersList;
