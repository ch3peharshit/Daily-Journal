const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose')
var _ = require('lodash')

const homeContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const uri ="mongodb+srv://harshit-97:harshit123@dailyjournalcluster0.nfvjo.mongodb.net/postDB?retryWrites=true&w=majority"
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
const postSchema = mongoose.Schema({
  postTitle:String,
  postContent:String
})
const Post = mongoose.model("post",postSchema)
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/',function(req,res){
  Post.find({},(err,foundRes) => {
    if(!err){
      if(foundRes){
        console.log(foundRes)
        res.render('home',{homeStartingContent:homeContent,postsArray:foundRes})

      }
    }
  })
})
app.get("/posts/:postId",function(req,res){
  
 const requestParamId = req.params.postId;

//  posts.forEach(element => {
//    const storedTitle = _.lowerCase(element.textTitle)
//    if(storedTitle === requestParamTitle) {
//      res.render('post',{Title:req.params.textTitle,Content:element.textBody})
//    } 
//  })
Post.findOne({_id:requestParamId},function(err,postRes){
  if(!err) {
    if(postRes){
      res.render('post',{Title:postRes.postTitle,Content:postRes.postContent})
    } else {
      console.log("no data found")
    }
  } else {
    console.log("error fetching from db"+err)
  }
})

 
}) 
app.get('/about',function(req,res){
  res.render('about',{aboutStartingContent:aboutContent})
})
app.get('/contact',function(req,res){
  res.render('contact',{contactStartingContent:contactContent})
})
app.get('/compose',function(req,res){

  res.render('compose')
})

app.post('/compose',function(req,res){
  // const newTitle = req.body.textComposed
  // Post.find({newTitle},(err,found))
 const newPost = new Post({
     postTitle: req.body.textComposed,
     postContent : req.body.textBody
   })
   newPost.save((err)=>{
     if(!err) {
      res.redirect('/')
     } else {
       console.log("error while saviung")
     }
   })
   
  
})








const port = process.env.PORT
if(port == null || port =="" ) {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
