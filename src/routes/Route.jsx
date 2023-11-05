import { createBrowserRouter} from "react-router-dom";
import Root from "../layout/Root/Root";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";

const router = createBrowserRouter([
    {
        path : '/',
        element : <Root></Root>,
        children : [
            {
                path :'/',
                element : <Home></Home>
            },
            {
                path : '/register',
                element : <Register></Register>
            }
        ]
    }
])


export default router;