import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { Main } from './users/Users';
import { lazy, Suspense } from 'react';

const PostsPage = lazy(() => import('./posts/Posts'));
const PostPage = lazy(() => import('./posts/Post'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    //errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/posts',
        element: (
          <Suspense
            fallback={<div className="text-center p-5 text-xl text-slate-00">Loading...</div>}
          >
            <PostsPage />
          </Suspense>
        ),
      },
      {
        path: '/post/:postId',
        element: (
          <Suspense
            fallback={<div className="text-center p-5 text-xl text-slate-00">Loading...</div>}
          >
            <PostPage />
          </Suspense>
        ),
      },
    ],
  },
]);
export function Routes() {
  return <RouterProvider router={router} />;
}
