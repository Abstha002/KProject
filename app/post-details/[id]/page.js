
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getPostById, getUserById } from "@/lib/posts";

export default function PostDetailsPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadPost() {
      setLoading(true);
      setPost(null);
      setUser(null);
      setError("");

      try {
        if (!/^\d+$/.test(String(id)) || Number(id) < 1) {
          return;
        }

        const postData = await getPostById(id);

        if (!postData) {
          return;
        }

        const userData = await getUserById(postData.userId);

        if (!cancelled) {
          setPost(postData);
          setUser(userData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load post.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPost();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="posts-manager">
        <p>Loading post details...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="posts-manager">
        <p role="alert">{error}</p>
        <Link href="/posts-table">Back to Posts</Link>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="posts-manager">
        <h1>Post not found</h1>
        <p>The post ID is invalid or the post does not exist.</p>
        <Link href="/posts-table">Back to Posts</Link>
      </main>
    );
  }

  return (
    <main className="posts-manager">
      <Link href="/posts-table">← Back to Posts</Link>

      <article className="post-detail">
        <p>Post ID: {post.id}</p>
        <h1>{post.title}</h1>
        <p>{post.body}</p>

        <h2>Tags</h2>
        <div className="post-tags">
          {post.tags?.length
            ? post.tags.map((tag) => <span key={tag}>{tag}</span>)
            : "No tags"}
        </div>

        <h2>Reactions</h2>
        <p>Likes: {post.reactions?.likes ?? 0}</p>
        <p>Dislikes: {post.reactions?.dislikes ?? 0}</p>
        <p>Views: {post.views ?? 0}</p>

        <h2>Author</h2>
        {user ? (
          <>
            <p>{user.firstName} {user.lastName}</p>
            <p>{user.email}</p>
            <p>Username: {user.username}</p>
          </>
        ) : (
          <p>Author information is unavailable.</p>
        )}
      </article>
    </main>
  );
}
