import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [taskStats, setTaskStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [filters, setFilters] = useState({ status: '', priority: '', category: '', search: '', sort: 'newest' });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
        params: filters,
      });
      setTasks(data);

      // Calculate task counts
      const total = data.length;
      const pending = data.filter(task => task.status === "Pending").length;
      const completed = data.filter(task => task.status === "Completed").length;
      setTaskStats({ total, pending, completed });

    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove authentication token
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Task Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      {/* Create Task Button */}
      <div className="mb-3 text-end">
        <Link to="/create-task" className="btn btn-primary">+ Create Task</Link>
      </div>

      {/* Task Statistics */}
      <div className="row text-center mb-4">
        <div className="col-md-4">
          <div className="card p-3 shadow bg-light">
            <h5>Total Tasks</h5>
            <h3>{taskStats.total}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow bg-warning">
            <h5>Pending Tasks</h5>
            <h3>{taskStats.pending}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow bg-success text-white">
            <h5>Completed Tasks</h5>
            <h3>{taskStats.completed}</h3>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="card p-4 shadow">
        <h4>Task List</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Task No</th>
              <th>Title</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Category</th>
              <th>Due Date</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.taskNumber || "N/A"}</td>
                <td>{task.title}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>{task.category || "Uncategorized"}</td>
                <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
                <td>{task.assignedTo ? task.assignedTo.name || "Unassigned" : "Unassigned"}</td>
                <td>
                  <Link to={`/edit-task/${task._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                  <button className="btn btn-danger btn-sm"
                    onClick={() => axios.delete(`http://localhost:5000/api/tasks/${task._id}`, {
                      headers: { Authorization: `Bearer ${token}` }
                    }).then(fetchTasks)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
