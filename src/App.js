import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import HomeJobs from "./components/home/home";
import Layout from "./components/layout/layout";
import MyJobs from "./components/my-jobs/my-jobs";
import ProfileDetails from "./components/profile-details/profile-details";
import SignIn from "./components/user-auth/sign-in/sign-in";
import SignUp from "./components/user-auth/sign-up/sign-up";

function App() {
  const appRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // errorElement: <PageNotFound />,
      children: [
        {
          path: "dashboard/",
          element: <HomeJobs />,
        },
        {
          path: "my-jobs/",
          element: <MyJobs />,
        },
        {
          path: "profile-details/",
          element: <ProfileDetails />,
        },
      ],
    },
    {
      path:'/sign-in',
      element: <SignIn />
    },
    {
      path:'/sign-up',
      element: <SignUp />
    }
  ]);
  return (
    <>
      <RouterProvider router={appRoutes} />
    </>
  );
}

export default App;
