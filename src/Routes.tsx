import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { Main } from './Main';
import { Posts } from './pages/Posts';

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
        element: <Posts />,
      },
    ],
  },
]);
export function Routes() {
  return <RouterProvider router={router} />;
}
