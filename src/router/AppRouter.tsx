// src/router/AppRouter.tsx
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AdminPage from '../pages/AdminPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default AppRouter;
