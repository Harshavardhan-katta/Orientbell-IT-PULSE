const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');

// routes
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/ticket');
const analyticsRoutes = require('./routes/analytics');
const feedbackRoutes = require('./routes/feedback');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/feedback', feedbackRoutes);


const store = require('./database/store');

// populate sample data in memory with hashed passwords if not already present
const hashPass = (pass) => bcrypt.hashSync(pass, 10);
if (!store.findUserById('emp1')) {
  store.addUser({ userid:'emp1', password: hashPass('password123'), name:'Alice', role:'Employee', department:'Finance' });
}
if (!store.findUserById('tech1')) {
  store.addUser({ userid:'tech1', password: hashPass('password123'), name:'Bob', role:'Technician', department:'IT' });
}
if (!store.findUserById('admin1')) {
  store.addUser({ userid:'admin1', password: hashPass('password123'), name:'Carol', role:'Admin', department:'IT' });
}
// initialize tech list only once
store.initTechnicians([
  { techid:'tech1', name:'Bob', category:'Software', department:'IT' },
  { techid:'tech2', name:'Dave', category:'Hardware', department:'IT' }
]);

// add a few initial tickets for demonstration if none exist
if (store.getAllTickets().length === 0) {
  store.addTicket({
    title: 'Email not working',
    description: 'Cannot send emails since yesterday',
    category: 'Software',
    priority: 'High',
    status: 'New',
    created: new Date().toISOString(),
    created_by: 'emp1',
    assigned_to: 'tech1',
    department: 'Finance'
  });
  store.addTicket({
    title: 'Printer jam',
    description: 'Paper stuck in printer',
    category: 'Hardware',
    priority: 'Medium',
    status: 'New',
    created: new Date().toISOString(),
    created_by: 'emp1',
    assigned_to: 'tech2',
    department: 'Finance'
  });
}

console.log('In-memory store initialized');

// no JDBC required; previously h2/db code removed

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
