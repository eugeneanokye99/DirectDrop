import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fontsource/space-grotesk"; // Defaults to weight 400
import "@fontsource/space-grotesk/400.css"; // Specify weight

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App.jsx'
import ErrorPage from './pages/error_page.jsx';
import './index.css'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import UserProfile  from './pages/UserProfile.jsx';
import Home  from './pages/Home.jsx';
import theme from './theme.js'
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/userprofile",
    element: <UserProfile />,
    errorElement: <ErrorPage />,
    
  },
  {
    path: "/home",
    element: <ProtectedRoute />, // Protect the Home route
    children: [{ path: "", element: <Home /> }],
    errorElement: <ErrorPage />,
    
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
   
    </ChakraProvider>
  </StrictMode>,
)

