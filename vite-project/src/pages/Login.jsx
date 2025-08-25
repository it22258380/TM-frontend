import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-hot-toast';
import user from '../assets/user.png';
import login from '../assets/login.jpg';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/users/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        toast.success('Login successful');
        const token = res.data.token;
        const decoded = jwtDecode(token);
        localStorage.setItem('token', token);
        navigate('/list')
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  // Redirect to the Register Page when user clicks "Sign Up"
  const handleSignUp = () => {
    navigate('/register'); // Navigates to the Register page
  };

 return (
  <div className="w-full h-screen flex">
    {/* Left Side - Form */}
    <div className="flex w-1/2 items-center justify-center bg-gray-50">
      <form
        onSubmit={handleOnSubmit}
        className="w-[400px] bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center relative"
      >
        {/* Profile Image */}
        <img
          src={user}
          alt="profile"
          className="w-[100px] h-[100px] rounded-full border shadow absolute -top-12"
        />

        <h2 className="mt-16 mb-6 text-2xl font-bold text-gray-800">Welcome Back</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 mb-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Sign In */}
        <button className="w-full py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition">
          Sign In
        </button>

        {/* Sign Up */}
        <button
          type="button"
          onClick={handleSignUp}
          className="w-full py-2 mt-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
      </form>
    </div>

    
    <div className="w-1/2 h-full">
      <img
        src={login}
        alt="Login Illustration"
        className="w-full h-full object-cover rounded-l-2xl"
      />
    </div>
  </div>
);
}
export default Login;
