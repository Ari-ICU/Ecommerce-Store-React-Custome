import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import img from './img/1.png';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    setUser({ username, token: data.token });
                    navigate('/');
                } else {
                    setError('Invalid login credentials');
                }
            })
            .catch(() => setError('Login failed. Please try again.'));
    };

    return (
        <div className='bg'>
            <div className="container d-flex justify-content-center align-items-center vh-100 ">
                <div className="row w-100 d-flex align-items-stretch">
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <img
                            src={img}
                            alt="img"
                            className="img-fluid"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Ensures the image covers the area while maintaining its aspect ratio
                        />
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%', height: '100%' }}>
                            <h2 className="text-center mb-4">Login</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                />
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </button>
                                </div>
                            </div>
                            <button onClick={handleLogin} className="btn btn-primary w-100 mt-3">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
