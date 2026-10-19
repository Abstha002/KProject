
export default function PostCard({ post, onClick }) {
  return (
    <article
      onClick={onClick}
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        cursor: "pointer",
      }}
    >
      <h3>{post.username}</h3>

      <img
        src={post.image}
        alt="Post"
        style={{
          width: "100%",
          height: 250,
          objectFit: "cover",
          borderRadius: 8,
        }}
      />

      <p>{post.caption}</p>
      <p>👍 {post.likes} likes</p>

      <small>Click to expand post</small>
    </article>
  );
}
