import React, {useState, useEffect} from 'react';
import Home from "./Home";
import {BrowserRouter as Router, Outlet, useRoutes, Navigate} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import MyProducts from "./components/MyProducts";
import AddProduct from "./components/product/AddProduct";
import { checkLogged } from './actions/helpers';
import Header from "./components/Header";
import Footer from "./components/Footer";

// App routes
const App = () => {

  let element = useRoutes([
    { 
      element: <ProtectedRoute />,
      children: [
        {
          path: "/myproducts",
          element: <MyProducts/>
        },
        {
          path: "/add",
          element: <AddProduct/>
        }
      ]
    },
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    }
  ]);

  return (
    <>
    <Header /> 
    {element}
    <Footer />
    </>
  )
};
  
// function to protect route
const ProtectedRoute = () => {
  const [logged, setLogged] = useState(null);

  useEffect(() => {
    checkLogged().then(e => { setLogged(e); });
  }, [logged]);

  if(logged == null) return;
  // if user is not logged in, return to login
  if (logged !== true)
    return <Navigate to="/login" replace />;

  // return Outlet if user is logged in
  return <Outlet />;
};

export default App;