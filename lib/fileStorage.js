// Simple file-based blog storage for testing
import fs from 'fs';
import path from 'path';

const BLOGS_DIR = path.join(process.cwd(), 'data', 'blogs');

// Ensure blogs directory exists
if (!fs.existsSync(BLOGS_DIR)) {
    fs.mkdirSync(BLOGS_DIR, { recursive: true });
}

export const saveBlog = async (blogData) => {
    try {
        const blogId = Date.now().toString();
        const filename = `${blogData.slug}-${blogId}.json`;
        const filepath = path.join(BLOGS_DIR, filename);
        
        const blogWithId = {
            ...blogData,
            _id: blogId,
            createdAt: new Date().toISOString()
        };
        
        fs.writeFileSync(filepath, JSON.stringify(blogWithId, null, 2));
        console.log('Blog saved to file:', filename);
        return blogWithId;
    } catch (error) {
        console.error('Error saving blog to file:', error);
        throw error;
    }
};

export const getBlogBySlug = async (slug) => {
    try {
        const files = fs.readdirSync(BLOGS_DIR);
        const blogFile = files.find(file => file.startsWith(slug + '-'));
        
        if (!blogFile) {
            console.log('Available files:', files);
            return null;
        }
        
        const filepath = path.join(BLOGS_DIR, blogFile);
        const blogData = JSON.parse(fs.readFileSync(filepath, 'utf8'));
        console.log('Blog found in file:', blogFile);
        return blogData;
    } catch (error) {
        console.error('Error reading blog from file:', error);
        return null;
    }
};

export const getAllBlogs = async () => {
    try {
        const files = fs.readdirSync(BLOGS_DIR);
        const blogs = files.map(file => {
            const filepath = path.join(BLOGS_DIR, file);
            return JSON.parse(fs.readFileSync(filepath, 'utf8'));
        });
        return blogs;
    } catch (error) {
        console.error('Error reading blogs:', error);
        return [];
    }
};
