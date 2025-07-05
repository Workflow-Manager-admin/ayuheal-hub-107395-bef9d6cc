import React from "react";

// PUBLIC_INTERFACE
function BlogCard({ blog }) {
  return (
    <div className="ayu-blog-card">
      <img src={blog.image || "/blog-placeholder.jpg"} alt={blog.title} className="ayu-blog-img" />
      <span className="ayu-blog-cat">{blog.category}</span>
      <h3>{blog.title}</h3>
      <div className="ayu-blog-meta">{blog.author} · {blog.date}</div>
      <p>{blog.summary}</p>
      <a href={blog.url} target="_blank" rel="noopener noreferrer" className="ayu-link">Read more</a>
    </div>
  );
}
export default BlogCard;
