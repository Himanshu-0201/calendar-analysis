import LayOut from "./components/LayOut/LayOut";
import "./App.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DeniedAccess from "./components/DeniedAccess/DeniedAccess";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import ErrorComponent from "./Errors/Error";
import ErrorProvider from "./Context/ErrorProvider";
import RootLayOut from "./RootLayOut/RootLayOut";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayOut />,
    children: [
      {
        index: true,
        element: <LayOut />
      },
      {
        path: "access-denied",
        element: <DeniedAccess />
      },
      {
        path : "error",
        element : <ErrorComponent />
      }
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
