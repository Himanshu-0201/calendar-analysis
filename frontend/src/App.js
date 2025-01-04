import "./App.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DeniedAccess from "./components/Pages/DeniedAccess/DeniedAccess.tsx";
import PageNotFound from "./components/Pages/PageNotFound/PageNotFound.tsx";
import ErrorComponent from "./Errors/Error.tsx";
import RootLayOut from "./RootLayOut/RootLayOut.tsx";
import Dashboard from "./components/DashBoard/DashBoard.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayOut />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "access-denied",
        element: <DeniedAccess />
      },
      {
        path: "error",
        element: <ErrorComponent />
      },
    ]
  },
  {
    path: "*",
    element: <PageNotFound />
  }
]);





function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
