const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
require ("./db/conn");

const Article = require("./models/article");
const articleRoute = require("./route/articles");
const app = express();

const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    const articles =await Article.find().sort({ createdAt:'desc'})
    res.render('articles/index', { articles: articles })
});

app.use("/articles", articleRoute);

app.listen(port, () => {
    console.log(`Server is connected to port ${port}`);
});
