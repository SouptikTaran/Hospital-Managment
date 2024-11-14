import {createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { tokenLoader, checkToken , restrict , logoutFunc } from "./lib/Auth";
import NotFound from "./pages/NotFound";


// export default function App() {
//   // useAuth()
//   const user = useSelector((state: RootState) => state.user);
//   const isAuthenticated = Boolean(user); // Check if user is authenticated
//   console.log("User State:", user);
//   console.log("Is Authenticated:", isAuthenticated);

//   return (
//     <BrowserRouter>
//       <Routes>
//         Protected Route for Dashboard
//         <Route
//           path="/"
//           element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
//         />
//         {/* Login Route */}
//         <Route
//           path="/login"
//           element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }


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