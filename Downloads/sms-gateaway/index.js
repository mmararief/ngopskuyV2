const accountSid = "AC83adcbe129bfe6021f1889ff07600e0d"
const authToken = "77b7e151095a01c74a4717b4a0c9e09e"

const twilio = require('twilio')(accountSid, authToken);
const mysql = require('mysql');
const jsPDF = require('jspdf') ;




const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Konfigurasi middleware body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'b700c78b708cea',
  password: '0f702df8',
  database: 'heroku_260c8286a29418e'
});
// Route untuk mengirim pesan
app.post('/send-sms', (req, res) => {
  const { body, to } = req.body;

  twilio.messages
    .create({
      body: body,
      from: '+13205262417',
      to: to
    })
    .then(message => {
      res.send({
        status: 'sukses',
        sid: message.sid
      });
    })
    .catch(error => {
      res.send({
        status: 'gagal',
        error: error.message
      });
    });
});

// Menampilkan halaman web struk
app.get('/struk/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM tb_struk WHERE id = ${id}`;

  connection.query(query, (error, results, fields) => {
    if (error) throw error;

    const struk = results[0];

    const html = `
    <html>
  <head>
    <title>Struk</title>
    <script src="https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <h1 class="mt-5">Struk Pembayaran Anda</h1>
      <table class="table mt-4">
        <tr>
          <th>Nama:</th>
          <td>${struk.nama}</td>
        </tr>
        <tr>
          <th>Nomor HP:</th>
          <td>${struk.nomor}</td>
        </tr>
        <tr>
          <th>Total Belanja:</th>
          <td>Rp. ${struk.total.toLocaleString()}</td>
        </tr>
      </table>
      
      <button onclick="generatePDF()" class="btn btn-primary mt-3">Cetak PDF</button>
    </div>

    <script>
      function generatePDF() {
        const doc = new jsPDF();
        const struk = document.querySelector('.container');

        doc.html(struk, {
          callback: function (pdf) {
            pdf.save('struk.pdf');
          }
        });
      }
    </script>
  </body>
</html>

  `;


    res.send(html);
  });
});




// Jalankan server pada port tertentu
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});
