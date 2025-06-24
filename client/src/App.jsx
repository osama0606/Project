// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import Navbar from '../components/Navbar';
import { Box } from '@chakra-ui/react';
import Products from '../pages/Products';
import ErrorBoundary from '../components/ErrorBoundary';

const App = () => {
  return (
  <Box>
    <Navbar/>
    <Routes>
      <Route
          path="/dashboard"
          element={<PrivateRoute>
                      <Dashboard />
                   </PrivateRoute>}/>
      <Route
          path="/products"
          element={<PrivateRoute>
                     <ErrorBoundary>
                       <Products />
                     </ErrorBoundary>
                   </PrivateRoute>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register />} />
    </Routes>

  </Box>
  );
};

export default App;
