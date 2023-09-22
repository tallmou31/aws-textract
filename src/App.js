import axios from 'axios';
import { Suspense } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from 'react-router-dom';
import AppLayout from './components/AppLayout';
import HomePage from './pages/home';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AppLayout />}>
      <Route index element={<HomePage />} />

      <Route path='*' loader={() => redirect('/')} />
    </Route>
  )
);

function App() {
  return (
    <Suspense fallback={<div></div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
