
export default function ExpandedPost({ post, onClose }) {
  return (
    <article
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 20,
      }}
    >
      <button onClick={onClose}>← Back to feed</button>

      <h2>{post.username}</h2>

      <img
        src={post.image}
        alt="Expanded post"
        style={{
          width: "100%",
          maxHeight: 500,
          objectFit: "contain",
          background: "#f3f3f3",
        }}
      />

      <p>{post.caption}</p>
      <p>👍 {post.likes} likes</p>

      <hr />

      <button>Like</button>
      <button>Comment</button>
      <button>Share</button>
    </article>
  );
}
