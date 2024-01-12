import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/home/Home";
import Tour from "../pages/tour/Tour";

const Router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/tour/:tourId",
        element: <Tour />,
      },
    ],
  },
]);

export default Router;
