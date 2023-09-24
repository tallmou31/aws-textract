import axios from 'axios';
import { Suspense, useEffect } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from 'react-router-dom';
import AppLayout from './components/AppLayout';
import HomePage from './pages/home';
import { useDispatch } from 'react-redux';
import { getEntities as getErrors } from './redux/error.reducer';
import ErrorPage from './pages/error';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path='errors' element={<ErrorPage />} />

      <Route path='*' loader={() => redirect('/')} />
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getErrors());
  }, [dispatch]);

  return (
    <Suspense fallback={<div></div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
