const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3001;

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    database: 'emp1',
    user: 'root',
    password: 'root'
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint to fetch employees
app.get('/api/employees', (req, res) => {
    const query = "SELECT * from empdata";
    db.query(query, (error, result) => {
        if (error) {
            console.error("Error fetching employees:", error);
            res.status(500).json({ error: "Failed to fetch employees" });
        } else {
            res.json(result);
        }
    });
});

// API endpoint to add an employee
app.post('/api/empdata', (req, res) => {
    const { employeeName, employeeID, department, gender, dob, designation, salary,blood_group,address} = req.body;
    const query = "INSERT INTO empdata (employee_name, employee_id, department, gender, dob, designation, salary,blood_group,address) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)";
    db.query(query, [employeeName, employeeID, department, gender, dob, designation, salary,blood_group,address], (error, result) => {
        if (error) {
            console.error("Error adding employee:", error);
            res.status(500).json({ error: "Failed to add employee" });
        } else {
            console.log("Employee added successfully");
            res.status(200).json({ message: "Employee added successfully" });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
