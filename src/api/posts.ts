export type Post = {
  id: number;
  title: string;
  body: string;
};

export async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
