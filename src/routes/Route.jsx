import { createBrowserRouter} from "react-router-dom";
import Root from "../layout/Root/Root";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Jobs from "../pages/Home/Jobs/Jobs";
import AllJobs from "../pages/Home/Jobs/AllJobs";
import JobDetails from "../pages/Home/Jobs/JobDetails";
import AddJob from "../pages/AddJob/AddJob";
import MyPostedJob from "../pages/MyPostedJob/MyPostedJob";
import JobUpdate from "../pages/JobUpdate/JobUpdate";
import MyBids from "../pages/MyBids/MyBids";
import BidsRequest from "../pages/BidsRequest/BidsRequest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        children: [
          {
            path: "/",
            element: <AllJobs></AllJobs>,
          },
          {
            path: "/jobs/:category_name",
            element: <Jobs></Jobs>,
          },
        ],
      },
      {
        path: "/jobs/:category/:id",
        element: <JobDetails></JobDetails>,
      },
      {
        path: "/mybids",
        element: <MyBids></MyBids>,
      },
      {
        path: "/bidrequest",
        element : <BidsRequest></BidsRequest>
      },
      {
        path: "/addjobs",
        element: <AddJob></AddJob>,
      },
      {
        path: "/mypostedjobs",
        element: <MyPostedJob></MyPostedJob>,
      },
      {
        path: "/mypostedjobs/updatejob/:id",
        element: <JobUpdate></JobUpdate>,
      },

      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);


export default router;