"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl font-semibold ${className} hover:opacity-90`}
    >
      {children}
    </button>
  );
}

function Input({ value, onChange, placeholder, className = "" }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 rounded-lg border text-sm ${className}`}
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 5, className = "" }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full p-3 rounded-lg border text-sm ${className}`}
    />
  );
}

export default function BlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageList, setImageList] = useState([]);

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setImageList((prev) => [...prev, imageUrl.trim()]);
      setImageUrl("");
    }
  };

 const handlePublish = async () => {
    const slug = title.toLowerCase().replace(/\s+/g, "-").slice(0, 30);

    try {
        // 1. Save blog to MongoDB
        const res = await fetch("/api/blog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content, images: imageList }),
        });

        if (!res.ok) throw new Error("Failed to save blog in DB");

        // 2. Redirect to slug page with query (same as before)
        const query = new URLSearchParams({
            title,
            content,
            images: JSON.stringify(imageList),
        }).toString();

        router.push(`/aaa/${slug}?${query}`);
    } catch (err) {
        console.error("Error publishing blog:", err);
        alert("Something went wrong. Blog not published.");
    }
};



  return (
    <div className="pt-32">
      <h1 className="text-6xl font-bold px-10">
        Write your blog with{" "}
        <span className="text-fuchsia-500">MULTIMANTRA !</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 min-h-screen text-white">
        {/* Write Form */}
        <div className="p-6 rounded-2xl shadow-lg ">
          <h2 className="text-2xl font-bold mb-4">Write a Blog</h2>

          <Input
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 text-white"
          />

          <div className="mb-4">
            <Input
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="text-white 0 mb-2"
            />
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 " onClick={handleAddImage}>
              Add Image
            </Button>
          </div>

          <Textarea
            placeholder="Start writing your blog here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="mb-4 text-white  [scrollbar-width:thin]  
            [scrollbar-color:#d946ef_transparent]
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-thumb]:bg-fuchsia-500
            [&::-webkit-scrollbar-thumb]:rounded-lg
            [&::-webkit-scrollbar-track]:bg-transparent"
          />

          <Button
            onClick={handlePublish}
            className="w-full bg-gradient-to-r cursor-pointer from-pink-500 to-purple-500"
          >
            Publish Post
          </Button>
        </div>

        {/* Preview with custom scrollbar */}
        <div
          className="
            p-6 rounded-2xl shadow-lg
            h-[80vh] 
            overflow-y-auto  
            [scrollbar-width:thin]  
            [scrollbar-color:#d946ef_transparent]
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-thumb]:bg-fuchsia-500
            [&::-webkit-scrollbar-thumb]:rounded-lg
            [&::-webkit-scrollbar-track]:bg-transparent
          "
        >
          <h2 className="text-2xl font-bold mb-4">Preview</h2>

          <h3 className="text-xl font-semibold mb-2">
            {title || "Your Blog Title Here"}
          </h3>

          <div className="prose prose-invert max-w-none">
            {imageList.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Blog visual ${idx + 1}`}
                className="mt-4 rounded-xl max-w-full"
              />
            ))}

            {content ? (
              <p>{content}</p>
            ) : (
              <p className="text-gray-400">
                Your blog content will appear here...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
