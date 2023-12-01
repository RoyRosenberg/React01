export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch('http://localhost:3001/posts');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
