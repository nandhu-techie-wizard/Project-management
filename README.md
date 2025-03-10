Task Manager App

Project Setup & Installation

Backend (Node.js/Express/MongoDB)

1️⃣ Clone the Repository

git clone https://github.com/nandhu-techie-wizard/Project-management/
cd task-manager/backend

2️⃣ Install Dependencies

npm install

3️⃣ Set Up Environment Variables

Create a .env file in the root of your backend and add:

MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/task-manager
JWT_SECRET=your_secret_key
PORT=5000

4️⃣ Start the Backend Server

npm start

 Backend will run on http://localhost:5000

Frontend (React)

1️⃣ Navigate to the Frontend Folder

cd ../frontend

2️⃣ Install Dependencies

npm install

3️⃣ Set Up Environment Variables

Create a .env file in the root of your frontend and add:

REACT_APP_API_URL=https://your-backend.onrender.com/api

4️⃣ Start the Frontend Server

npm start

 Frontend will run on http://localhost:3000

** Assumptions Made During Development**

Users must log in to access the dashboard.

Each task has a unique task number generated automatically.

Tasks are assigned categories for better organization.

Only the creator or assigned user can edit a task.
**Technologies & Libraries Used****

Backend (Node.js + Express + MongoDB)

Express.js – Web framework

MongoDB & Mongoose – Database

JWT (jsonwebtoken) – Authentication

bcrypt – Password hashing

CORS – Handling cross-origin requests

Frontend (React)

React.js – UI framework

React Router – Navigation

Axios – API requests

Bootstrap (CDN) – Styling

Vercel – Frontend deployment

📌 Challenges Faced & Solutions

🔹 Challenge 1: Securing API Endpoints

Issue: Unauthorized users could access certain endpoints.

Solution: Implemented JWT authentication and protected routes using middleware.

🔹 Challenge 2: Handling CORS Errors

Issue: The frontend (Vercel) couldn't communicate with the backend (Render).

Solution: Installed CORS middleware in the backend:

npm install cors

Updated server.js:

const cors = require('cors');
app.use(cors({ origin: "https://your-frontend.vercel.app" }));

🔹 Challenge 3: Task Filtering & Pagination

Issue: Too many tasks made the dashboard slow.

Solution: Implemented server-side pagination & filtering in MongoDB using query parameters.



 Next Steps


Improve UI/UX with better styling.

Add real-time notifications for task updates.


1. Sign Up & Log In (Authentication)
POST /api/auth/register (Sign up)
- POST /api/auth/login (Login with JWT)
2. Create, Read, Update, and Delete (CRUD) Tasks	
- POST /api/tasks (Create Task)
- GET /api/tasks (Read Tasks)
- PUT /api/tasks/:id (Update Task)
- DELETE /api/tasks/:id (Delete Task)
3. Assign Categories or Tags to Tasks
- Category is stored in the category field
- GET /api/tasks?category=Development (Filter by Category)
4. Mark Tasks as Completed or Pending
- PUT /api/tasks/:id (Update status: Pending or Completed)
- GET /api/tasks?status=Completed (Filter by Status)
5. View Tasks by Category or Completion Status
- GET /api/tasks?category=Bug Fix
- GET /api/tasks?status=Pending
6. Search Tasks by Title or Task Number	
- GET /api/tasks?search=Fix API (Search by Title)
- GET /api/tasks?search=TASK-002 (Search by Task Number)
