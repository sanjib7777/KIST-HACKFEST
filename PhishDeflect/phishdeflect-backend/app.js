const express = require('express');
const app = express();
const db = require('./config/mongoose-connection');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const usersRouter = require('./routes/usersRouter');
const adminRouter = require('./routes/adminRouter');
const urlsRouter = require('./routes/urlsRouter');
const reportsRouter = require('./routes/reportsRouter');

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(
    cors({
      credentials: true,
      // origin: "http://localhost:3000",
    origin:true,
      methods: ["POST", "GET", "PUT", "DELETE"],
      optionsSuccessStatus: 200,
    })
  );

app.use("/users",usersRouter);
app.use("/admin",adminRouter);
app.use("/urls",urlsRouter);
app.use("/reports",reportsRouter);


app.listen (3001, () => {
    console.log('Server is running on port 3001');
});