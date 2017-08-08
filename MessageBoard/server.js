var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/MessageBoardDB');

var Schema = mongoose.Schema;
var PostSchema = new mongoose.Schema({
    name: { type: String, required: true},
    text: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

var CommentSchema = new mongoose.Schema({
    _post: { type: Schema.Types.ObjectId, ref: 'Post' },
    commentText: { type: String, required: true },
    commentName: { type: String, required: true },
}, { timestamps: true });

mongoose.model('Post', PostSchema);
mongoose.model('Comment', CommentSchema);

var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

app.get('/', function (req, res) {
    Post.find({}).sort('-createdAt').populate('comments').exec(function(err, messages){
        if(err) {
        console.log('something went wrong');
        } else { 
        console.log('successfully retrieved all messages!');
        res.render('index', {'messages':messages});
        }
    })
})

app.post('/addMessage', function (req, res) {
    console.log(req.body);
    var date = new Date();
    var newPost = new Post({name: req.body.name, text: req.body.message, time:date});
    newPost.save(function(err) {
        if(err) {
        console.log('something went wrong');
        } else { 
        console.log('successfully added a new Message!');
        res.redirect('/');
        }
    })
})

app.post('/posts/:id', function (req, res) {
    Post.findOne({ _id: req.params.id }, function (err, post) {
        var comment = new Comment();
        comment.commentText = req.body.comment;
        comment.commentName = req.body.name;
        comment._post = post._id;
        post.comments.push(comment);
        comment.save(function (err) {
            post.save(function (err) {
                if(err){ 
                    console.log('Error'); 
                }
                else{ 
                    res.redirect('/'); 
                }
            });
        });
    });
});

var server = app.listen(8000, function () {
    console.log("listening on port 8000");
});