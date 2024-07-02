import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logo from '/images/web/logo.png';
import api from '../../utils/api';
import * as jwt_decode from 'jwt-decode';

function Login() {
    const [values, setValues] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/', values);
            console.log("Response from Login.jsx: ",response);

            // Extract the token from response headers
            const tokenHeader = response.headers['set-cookie'];
            if (!tokenHeader || tokenHeader.length === 0) {
                throw new Error('Token not found in response headers.');
            }

            // Extract token value from the set-cookie header
            const token = tokenHeader[0].split(';')[0].split('=')[1];

            // Store the token securely in cookies after login
            document.cookie = `token=${token}; Path=/; Domain=pronet-node-api.vercel.app; Secure; SameSite=None`;


            if (response.data.message === 'Login successful!') {
                setValues({ email: '', password: '' });

                // Store the token securely in cookies after login
                // const token = response.headers['set-cookie'];
                // document.cookie = `token=${token}; Path=/; Domain=pronet-node-api.vercel.app; Secure;`; // SameSite=None
                
                // Store the token securely in cookies after login
                // const token = response.data.token;
                // document.cookie = `token=${token}; Path=/; Domain=pronet-node-api.vercel.app; Secure; SameSite=None`;

                // Decode the token to get the role
                const decodedToken = jwt_decode(token);
                const role = decodedToken.role;


                // const role = response.data.role;
                if (role === "Admin") {
                    navigate('/Admin');
                } else if (role === "User") {
                    navigate('/User');
                } else {
                    window.alert('Invalid Role!');
                }
            } else if (response.data.resetPassword) {
                window.alert(response.data.message);
                navigate('/ResetPassword');
            } else {
                window.alert(response.data.message);
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                window.alert(err.response.data.error);
            } else {
                window.alert('Request failed from Login');
            }
        }
    };
return (
        <div className="bg-image flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat">
            <div className="flex items-center justify-center h-full w-full">
                <div className="flex flex-col bg-white bg-opacity-50 shadow-xl px-10 py-12 rounded-3xl w-full max-w-md">
                    <div className="self-center mb-6">
                        <img src={logo} alt="Pronet Logo" className="h-20 w-40" />
                    </div>
                    <div className="text-center text-gray-800 mb-6 text-lg font-light">
                        Enter your credentials to access your account
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">E-Mail Address:</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                                </div>
                                <input id="email" type="email" name="email" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" autoFocus placeholder="Enter your email" required onChange={handleChange} value={values.email} />
                            </div>
                        </div>
                        <div className="flex flex-col mb-8">
                            <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-700">Password:</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                                </div>
                                <input id="password" type="password" name="password" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" placeholder="Enter your password" required onChange={handleChange} value={values.password} />
                            </div>
                        </div>
                        <div className="flex w-full">
                            <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-gray-700 hover:bg-gray-800 rounded-full py-3 w-full transition duration-150 ease-in">
                                <span className="mr-2 uppercase">Login</span>
                                <span>
                                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
