// src/router/AppRouter.tsx
import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';

// Lazy-load AdminPage so production visitors do not download admin CMS code
const AdminPage = React.lazy(() => import('../pages/AdminPage'));

const isDev = Boolean(import.meta.env.DEV);

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/admin',
    // In production, route /admin directly to NotFoundPage for defense-in-depth
    element: isDev ? (
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <AdminPage />
      </Suspense>
    ) : (
      <NotFoundPage />
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default AppRouter;
