import express from 'express';
import cors from 'cors';
import Post from './models/post';

// connect to mongodb
require('./database/dbConn');

const app = express();
const port = 4000;

var allowlist = ['http://localhost:3000', 'http://localhost:4000'];
var corsOptions = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mongoose is promise based so, always use Async-Await to avoid
// Error: Converting circular structure to JSON

// Find all posts
app.get('/', async (req, res) => {
  const post = await Post.find();

  if (!post) res.status(400).json({ message: 'no post available' });

  res.status(200).send(post);
});

// Create new post
app.post('/', async (req, res) => {
  const { title, body } = req.body;

  const post = new Post();

  post.title = title;
  post.body = body;

  const newPost = await post.save();

  res.status(201).send(newPost);
});

// Update new post
app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  if (isNaN(Number(Object(id)[0]))) return res.status(500).end();
  const post = await Post.findById(id);

  if (!post) res.send(`no post found!`);

  post.title = title ? title : post.title;
  post.body = body ? body : post.body;

  const newPost = await post.save();

  res.status(200).send(newPost);
});

// Delete post by id
app.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(Object(id)[0]))) return res.status(500).end();

  const post = await Post.findById(id);

  await post.deleteOne();

  res.status(200).send('post deleted!');
});

app.listen(port, () => console.log(`Server up on port ${port}!`));
