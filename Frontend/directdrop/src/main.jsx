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
import theme from './theme.js'

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
    
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>,
)

