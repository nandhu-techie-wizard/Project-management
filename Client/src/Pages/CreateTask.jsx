import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTask() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '',
    category: '',
    assignedTo: '',
  });
  const [users, setUsers] = useState([]); // Store available users for assignment
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Predefined task categories
  const categories = ["Development", "Bug Fix", "Design", "Testing", "Research"];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/auth/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tasks', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard'); // Redirect to dashboard after task creation
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className='text-center'>Create New Task</h2>
      <div className="card p-4 shadow">
        <form onSubmit={handleCreateTask}>
          <div className="mb-2">
            <input type="text" className="form-control" placeholder="Title" 
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          </div>
          <div className="mb-2">
            <textarea className="form-control" placeholder="Description"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} required></textarea>
          </div>
          <div className="mb-2">
            <select className="form-select" onChange={(e) => setFormData({ ...formData, priority: e.target.value })}>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
          <div className="mb-2">
            <select className="form-select" onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="mb-2">
            <input type="date" className="form-control" 
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} />
          </div>
          <div className="mb-2">
            <select className="form-select" onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <select className="form-select" onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}>
              <option value="">Unassigned</option>
              {users.map(user => <option key={user._id} value={user._id}>{user.name}</option>)}
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Create Task</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
