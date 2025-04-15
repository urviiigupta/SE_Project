import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { 
        email, 
        password 
      });

      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Navigate based on role
      switch (response.data.user.role) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'student':
          navigate('/student-dashboard');
          break;
        case 'hall_warden':
          navigate('/hall-warden-dashboard');
          break;
        case 'controlling_warden':
          navigate('/controlling-warden-dashboard');
          break;
        case 'mess_manager':
          navigate('/mess-manager-dashboard');
          break;
        case 'hall_clerk':
          navigate('/hall-clerk-dashboard');
          break;
        case 'hmc_chairman':
          navigate('/hmc-chairman-dashboard');
          break;
        default:
          setError('Unknown role');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-teal-600 to-gray-100 space-y-6">
      <h2 className="font-servillana text-3xl text-white">Hostel Management System</h2>
      <div className="border shadow p-6 w-80 bg-white rounded">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;