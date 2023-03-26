import { createBrowserRouter, redirect } from 'react-router-dom';
import App from '../App';
import CreateOrgs from '../views/CreateOrgs';
import Home from '../views/Home';
import Login from '../views/Login';
import Register from '../views/Register';
import UserOrgs from '../views/UserOrgs';

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index:true,
          element: <Home />
        },
        {
          path:"register",
          element: <Register />
        },
        {
          path:"login",
          element: <Login />
        },
        {
          path: "organization",
          loader:() => {
            if(!localStorage.access_token) throw redirect("/");
            else return null;
          },
          children: [
            {
              index:true,
              element: <UserOrgs />
            },
            {
              path:"create",
              element: <CreateOrgs />
            },
          ]
        }
      ]
    }
  ]);

export default router;