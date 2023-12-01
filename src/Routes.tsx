import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { Main } from './Main';
import { lazy, Suspense } from 'react';

const PostPage = lazy(() => import('./pages/Posts'));

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
