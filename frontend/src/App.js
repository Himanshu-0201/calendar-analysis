import LayOut from "./components/LayOut/LayOut";
import "./App.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DeniedAccess from "./components/DeniedAccess/DeniedAccess";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    // loader : {}
  },
  {
    path : "access-denied",
    element : <DeniedAccess />
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
