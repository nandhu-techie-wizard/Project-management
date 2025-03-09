import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Registration successful');
      navigate('/');
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || 'Registration failed'));
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h2 className="text-center mb-3">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input type="text" name="name" className="form-control" placeholder="Name" onChange={handleChange} required />
          </div>
          <div className="mb-2">
            <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} required />
          </div>
          <div className="mb-2">
            <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <div className="text-center mt-3">
          <span>Already have an account? </span>
          <Link to="/" className="text-decoration-none">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
