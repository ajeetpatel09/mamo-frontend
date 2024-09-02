import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MamoPayComponent from "../components/Payment";
import Success from "../components/Success";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MamoPayComponent />
  },
  {
    path: "/mission-complete",
    element: <Success />
  }
]);

function RouteConfig() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default RouteConfig;
