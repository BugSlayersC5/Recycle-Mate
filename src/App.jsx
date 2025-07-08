import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import Home from './pages/Home';
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import CollectorDashboard from "./pages/CollectorDashboard";
import PickupDetails from "./pages/PickupDetails";
import ManageUsers from "./pages/ManageUsers";
import SchedulePickup from "./pages/SchedulePickup";
import AllPickups from "./pages/AllPickups";
import ManageCollectors from "./pages/ManageCollectors";
import NotFound from "./pages/NotFound";


const RecycleMateRouter = createBrowserRouter(
  [
    { path: '/', element: <Home /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/admin-dashboard', element: <AdminDashboard /> },
    { path: '/user-dashboard', element: <UserDashboard /> },
    { path: '/collector-dashboard', element: <CollectorDashboard /> },
    { path: '/pickup-details', element: <PickupDetails /> },
    { path: '/manage-users', element: <ManageUsers /> },
    { path: '/schedule-pickup', element: <SchedulePickup /> },
    { path: '/all-pickups', element: <AllPickups /> },
    { path: '/manage-collectors', element: <ManageCollectors /> },
    { path: '*', element: <NotFound /> }
  ]
)

export default function App() {
  return (
    <>
      <RouterProvider router={RecycleMateRouter} />
    </>
  )
}


