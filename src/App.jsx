import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations } from 'redux/auth';
import { lazy, Suspense } from 'react';
import AppBar from './components/AppBar';
import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import PrivateRoute from 'components/Routes/PrivateRoute';
import PublicRoute from 'components/Routes/PublicRoute';
import { authSelectors } from 'redux/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = lazy(() => import('Views/HomePage'));
const ContactsPage = lazy(() => import('./Views/ContactsPage'));
const NotFoundPage = lazy(() => import('Views/NotFoundPage'));
const Registration = lazy(() => import('Views/Registration'));
const SignIn = lazy(() => import('Views/SignIn'));

export default function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return isFetchingCurrentUser ? (
    <Box sx={{ width: 300 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  ) : (
    <Routes>
      <Route path="/" element={<AppBar />}>
        <Route
          index
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="contacts"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PrivateRoute>
                <ContactsPage />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="register"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PublicRoute restricted>
                <Registration />
              </PublicRoute>
            </Suspense>
          }
        />
        <Route
          path="login"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PublicRoute restricted>
                <SignIn />
              </PublicRoute>
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PublicRoute>
                <NotFoundPage />
              </PublicRoute>
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
