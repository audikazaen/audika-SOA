const express = require('express');
const bodyParser = require('body-parser');
const koneksi = require('./config/database');
const app = express();
const PORT = process.env.PORT || 3000;

// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ============= create data / insert data
// coba di postman --> (post, x-www-urlencoded)
app.post('/feedbacks', (req, res) => {

    console.log('datanya', req.body);
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const querySql = 'INSERT INTO feedback SET ?';
    console.log('coba create /input baru');
    console.log('datanya=', req.body);

   // jalankan query
    koneksi.query(querySql, data, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Gagal insert data feedback!', error: err });
        }

        // jika request berhasil
        res.status(201).json({ success: true, message: 'Berhasil insert data feedback!' });
    });
});


// ============= read data / get data
// coba di postman --> (get)
app.get('/feedbacks', (req, res) => {
    // buat query sql
    const querySql = 'SELECT * FROM feedback';
    console.log('Ini GET' );

    // jalankan query
    koneksi.query(querySql, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        // jika request berhasil
        res.status(200).json({ success: true, data: rows });
    });
});


// ========= get one record data
// coba di postman --> (get)
app.get('/feedbacks/:user_nohp', (req, res) => {
    // buat query sql
    const querySql = `SELECT * FROM feedback WHERE user_nohp = ${req.params.user_nohp}`;
    console.log(`Request user_nohp = ${req.params.user_nohp}`) 
   

    // jalankan query
    koneksi.query(querySql, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        // jika request berhasil
        res.status(200).json({ success: true, data: rows });
    });
});


// update data 
// coba di postman --> (put, body)
app.put('/feedbacks/:user_nohp', (req, res) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const querySearch = 'SELECT * FROM feedback WHERE user_nohp = ?';
    const queryUpdate = 'UPDATE feedback SET ? WHERE user_nohp = ?';

    // jalankan query untuk melakukan pencarian data
    koneksi.query(querySearch, req.params.user_nohp, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        // jika id yang dimasukkan sesuai dengan data yang ada di db
        if (rows.length) {
            // jalankan query update
            koneksi.query(queryUpdate, [data, req.params.user_nohp], (err, rows, field) => {
                // error handling
                if (err) {
                    return res.status(500).json({ message: 'Ada kesalahan', error: err });
                }

                // jika update berhasil
                res.status(200).json({ success: true, message: 'Berhasil update data feedback!' });
            });
        } else {
            return res.status(404).json({ message: 'Data feedback tidak ditemukan!', success: false });
        }
    });
});


// delete data
// coba di postman --> (delete)
app.delete('/feedbacks/:user_nohp', (req, res) => {
    // buat query sql untuk mencari data dan hapus
    const querySearch = 'SELECT * FROM feedback WHERE user_nohp = ?';
    const queryDelete = 'DELETE FROM feedback WHERE user_nohp = ?';

    // jalankan query untuk melakukan pencarian data
    koneksi.query(querySearch, req.params.user_nohp, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        // jika id yang dimasukkan sesuai dengan data yang ada di db
        if (rows.length) {
            // jalankan query delete
            koneksi.query(queryDelete, req.params.user_nohp, (err, rows, field) => {
                // error handling
                if (err) {
                    return res.status(500).json({ message: 'Ada kesalahan', error: err });
                }

                // jika delete berhasil
                res.status(200).json({ success: true, message: 'Berhasil hapus data!' });
            });
        } else {
            return res.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    });
});


// buat server nya
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
