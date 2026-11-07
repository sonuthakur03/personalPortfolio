// src/router/AppRouter.tsx
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProjectDetailPage from '../pages/ProjectDetailPage';
import BlogListingPage from '../pages/BlogListingPage';
import BlogDetailPage from '../pages/BlogDetailPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/projects/:id',
    element: <ProjectDetailPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/case-study/:id',
    element: <ProjectDetailPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/blog',
    element: <BlogListingPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/blog/:slug',
    element: <BlogDetailPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default AppRouter;
