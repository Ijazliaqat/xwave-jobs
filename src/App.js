import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

// Layout and Main Components
import Layout from "./components/layout/layout";
import HomeJobs from "./components/home/home";
import MyJobs from "./components/my-jobs/my-jobs";
import ProfileDetails from "./components/profile-details/profile-details";
import Users from "./components/users/users";
import PostJob from "./components/post-job/post-job";

// Auth Components
import SignIn from "./components/user-auth/sign-in/sign-in";
import SignUp from "./components/user-auth/sign-up/sign-up";
import ForgetPassword from "./components/user-auth/forget-password/forget-password";
import OtpVerification from "./components/user-auth/forget-password/otp-verification";
import CreateNewPassword from "./components/user-auth/forget-password/create-new-password";

function App() {
  const appRoutes = createBrowserRouter([
    {
      path: '/',
      element: <SignIn />
    },
    {
      path: '/sign-up',
      element: <SignUp />
    },
    // Password Reset Flow
    {
      path: '/forget-password',
      element: <ForgetPassword />
    },
    {
      path: '/verify-otp',
      element: <OtpVerification />
    },
    {
      path: '/create-new-password',
      element: <CreateNewPassword />
    },
    // Protected Routes
    {
      path: "user/",
      element: <Layout />,
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
          path: "post-job/",
          element: <PostJob />,
        },
        {
          path: "profile-details/",
          element: <ProfileDetails />,
        },
        {
          path: "list/",
          element: <Users />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={appRoutes} />
    </>
  );
}

export default App;

