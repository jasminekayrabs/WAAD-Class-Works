import { v4 as uuidv4 } from 'uuid';


const db = require('./postgres');
 module.exports = {
     // Fetch all posts
    async getAllPosts() {
        const sql = 'SELECT * FROM posts ORDER BY date DESC';
        const result = await db.query(sql);
        return result.rows;
    },

    // Get a single post by ID
    async getPostById(id) {
        const sql = 'SELECT * FROM posts WHERE id = $1';
        const result = await db.query(sql, [id]);
        return result.rows[0];
    },

    // Create a new post
    async createPost({ date, title, body }) {
        const id = uuidv4(); // Generate a new UUID
        const sql = 'INSERT INTO posts (id, date, title, body) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await db.query(sql, [id, date, title, body]);
        return result.rows[0];
    },

    // Update an existing post
    async updatePost(id, { date, title, body }) {
        const sql = 'UPDATE posts SET date = $2, title = $3, body = $4 WHERE id = $1 RETURNING *';
        const result = await db.query(sql, [id, date, title, body]);
        return result.rows[0];
    },

    // Delete a post
    async deletePost(id) {
        const sql = 'DELETE FROM posts WHERE id = $1';
        await db.query(sql, [id]);
        return;
    }
};
