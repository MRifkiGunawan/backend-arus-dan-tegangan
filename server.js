const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db_config');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint untuk menyimpan data ke database
app.get('/', (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ success: false, message: 'Data harus diisi' });
    }

    const query = 'INSERT INTO data (data) VALUES (?)';

    db.query(query, [data], (error, results, fields) => {
      if (error) {
        console.error('Error inserting data to MySQL:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }

      res.status(200).json({ success: true, message: 'Data berhasil ditambahkan', result: results });
    });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

    app.get('/data', (req, res) => {
        const query = 'SELECT * FROM data ORDER BY id DESC LIMIT 10';
      
        db.query(query, (error, results, fields) => {
          if (error) {
            console.error('Error fetching data from MySQL:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
          }
      
          res.status(200).json({ success: true, data: results });
        });
      });

app.listen(port, () => {
  console.log(`Server berjalan pada http://localhost:${port}`);
});
