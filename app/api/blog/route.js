// app/api/blog/route.js

import Blog from "@/app/models/Blog";
import { getAllBlogs, getBlogBySlug, saveBlog } from "@/lib/fileStorage";
import { connectDB } from "@/public/db/connectDb";

export async function POST(req) {
    try {
        console.log("POST /api/blog called");
        
        const body = await req.json();
        console.log("Request body:", body);
        
        const { title, content, images } = body;
        
        // Create a slug from the title (for URL)
        const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 30);
        console.log("Generated slug:", slug);

        const blogData = {
            title,
            content,
            images: images || [],
            slug
        };

        let savedBlog;

        try {
            // Try MongoDB first
            await connectDB();
            const newBlog = new Blog(blogData);
            savedBlog = await newBlog.save();
            console.log("Blog saved to MongoDB:", savedBlog._id);
        } catch (mongoError) {
            console.log("MongoDB failed, using file storage:", mongoError.message);
            // Fallback to file storage
            savedBlog = await saveBlog(blogData);
            console.log("Blog saved to file storage");
        }

        return new Response(JSON.stringify({ success: true, slug }), {
            status: 201,
        });
    } catch (err) {
        console.error("Error saving blog:", err);
        return new Response(JSON.stringify({ 
            error: "Failed to save blog", 
            details: err.message 
        }), {
            status: 500,
        });
    }
}

// GET handler to fetch blog by slug
export async function GET(req) {
    try {
        console.log("GET /api/blog called");
        
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get("slug");
        
        console.log("Requested slug:", slug);
        
        if (!slug) {
            return new Response(JSON.stringify({ error: "Slug is required" }), {
                status: 400,
            });
        }

        let blog = null;
        let allBlogs = [];

        try {
            // Try MongoDB first
            await connectDB();
            allBlogs = await Blog.find({}).lean();
            blog = await Blog.findOne({ slug }).lean();
            console.log("Using MongoDB - All blogs:", allBlogs.length);
        } catch (mongoError) {
            console.log("MongoDB failed, using file storage:", mongoError.message);
            // Fallback to file storage
            allBlogs = await getAllBlogs();
            blog = await getBlogBySlug(slug);
            console.log("Using file storage - All blogs:", allBlogs.length);
        }
        
        console.log("Available slugs:", allBlogs.map(b => b.slug));
        console.log("Blog found for slug '" + slug + "':", blog ? "Yes" : "No");
        
        if (!blog) {
            console.error(`Blog with slug "${slug}" not found`);
            return new Response(JSON.stringify({ 
                error: "Blog not found",
                availableSlugs: allBlogs.map(b => b.slug)
            }), {
                status: 404,
            });
        }

        // Ensure _id is a string
        if (blog._id && typeof blog._id === 'object') {
            blog._id = blog._id.toString();
        }

        console.log("Returning blog:", blog.title);
        return new Response(JSON.stringify({ blog }), {
            status: 200,
        });
    } catch (err) {
        console.error("Error fetching blog:", err);
        return new Response(JSON.stringify({ error: "Failed to fetch blog: " + err.message }), {
            status: 500,
        });
    }
}
