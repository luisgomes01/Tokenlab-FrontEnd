import './Helper.css'
import React, {useState} from 'react/'
import * as Api from '../api/Auth';
import {Link} from 'react-router-dom';

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            
            const response = await Api.signIn({username, password })

            if (response.id) {
                localStorage.setItem('user_id', String(response.id));
            }
            window.location.href = "/"
        } catch (error) {
            alert("Erro ao efetuar login!");
        }
        
    }
    return (
        <div className='container form elevation-2'>            
            <form className ='jumbotron' onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="Username">Username</label>
                    <input onChange={(event)=>setUsername(event.target.value)} value={username} type="name" className="form-control"/>
                    <small className="form-text text-muted">We'll never share any of your data with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input onChange={(event)=> setPassword(event.target.value)} value={password} type="password" className="form-control"/>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                    
                    <div className="alert alert-primary" role="alert">
                        Still don't have an account?<Link to="/registration"> Click here!</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
