const express = require('express');
const app = express();
const db = require('./models/index');
const users = require('./api/user/index');
const auth = require('./api/auth/index');

app.use('/users', users);
app.use('/auth', auth);

app.get('/', (req, res) => {
  res.send('hello~');
});

const options = {
  force: process.env.NODE_ENV === 'test' ? true : false
}

console.log(options)
db.sequelize.sync(options)
  .then(() => {
    console.log('sync DB')
    app.listen(3000, (req, res) => {
      console.log('connection');
    });
  });
