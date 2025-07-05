import React, { useState } from "react";
import BlogCard from "../components/BlogCard";
import NutritionSidebar from "../components/NutritionSidebar";
import { fetchDemoBlogs } from "../api/blog";

// PUBLIC_INTERFACE
function Blog() {
  const [blogs] = useState(fetchDemoBlogs()); // Returns static demo posts for now

  return (
    <div className="ayu-blog-page">
      <h1>Skincare & Ayurveda Blog</h1>
      <div className="ayu-blog-layout">
        <main className="ayu-blog-main">
          {blogs.map(b => (
            <BlogCard key={b.id} blog={b} />
          ))}
        </main>
        <aside className="ayu-blog-sidebar">
          <NutritionSidebar />
        </aside>
      </div>
    </div>
  );
}
export default Blog;
