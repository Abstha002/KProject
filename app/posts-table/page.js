
"use client";

import { useEffect, useState } from "react";
import PostsTable from "@/components/PostsTable";
import { getPosts, getUsers } from "@/lib/posts";

export default function PostsTablePage() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const [postsData, usersData] = await Promise.all([
        getPosts(),
        getUsers(),
      ]);

      setPosts(postsData);
      setUsers(usersData);
    } catch (err) {
      setError(err.message || "Unable to load data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="posts-manager">
      <h1>Advanced Posts Table</h1>
      <p>Practise search, filtering, sorting, selection, and pagination.</p>

      {loading && <p>Loading posts and users...</p>}

      {!loading && error && (
        <div>
          <p role="alert">{error}</p>
          <button type="button" onClick={loadData}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && (
        <PostsTable
          posts={posts}
          users={users}
          onPostsChange={setPosts}
        />
      )}
    </main>
  );
}
