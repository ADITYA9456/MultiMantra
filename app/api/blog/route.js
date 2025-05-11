// app/api/blog/route.js

import clientPromise from "@/lib/mongodb";  // Using clientPromise for DB connection
import Blog from "@/app/models/Blog";

export async function POST(req) {
    try {
        const body = await req.json();
        const { title, content, images } = body;

        // Connect to MongoDB using clientPromise
        const client = await clientPromise;
        const db = client.db("MultiMantra");  // Database name
        const collection = db.collection("blogs");  // Assuming "blogs" collection (change if necessary)

        // Create a new blog entry
        const newBlog = new Blog({ title, content, images });
        
        // Save the blog in the DB
        await collection.insertOne(newBlog);

        return new Response(JSON.stringify({ success: true }), {
            status: 201,
        });
    } catch (err) {
        console.error("Error saving blog:", err);
        return new Response(JSON.stringify({ error: "Failed to save blog" }), {
            status: 500,
        });
    }
}
