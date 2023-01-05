import React, { useState } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

 
const Login=()=>
{
    const navigate=useNavigate();
    const [user, setUser]=useState({
        email:'',
        password:'',
    })
    const {email, password}=user;
    const changeData=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        setUser({...user, [name]:value})
    }
   
    const onSubmit=async(event)=>
    {
        event.preventDefault();
        try{
            const res=await axios.post('http://localhost:5000/api/login',
            {email,password},
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              
              window.alert("Welcome, you are successfully logged in!")
              //REFRESH (The reload() method does the same as the reload button in browser)
              localStorage.setItem("user", res.data.token);
              navigate("/", { replace: true });
              window.location.reload();
              //TOKEN is generated when we logged in
              //creating shema for messages
        }

        catch(error){
            window.alert(error.response.data.error);
        }
    }

        return (
            <div className="wrapper">
                <div className="form">
                <h3>Log In</h3>
                        <input type='text' 
                        placeholder= 'E-mail'
                        name='email'
                        onChange={changeData} 
                        value={user.email}
                        />

                        <input type='password' 
                        placeholder= 'Password'
                        name='password'
                        onChange={changeData} 
                        value={user.password}
                        />
                <button onClick={onSubmit}>Log In</button>
                <div className="signin">
                    <p className="paragraph">
                    Not a user? <Link to="/register" className="link">Register</Link>
                    </p> 
                </div>
            </div>
        </div>
        )    
    }

export default Login;