const Post = require('../models/post');

exports.createPost = async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.user._id,
            tags: req.body.tags
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

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Postausta ei löytynyt' });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Ei oikeuksia poistaa tätä postausta' });
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Postaus poistettu' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTags = async (req, res) => {
    try {
        const tags = await Post.distinct('tags');
        res.json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPostsByTag = async (req, res) => {
    try {
        const posts = await Post.find({ tags: req.params.tag }).populate('author', 'username');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, tags } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(id, { title, content, tags }, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ message: 'Postausta ei löytynyt' });
        }

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};