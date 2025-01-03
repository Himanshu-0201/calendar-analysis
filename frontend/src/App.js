import "./App.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DeniedAccess from "./components/Pages/DeniedAccess/DeniedAccess.tsx";
import PageNotFound from "./components/Pages/PageNotFound/PageNotFound.tsx";
import ErrorComponent from "./Errors/Error.tsx";
import RootLayOut from "./RootLayOut/RootLayOut.tsx";
import DayEvents from "./components/DayEvents/DayEvents.tsx";
import WeekEvents from "./components/WeekEvents/WeekEvents.tsx";


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
        path : "week-events",
        element : <WeekEvents />
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
