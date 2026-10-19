"use client";

import { useEffect, useState } from "react";

const API = "https://dummyjson.com/posts";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  // GET: Fetch posts
  async function getPosts() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API}?limit=10`);

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data.posts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  // POST: Create a new post
  async function addPost(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          userId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const newPost = await response.json();

      // Update UI with the API response
      setPosts((current) => [newPost, ...current]);
      setTitle("");
      setBody("");
      setMessage("Post created successfully!");
    } catch (err) {
      setError(err.message);
    }
  }

  // PUT: Update an existing post
  async function updatePost(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API}/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            body,
            userId: 1,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      const updatedPost = await response.json();

      setPosts((current) =>
        current.map((post) =>
          post.id === editingId
            ? { ...post, ...updatedPost }
            : post
        )
      );

      setEditingId(null);
      setTitle("");
      setBody("");
      setMessage("Post updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  }

  // DELETE: Remove a post
  async function deletePost(id) {
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      setPosts((current) =>
        current.filter((post) => post.id !== id)
      );

      setMessage("Post deleted successfully!");
    } catch (err) {
      setError(err.message);
    }
  }

  function startEditing(post) {
    setEditingId(post.id);
    setTitle(post.title);
    setBody(post.body);
    setMessage("");
    setError("");
  }

  function cancelEditing() {
    setEditingId(null);
    setTitle("");
    setBody("");
  }

  return (
    <main
  className="posts-manager"
  style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}
>
      <h1>Posts Manager</h1>
      <p>Practise GET, POST, PUT and DELETE.</p>

      <form onSubmit={editingId !== null ? updatePost : addPost}>
        <h2>{editingId !== null ? "Edit Post" : "Create Post"}</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          required
          style={{ display: "block", width: "100%", padding: 10, marginBottom: 10 }}
        />

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Post content"
          required
          style={{ display: "block", width: "100%", padding: 10, marginBottom: 10 }}
        />

        <button type="submit">
          {editingId !== null ? "Save Changes" : "Create Post"}
        </button>

        {editingId !== null && (
          <button type="button" onClick={cancelEditing}>
            Cancel
          </button>
        )}
      </form>

      {message && <p>{message}</p>}
      {error && <p role="alert">Error: {error}</p>}

      <h2>All Posts</h2>

      {loading ? (
        <p>Loading posts...</p>
      ) : (
        posts.map((post) => (
          <article
            key={post.id}
            style={{ border: "1px solid #ccc", padding: 16, marginBottom: 12 }}
          >
            <h3>{post.title}</h3>
            <p>{post.body}</p>

            <button onClick={() => startEditing(post)}>
              Edit
            </button>

            <button onClick={() => deletePost(post.id)}>
              Delete
            </button>
          </article>
        ))
      )}
    </main>
  );
}
