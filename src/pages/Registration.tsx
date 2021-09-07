import './Helper.css'
import * as Api from '../api/User';
import { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';

export default function Registration() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await Api.signUp({ name, username, password });
            alert("Usuário criado com sucesso!");
            history.push("/")
        } catch (error) {
            alert("Erro ao criar conta!")
        }
    }

    return (
        <div className='container form elevation-2'>
            <form className ='jumbotron' onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input onChange={(event) => setName(event.target.value)} value={name} type="name" className="form-control" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Username</label>
                    <input onChange={(event) => setUsername(event.target.value)} value={username} type="text" className="form-control" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" className="form-control" required/>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-primary btn-lg">Register</button>
                    
                    <div className="alert alert-primary" role="alert">
                        Already have an account?<Link to="/"> Sign in!</Link>
                    </div>
                </div>
                
            </form>
        </div>
    )
}
