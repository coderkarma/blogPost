const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

// App config 
mongoose.connect('mongodb://localhost/restful_blog_app', {
    useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
    extended: true
}, {
    useNewUrlParser: true
}));

// Mongoose/model config
let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});

let Blog = mongoose.model("Blog", blogSchema);

// RestFul Routes
app.get('/', function (req, res) {
    res.redirect('/blogs')
})
app.get('/blogs', function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log("error");
        } else {
            res.render("index", {
                blogs: blogs
            })
        }
    })
})


app.listen(3000, () => {
    console.log("Server is running...")
})