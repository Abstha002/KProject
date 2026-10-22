
const API_URL = "https://dummyjson.com";

async function fetchJSON(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export async function getPosts() {
  const data = await fetchJSON(`${API_URL}/posts?limit=0`);
  return data.posts;
}

export async function getUsers() {
  const data = await fetchJSON(`${API_URL}/users?limit=0`);
  return data.users;
}

export async function getPostById(id) {
  const response = await fetch(`${API_URL}/posts/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to load post: ${response.status}`);
  }

  return response.json();
}

export async function getUserById(id) {
  const response = await fetch(`${API_URL}/users/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to load user: ${response.status}`);
  }

  return response.json();
}
