const express = require("express");
const mongoose = require("mongoose")


var PORT = process.env.PORT || 3000;
var app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));



//connecting to mongodb
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout',
    {
        useNewUrlParser: true,
        useFindAndModify: false
    }
);

require("./routes/html-routes")(app);

app.listen(PORT, function () {
    console.log(`App running on port ${PORT}!`);
});
0