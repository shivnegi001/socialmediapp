const Post = require('../models/post');
const formidable = require("formidable");
const fs = require("fs");

exports.getPosts = (req, res) => {
    const posts = Post.find()
        .select("_id title body")
        .then(posts => {
            res.json(posts);
        })
        .catch(err => console.log(err));
};

exports.createPost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    console.log(req.profile)
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        console.log(req.profile)
        let post = new Post(fields);

        
        post.postedBy = req.profile;

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};
