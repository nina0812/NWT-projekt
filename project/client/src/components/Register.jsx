import React, { useState } from "react";
import {Link} from 'react-router-dom';
//import { ProcessRegister } from '../actions/registerFunctions'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
const Register=()=>
{
    const navigate=useNavigate();
    const [user, setUser]=useState({
        fullName:'',
        username:'',
        email:'',
        password:'',
    })
    const {fullName, username, email, password}=user;
    const changeData=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        setUser({...user, [name]:value})
    }
   
    const onSubmit=async(event)=>
    {
        event.preventDefault();
        try{
            const res=await axios.post('http://localhost:5000/api/register',
            {fullName, username, email,password},
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              window.alert("User created successfully")
              navigate("/login");

        }

        catch(error){
            window.alert(error.response.data.error);
        }
    }

        return (
            <div className="wrapper">
            <div className="form">
            <h3>Create an account</h3>
            <input type='text' 
                    // Komentar
                    placeholder='Full Name'  // ovaj input je za polje u formi Full Name
                    name='fullName'
                    onChange={changeData} 
                    value={fullName}
                    />

                    <input type='text' 
                    placeholder= 'Username'
                    name='username'
                    onChange={changeData} 
                    value={username}
                    />

                    <input type='text' 
                    placeholder= 'E-mail'
                    name='email'
                    onChange={changeData} 
                    value={email}
                    />

                    <input type='password' 
                    placeholder= 'Password'
                    name='password'
                    onChange={changeData} 
                    value={password}
                    />
             <button onClick={onSubmit}>Register</button>
             <div className="signin">
                <p className="paragraph">
                Already a user? <Link to="/login" className="link">Login</Link>
                </p> 
            </div>
        </div>
        </div>
        )    
    }

export default Register;