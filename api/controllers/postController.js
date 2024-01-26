const Post = require('../models/post');

exports.createPost = async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.user._id
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Postausta ei löytynyt' });
        }


        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Ei oikeuksia poistaa tätä postausta' });
        }

        await post.remove();
        res.status(200).json({ message: 'Postaus poistettu' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        if (!post) {
            return res.status(404).json({ message: 'Postausta ei löytynyt' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
