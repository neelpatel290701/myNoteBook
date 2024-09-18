import React , {useState} from 'react'
import {useNavigate} from "react-router-dom";

export default function Login() {

    const [userCredential,setUserCredential] = useState({email : "" , password : ""}) ;
    const navigate = useNavigate()

    const handleSubmit =  async (e)=>{
            e.preventDefault()
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                },
                body: JSON.stringify({email:userCredential.email , password : userCredential.password}),
        });

        const json = await response.json()

        if(json.success){
            localStorage.setItem("auth-token",json.authToken)
            navigate("/")
        }else{
            alert("Invalid Credentials")
        }
    }

    const onChange = (e)=>{
        setUserCredential({...userCredential,[e.target.name] : e.target.value})
    }
    return (
        <div className='contaniner my-5 mx-5'> 
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" value={userCredential.email}  onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                    <input type="password" className="form-control" name="password" id="password" value={userCredential.password} onChange={onChange} />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
