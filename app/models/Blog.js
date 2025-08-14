// models/Blog.js
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        images: {
            type: [String],
            default: []
        },
        slug: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

// This ensures we have a model only once, preventing errors on hot reloading
export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
