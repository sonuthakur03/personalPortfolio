// src/App.tsx
import { RouterProvider } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { PortfolioContentProvider } from './context/PortfolioContentContext';

function App() {
  return (
    <PortfolioContentProvider>
      <RouterProvider router={AppRouter} />
    </PortfolioContentProvider>
  );
}

export default App;
