import {createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { tokenLoader, checkToken , restrict , logoutFunc } from "./lib/Auth";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

function App() {
  const routerConfig = [
    {
      loader: tokenLoader,
      id: 'root',
      children: [

        {
          path: "/",
          loader: checkToken,
          element: <Dashboard />
        },
        {
          path :"logout",
          loader : logoutFunc
        }
      ]
    },
    {
      path: "login",
      loader:restrict ,   
      element: <Login />
    },
    {
      path: "*",
      element: <NotFound />
    }
  ];

  const router = createBrowserRouter(routerConfig);

  return (
    <>
    
    <RouterProvider router={router} />

    </>
  );
}

export default App;