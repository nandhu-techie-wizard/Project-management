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
