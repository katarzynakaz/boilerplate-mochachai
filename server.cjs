const express = require('express');
const cors = require('cors');
const runner = require('./test-runner');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.use(express.static(__dirname + '/public'));

app.get('/hello', function (req, res) {
  const name = req.query.name || 'Guest';
  res.type('txt').send('hello ' + name);
});

const travellers = function (req, res) {
  let data = {};
  if (req.body && req.body.surname) {
    switch (req.body.surname.toLowerCase()) {
      case 'polo':
        data = {
          name: 'Marco',
          surname: 'Polo',
          dates: '1254 - 1324',
        };
        break;
      case 'colombo':
        data = {
          name: 'Cristoforo',
          surname: 'Colombo',
          dates: '1451 - 1506',
        };
        break;
      case 'vespucci':
        data = {
          name: 'Amerigo',
          surname: 'Vespucci',
          dates: '1454 - 1512',
        };
        break;
      case 'da verrazzano':
      case 'verrazzano':
        data = {
          name: 'Giovanni',
          surname: 'da Verrazzano',
          dates: '1485 - 1528',
        };
        break;
      default:
        data = {
          name: 'unknown',
        };
    }
  }
  res.json(data);
};

app.route('/travellers').put(travellers);

let error;
app.get('/_api/get-tests', cors(), function (req, res, next) {
  if (error) return res.json({ status: 'unavailable' });
  next();
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
