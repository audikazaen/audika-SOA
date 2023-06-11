const mysql = require('mysql');
// buat konfigurasi koneksi
const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fbdb',
    multipleStatements: true
});
// koneksi database
koneksi.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});
module.exports = koneksi;





















/*
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
*/