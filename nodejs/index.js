var cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send("Hello World");
// });

const userRoutes = require('./src/routes/user.route');
app.use('/users', userRoutes);
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})