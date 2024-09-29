// Importing packages 


const express = require('express');
const app = express(); 
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');




app.use(express.json());
app.use(cors());
dotenv.config(); 

// connection to the database 
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
});

// Check if there is a connection 
db.connect((err) => {
    // If no connection 
    if(err) return console.log("Error connecting to MYSQL");

    //If connect works successfully
    console.log("Connected to MYSQL as id: ", db.threadId); 
}) 


  app.set('view engine', 'ejs');
   app.set('views', __dirname + '/views');
   
   
   // Question 1 
   
  
   // Retrieve data from the database
   app.get('/data', (req, res) => {
     //Retrieving Patients Info 
    db.query('SELECT * FROM patients', (err, patientResults) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error Retrieving Patients Info');
        }
    
   
   

   // Question 2 
   //Retrieving Providers Info 
 
    db.query('SELECT * FROM providers', (err, providerResults) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error Retrieving Providers Info');
        }

    });
});

    
   // Question 3 
   db.query('SELECT * FROM patients WHERE first_name = ?', [firstName], (err, _patientsResults) => {
    if (err) {
        console.error(err);
        return res.status(500).send('Error retrieving patients');
    }

});
    
   // Question 4 
   db.query('SELECT * FROM providers WHERE provider_specialty = ?', [provider_specialty], (err, proResults) => {
    if (err) {
        console.error(err);
        return res.status(500).send('Error retrieving Providers');
    }

    res.render('data', { results: patientResults, providersResults: providerResults, _patientsResults, proResults });
});

});
// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
});