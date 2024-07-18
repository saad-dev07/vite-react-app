import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faCaretDown, faImage, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import api from '../../utils/api';
import '../../assets/css/style.css';
import logo from '/images/web/logo.png';
import { useNavigate } from 'react-router-dom';

function register () {
    const [values, setValues] = useState({ f_name: '', l_name: '', email: '', password: '', c_password: '', contact_no: '', userRole: '', image: '' });
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchRoles = async () => {
            try{
                const response = await api.get('/Roles');
                setRoles(response.data);
            }
            catch(error){
                console.error("Error fetching roles in register form: " + error);
            }
        }
        fetchRoles();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({...values, [name] : value});
    };
    const handleFileChange = (e) => {
        setValues({ ...values, image: e.target.files[0] });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        for(let key in values){
            formData.append(key, values[key]);
        }
        try{
            await api.post('/Register', formData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(res => {
                setValues({ f_name: '', l_name: '', email: '', password: '', c_password: '', contact_no: '', userRole: '', image: '' });
                window.alert('Registration successful!');
            })
        }      
        catch(err) {
            if (err.response && err.response.data && err.response.data.error) {
                window.alert(err.response.data.error);
            } else {
                console.log(err);
            }
        }
    };
    const backToUserManagement = () => {
        navigate('/UserManagement')
    };
return (
    <div className="bg-image flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat">
        <div className="flex items-center justify-center h-full w-full">
            <div className="relative flex flex-col bg-white bg-opacity-50 shadow-xl px-10 py-12 rounded-3xl w-full max-w-4xl">
                <button onClick={backToUserManagement} className="absolute top-4 left-4 flex items-center bg-gradient-to-r from-red-700 to-pink-600 hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-700 text-white rounded-full px-4 py-2">
                    <FontAwesomeIcon icon={faLongArrowAltLeft} className="mr-2"/>Go Back
                </button>
                <div className="flex justify-center">
                    <img src={logo} alt="Pronet Logo" className="h-24 w-40"/>
                </div>
                <div className="text-center text-gray-800 mb-5 text-lg font-light">
                    Enter credentials to register yourself
                </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="f_name" className="mb-2 text-sm font-medium text-gray-700">First Name:</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                            </div>
                            <input id="f_name" type="text" name="f_name" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" autoFocus placeholder="Enter your first name" required onChange={handleChange} value={values.f_name} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="l_name" className="mb-2 text-sm font-medium text-gray-700">Last Name:</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                            </div>
                            <input id="l_name" type="text" name="l_name" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" placeholder="Enter your last name" required onChange={handleChange} value={values.l_name} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">E-Mail Address:</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                            </div>
                            <input id="email" type="email" name="email" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" placeholder="Enter your email" required onChange={handleChange} value={values.email} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="contact_no" className="mb-2 text-sm font-medium text-gray-700">Contact No:</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
                            </div>
                            <input id="contact_no" type="tel" name="contact_no" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" placeholder="Enter your contact no" required onChange={handleChange} value={values.contact_no} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="image" className="mb-2 text-sm font-medium text-gray-700">Profile Image:</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <FontAwesomeIcon icon={faImage} className="text-gray-400" />
                            </div>
                            <label className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white cursor-pointer">
                                <input id="image" type="file" name="image" className="hidden" onChange={handleFileChange} />
                                <span className="text-gray-500">{values.image ? values.image.name : 'Select Profile Image'}</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="userRole" className="mb-2 text-sm font-medium text-gray-700">User Role:</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <FontAwesomeIcon icon={faCaretDown} className="text-gray-400" />
                            </div>
                            <select id="userRole" name="userRole" value={values.userRole} onChange={handleChange} className="text-sm text-gray-500 pl-9 pr-5 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" style={{ appearance: 'none', backgroundImage: 'none' }} required>
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                <option key={role.RoleId} value={role.RoleName}>{role.RoleName}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-700">Password:</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                            </div>
                            <input id="password" type="password" name="password" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" placeholder="Enter your password" required onChange={handleChange} value={values.password} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="c_password" className="mb-2 text-sm font-medium text-gray-700">Confirm Password:</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                            </div>
                            <input id="c_password" type="password" name="c_password" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" placeholder="Confirm your password" required onChange={handleChange} value={values.c_password} />
                        </div>
                    </div>
                    <div className="flex w-full col-span-1 sm:col-span-2 mt-5">
                        <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-gradient-to-r from-red-800 to-pink-600 hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-800 rounded-full py-3 w-full transition duration-150 ease-in">
                            <span className="mr-2 uppercase">Register</span>
                            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);   
};

export default register;
