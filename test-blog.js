// Test script to manually test blog API
const testBlog = async () => {
    try {
        console.log("Testing blog creation...");
        
        // Test POST
        const postResponse = await fetch("http://localhost:3000/api/blog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: "Test Blog Post",
                content: "This is a test blog post content.",
                images: ["https://example.com/image.jpg"]
            }),
        });
        
        const postData = await postResponse.json();
        console.log("POST Response:", postData);
        
        if (postData.slug) {
            // Test GET
            console.log("Testing blog retrieval...");
            const getResponse = await fetch(`http://localhost:3000/api/blog?slug=${postData.slug}`);
            const getData = await getResponse.json();
            console.log("GET Response:", getData);
        }
        
    } catch (error) {
        console.error("Test failed:", error);
    }
};

testBlog();
