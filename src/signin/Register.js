import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        fetch('https://fakestoreapi.com/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                username,
                password,
                name: {
                    firstname,
                    lastname
                },
                address: {
                    city,
                    street,
                    number,
                    zipcode,
                    geolocation: {
                        lat: '-37.3159',
                        long: '81.1496'
                    }
                },
                phone
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.id) {
                    navigate('/'); // Redirect after successful registration
                } else {
                    setError('Registration failed. Please try again.');
                }
            })
            .catch(() => setError('Registration failed. Please try again.'));
    };

    return (
        <div className="container justify-content-center align-items-center w-50 p-5">
            <h2 className='text-center'>Register</h2>
            {error && <p className="text-danger">{error}</p>}
            <div className="mb-3">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Username</label>
                <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>First Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Last Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>City</label>
                <input
                    type="text"
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Street</label>
                <input
                    type="text"
                    className="form-control"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Number</label>
                <input
                    type="number"
                    className="form-control"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Zip Code</label>
                <input
                    type="text"
                    className="form-control"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Phone</label>
                <input
                    type="text"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <button onClick={handleRegister} className="btn btn-primary">Register</button>
        </div>
    );
};

export default Register;
