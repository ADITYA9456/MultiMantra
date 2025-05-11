"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BlogViewPage() {
    const searchParams = useSearchParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageList, setImageList] = useState([]);
    const [slug, setSlug] = useState("");

    const params = useParams(); // ✅ hooks se params le rahe

    useEffect(() => {
        const titleParam = searchParams.get("title");
        const contentParam = searchParams.get("content");
        const imagesParam = searchParams.get("images");

        if (titleParam) setTitle(titleParam);
        if (contentParam) setContent(contentParam);
        if (imagesParam) {
            try {
                setImageList(JSON.parse(imagesParam));
            } catch (err) {
                console.error("Error parsing images:", err);
            }
        }

        if (params?.slug) {
            setSlug(params.slug);
        }
    }, [searchParams, params]);

    return (
        <div className="pt-32 px-8 min-h-screen text-white">
            <h1 className="text-5xl font-bold text-center mb-10 text-fuchsia-500">
                {title || slug.replace(/-/g, " ")}
            </h1>

            <div className="prose prose-invert max-w-4xl mx-auto">
                {imageList.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Image ${index + 1}`}
                        className="rounded-xl mb-6 max-w-full"
                    />
                ))}

                <p className="text-lg leading-relaxed whitespace-pre-wrap">
                    {content || "No content available..."}
                </p>
            </div>
        </div>
    );
}
