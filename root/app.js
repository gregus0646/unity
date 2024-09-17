const express = require('express');
const path = require('path');
const fs = require('fs');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts middleware
app.use(expressLayouts);


// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the home page
app.get('/', (req, res) => {
    res.render('index', { title: 'Accueil' });
});

// Route for listing course materials
app.get('/cours', (req, res) => {
    fs.readdir(path.join(__dirname, 'cours'), (err, files) => {
        if (err) {
            return res.status(500).send('Erreur lors de la lecture du répertoire des cours');
        }
        const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
        res.render('cours', { title: 'Cours de Mathématiques', pdfFiles });
    });
});

// Route for listing exercise materials
app.get('/exercices', (req, res) => {
    fs.readdir(path.join(__dirname, 'exercices'), (err, files) => {
        if (err) {
            return res.status(500).send('Erreur lors de la lecture du répertoire des exercices');
        }
        const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
        res.render('exercices', { title: 'Exercices de Mathématiques', pdfFiles });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
