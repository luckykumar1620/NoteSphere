import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const [credentials,setCredentials]=useState({email:"",password:""});
    let navigate=useNavigate()
    const handleSubmit=async(e)=>{
       e.preventDefault();
        const response=await fetch("http://localhost:5000/api/auth/login",{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({email:credentials.email,password:credentials.password})
    });
    const json=await response.json();
    console.log(json);
   
    if(json.success){
        //save the authentication token and redirect
        localStorage.setItem('token',json.authtoken);
        localStorage.setItem("user", JSON.stringify(json.user));
        navigate("/");
       props.showAlert("Loged in Successfully","success");
    }else{
       props.showAlert("Invalid Details","danger");
    }
}



 const onChange=(e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='mt-2'>
            <h2 className='my-2'>login to continue to NoteSphere</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email}
                     name="email" aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} 
                    id="password" name="password" onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login

