import "./App.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DeniedAccess from "./components/DeniedAccess/DeniedAccess";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import ErrorComponent from "./Errors/Error";
import RootLayOut from "./RootLayOut/RootLayOut";
import DayEvents from "./components/DayEvents/DayEvents";
import Test from "./components/Test/Test.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayOut />,
    children: [
      {
        index: true,
        element: <DayEvents />
      },
      {
        path: "access-denied",
        element: <DeniedAccess />
      },
      {
        path : "error",
        element : <ErrorComponent />
      },
      {
        path : "test",
        element : <Test />
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
