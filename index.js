//index.js
let express = require('express')
let app = express();
var port = process.env.PORT || 8080;

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');


//Import routes
let apiRoutes = require("./routes")
//Use API routes in the App
app.use('/', apiRoutes)

app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

// Launch app to the specified port
app.listen(port, function() {
    console.log("Running Mohadarati on Port "+ port);
})

//connect to mongoose
// const dbPath = 'mongodb://localhost/mohadarati';
// const options = {useNewUrlParser: true, useUnifiedTopology: true}
// const mongo = mongoose.connect(dbPath, options);
// mongo.then(() => {
//     console.log('connected');
// }, error => {
//     console.log(error, 'error');
// })