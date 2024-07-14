import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import HomeJobs from "./components/home/home";
import Layout from "./components/layout/layout";

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
