import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link,useNavigate  } from 'react-router-dom';
import user from '../assets/user.png'; 
import login from '../assets/login.jpg';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { firstname, lastname, email, password} = formData;

    // Validation
    if (!firstname || !lastname || !email || !password) {
      setError('All fields are required.');
      toast.error('All fields are required.');
      setLoading(false);
      return;
    }

    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email.');
      toast.error('Please enter a valid email.');
      setLoading(false);
      return;
    }

    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      toast.error('Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }

  

    try {
      
      const response = await axios.post(
        'http://localhost:5000/api/users/register', 
        formData
      );

      
      setSuccessMessage('Registration successful!');
      toast.success('Customer added successfully!'); 
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
       
      }); 
        navigate('/');
    } catch (err) {
      
      console.error('Error:', err.response ? err.response.data : err.message);

      if (err.response) {
        
        setError(err.response.data.message || 'Error registering user.');
        toast.error(err.response.data.message || 'Error registering user.');
      } else {
        setError('Error registering user. Please try again.');
        toast.error('Error registering user. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    
  <div className="w-full h-screen flex">
    {/* Left Side - Register Form */}
    <div className="w-1/2 flex items-center justify-center bg-gray-50">
      <div className="w-[400px] bg-white backdrop-blur-2xl rounded-2xl shadow-xl p-8">
        {/* Error / Success Messages */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}

        {/* Avatar */}
        <div className="w-full flex justify-center mb-6">
          <img
            src={user}
            alt="user"
            className="w-[100px] h-[100px] rounded-full border shadow"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */}
          <div className="flex flex-col">
            <label
              htmlFor="firstname"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="Enter first name"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label
              htmlFor="lastname"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Enter last name"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          {/* Register Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className={`w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition focus:outline-none ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>

    {/* Right Side - Image */}
    <div className="w-1/2 h-full">
      <img
        src={login}
        alt="Login Illustration"
        className="w-full h-full object-cover rounded-l-2xl"
      />
    </div>
  </div>
);

};


export default UserRegister;
