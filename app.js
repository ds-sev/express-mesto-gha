const mongoose = require('mongoose');

const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
})
  .then(() => console.log('connected'))
  .catch((err) => console.log(`connection error ${err}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', require('./routes/users'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
