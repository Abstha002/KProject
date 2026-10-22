
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function PostsTable({ posts, users, onPostsChange }) {
  const [search, setSearch] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState([]);

  // 1. Search and filter
  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesSearch =
        String(post.id).includes(query) ||
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(query));

      const matchesUser =
        userFilter === "all" ||
        String(post.userId) === userFilter;

      return matchesSearch && matchesUser;
    });
  }, [posts, search, userFilter]);

  // 2. Sort without mutating the original array
  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      const comparison =
        sortBy === "title"
          ? a.title.localeCompare(b.title)
          : a.id - b.id;

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [filteredPosts, sortBy, sortOrder]);

  // 3. Calculate pagination
  const totalPages = Math.max(
    1,
    Math.ceil(sortedPosts.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  const visiblePosts = sortedPosts.slice(
    startIndex,
    startIndex + pageSize
  );

  const visibleIds = visiblePosts.map((post) => post.id);

  const allVisibleSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) => selectedIds.includes(id));

  function resetPage() {
    setPage(1);
    setSelectedIds([]);
  }

  function handleSort(field) {
    if (sortBy === field) {
      setSortOrder((current) =>
        current === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }

    resetPage();
  }

  function togglePost(id) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id]
    );
  }

  function toggleVisiblePosts() {
    setSelectedIds((current) => {
      if (allVisibleSelected) {
        return current.filter((id) => !visibleIds.includes(id));
      }

      return [...new Set([...current, ...visibleIds])];
    });
  }

  function deletePosts(ids) {
    if (ids.length === 0) return;

    const confirmed = window.confirm(
      `Remove ${ids.length} post(s) from this table?`
    );

    if (!confirmed) return;

    onPostsChange((current) =>
      current.filter((post) => !ids.includes(post.id))
    );

    setSelectedIds((current) =>
      current.filter((id) => !ids.includes(id))
    );
  }

  const firstRow = sortedPosts.length === 0 ? 0 : startIndex + 1;
  const lastRow = Math.min(startIndex + pageSize, sortedPosts.length);

  return (
    <section className="posts-manager">
      {/* Search and filters */}
      <div className="posts-toolbar">
        <input
          type="search"
          value={search}
          placeholder="Search title, body, tags, or ID..."
          aria-label="Search posts"
          onChange={(event) => {
            setSearch(event.target.value);
            resetPage();
          }}
        />

        <select
          value={userFilter}
          aria-label="Filter by user"
          onChange={(event) => {
            setUserFilter(event.target.value);
            resetPage();
          }}
        >
          <option value="all">All users</option>

          {users.map((user) => (
            <option key={user.id} value={String(user.id)}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>

        <label>
          Rows per page:{" "}
          <select
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value));
              resetPage();
            }}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Table information and bulk actions */}
      <div className="posts-toolbar">
        <p>
          Showing {firstRow}–{lastRow} of {sortedPosts.length} posts
        </p>

        <div className="posts-actions">
          <button
            type="button"
            onClick={toggleVisiblePosts}
            disabled={visiblePosts.length === 0}
          >
            {allVisibleSelected
              ? "Deselect page"
              : "Select page"}
          </button>

          <button
            type="button"
            onClick={() => deletePosts(selectedIds)}
            disabled={selectedIds.length === 0}
          >
            Delete selected ({selectedIds.length})
          </button>

          <button
            type="button"
            onClick={() => setSelectedIds([])}
            disabled={selectedIds.length === 0}
          >
            Clear selection
          </button>
        </div>
      </div>

      {/* Posts table */}
      <div className="posts-table-wrapper">
        <table className="posts-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={toggleVisiblePosts}
                  aria-label="Select all posts on this page"
                />
              </th>

              <th>
                <button type="button" onClick={() => handleSort("id")}>
                  ID {sortBy === "id" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </button>
              </th>

              <th>
                <button type="button" onClick={() => handleSort("title")}>
                  Title {sortBy === "title" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </button>
              </th>

              <th>User ID</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {visiblePosts.map((post) => (
              <tr key={post.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(post.id)}
                    onChange={() => togglePost(post.id)}
                    aria-label={`Select post ${post.id}`}
                  />
                </td>

                <td>{post.id}</td>

                <td>
                  <Link href={`/post-details/${post.id}`}>
                    {post.title}
                  </Link>
                </td>

                <td>{post.userId}</td>

                <td>{post.tags?.join(", ") || "—"}</td>

                <td>
                  <div className="posts-actions">
                    <Link href={`/post-details/${post.id}`}>
                      View
                    </Link>

                    <button
                      type="button"
                      onClick={() => deletePosts([post.id])}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {visiblePosts.length === 0 && (
              <tr>
                <td colSpan={6}>
                  No posts found. Try another search or filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="posts-pagination">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => setPage((current) => current - 1)}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => setPage((current) => current + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
}
