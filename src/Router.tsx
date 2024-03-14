import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { FAQ } from './pages/FAQ';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/faq',
    element: <FAQ />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
