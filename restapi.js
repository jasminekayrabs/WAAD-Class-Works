const express = require('express');
const {v4: uuidv4 } = require('uuid'); //For generating UUIDs

const app = express();
const port = 3000;

app.use(express.json());

// Mock posts array as a placeholder for database
let posts = [];

app.get('/', (req, res) => {
    res.send('Welcome to the Blog Post Management API!');
  });
  

//Create new post
app.post('/posts', (req, res) => {
    const { date, title, body } = req.body;
    if (!date || !title || !body) {
      return res.status(400).send('Missing required fields');
    }
    const newPost = { id: uuidv4(), date, title, body };
    posts.push(newPost);
    console.log(newPost); // Log to console
    res.status(201).json(newPost);
})

app.get('/posts', (req, res) => {
    // Just an example response to ensure the route works
    res.json(posts);
});

// Get a Single Post by UUID
app.get('/posts/:uuid', (req, res) => {
    const { uuid } = req.params;
    const post = posts.find(post => post.id === uuid);
    if (!post) return res.status(404).send('Post not found');
    res.json(post);
  });


// Update a Post
// app.put('/posts/:uuid', (req, res) => {
//     const { uuid } = req.params;
//     const index = posts.findIndex(post => post.id === uuid);
//     if (index === -1) return res.status(404).send('Post not found');
//     const updatedPost = { ...posts[index], ...req.body };
//     posts[index] = updatedPost;
//     console.log(updatedPost); // Log to console
//     res.json(updatedPost);
//   });

app.put('/posts/:uuid', (req, res) => {
    const { uuid } = req.params;
    const index = posts.findIndex(post => post.id === uuid);
    if (index === -1) return res.status(404).send('Post not found');
    const updatedPost = { ...posts[index], ...req.body };
    posts[index] = updatedPost;
    console.log(updatedPost); // Log to console
    res.json(updatedPost);
});

// Delete a Post
app.delete('/posts/:uuid', (req, res) => {
    const { uuid } = req.params;
    const index = posts.findIndex(post => post.id === uuid);
    if (index === -1) return res.status(404).send('Post not found');
    posts.splice(index, 1);
    res.status(204).send(); // No content to return
  });

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});