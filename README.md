# OBL IT-Pulse – IT Service Management Portal

## Overview
Web-based ticketing system built for hackathon. Employees raise tickets, technicians handle them, admins view analytics.

Login is split into employee and admin pages; technicians are handled similarly.

Analytics include category, department, and monthly trend charts based on ticket data.

## Setup
1. Clone or download repository.
2. Install Node dependencies:
   ```bash
   cd project-root
   # if npm install fails try installing packages individually
   npm install express body-parser cors node-jdbc bcrypt jsonwebtoken
   ```
3. (Optional) The original design used an H2 database and SQL schema located in `database/schema.sql`. For this demo the data is stored in memory with a simple JavaScript store, so there is no external database dependency. You can still examine the SQL file for reference.
4. Start server:
   ```bash
   npm start
   ```
4. Browse to `http://localhost:3000/login.html` and choose Employee or Admin login.

Default sample users created by the schema include:

* Employee: `emp1` / `password123`
* Technician: `tech1` / `password123`
* Admin: `admin1` / `password123`

Administrators can add new employees or admins via the **Add User** page after logging in.

## Project structure
```
/project-root
  /public   # static frontend assets
  /routes
  /controllers
  /database
  server.js
```

## Notes
- Authentication uses JWT (secretKey hard-coded for demo).
- Ticket assignment logic picks least busy technician for category.
- Status updates include basic SLA computation; tickets overdue are marked when resolved after deadline.
- Analytics endpoints supply data for Chart.js charts.
- Role-based routing is handled on client side by redirect after login.

## Extending
- Add more endpoints in `/routes/` and controllers.
- Implement feedback, SLA checks, and overdue flags in ticket update logic.
- Secure JWT secret and implement middleware to protect routes.

Enjoy building further!