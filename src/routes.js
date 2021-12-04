const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const Post = require('./models/Post');

const router = Router();

router.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
  try {
    console.log(req.file);

    const { originalname, key, size, location: url = '' } = req.file;

    const post = await Post.create({
      name: originalname,
      key,
      size,
      url,
    });
  
    res.json({
      status: "success",
      data: { post },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;