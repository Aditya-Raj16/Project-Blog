//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const async = require("async");
const colors = require("colors");
const formatDate = require("./date");
const connectDb = require("./config/db");
// config dot env file
dotenv.config();

const homeStartingContent = "Anyone can connect with their audience through blogging and enjoy the myriad benefits that blogging provides: organic traffic from search engines, promotional content for social media, and recognition from a new audience you haven’t tapped into yet.";
const aboutContent = "A blog, short for weblog, is a frequently updated web page used for personal commentary or business content. Blogs are often interactive and include sections at the bottom of individual blog posts where readers can leave comments. Most are written in a conversational style to reflect the voice and personal views of the blogger. Some businesses use blogs to connect with target audiences and sell products. Blogs were originally called weblogs, which were websites that consisted of a series of entries arranged in reverse chronological order, so the newest posts appeared at the top. They were frequently updated with new information about various topics.";

//databse call
connectDb();
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {useNewUrlParser: true});


const postSchema = {
  date: {type: String, default: formatDate(new Date().toISOString)},
  category: String,
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", async(req, res) => {
  const posts = await Post.find({});
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });   
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});



app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post ({
    date: req.body.postDate,
    category: req.body.postCategory,
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save();
  res.redirect("/");
});

app.get("/science" , async(req,res) => {
      const posts = await Post.find({category: '1'});
      res.render("science", {
        posts: posts
      });
});
app.get("/buisnss" , async(req,res) => {
      const posts = await Post.find({category: '2'});
      res.render("buisness", {
        posts: posts
      });
});
app.get("/sports" , async(req,res) => {
      const posts = await Post.find({category: '3'});
      res.render("sports", {
        posts: posts
      });
});

app.get("/posts/:postId", async(req, res)=> {

  const requestedPostId = req.params.postId;
  
    const post = await Post.findOne({_id: requestedPostId}).exec();
      res.render("post", {
        date: post.date,
        category: post.category,
        title: post.title,
        content: post.content
      });
  });

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
