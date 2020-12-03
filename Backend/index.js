//imports
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');
const cors = require('cors');
const routes = require('./routes/index.js');
const app = express();

//config
app.set('port',process.env.PORT || 8000);

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(upload())
//app.use(express.json());///Hace lo mismo del bodyParser
app.use(morgan('dev'));
app.use(cors());

//routes
app.use('/',routes);

//start server
app.listen(app.get('port'),() => {
  console.log('😬 Backend Running on port:', app.get('port'));
})
