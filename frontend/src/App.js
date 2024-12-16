import LayOut from "./components/LayOut/LayOut";
import "./App.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DeniedAccess from "./components/DeniedAccess/DeniedAccess";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import ErrorComponent from "./Errors/Error";


const router = createBrowserRouter([
  {
    path: "/",
    errorElement : <ErrorComponent />, 
    children: [
      {
        index: true,
        element: <LayOut />
      },
      {
        path: "access-denied",
        element: <DeniedAccess />
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
