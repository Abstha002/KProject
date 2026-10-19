
"use client";

import { useState } from "react";
import PostCard from "@/components/PostCard";
import ExpandedPost from "@/components/ExpandedPost";

const posts = [
  {
    id: 1,
    username: "Alex Morgan",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900",
    caption: "Exploring beautiful places and enjoying nature!",
    likes: 120,
  },
  {
    id: 2,
    username: "Sarah Lee",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900",
    caption: "Coffee makes everything better ☕",
    likes: 85,
  },
  {
    id: 3,
    username: "John Smith",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900",
    caption: "A peaceful escape into the mountains.",
    likes: 210,
  },
];

export default function ImagePost() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <main style={{ maxWidth: 600, margin: "30px auto", padding: 16 }}>
      <h1>My Social Feed</h1>

      {selectedPost ? (
        <ExpandedPost
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onClick={() => setSelectedPost(post)}
          />
        ))
      )}
    </main>
  );
}
