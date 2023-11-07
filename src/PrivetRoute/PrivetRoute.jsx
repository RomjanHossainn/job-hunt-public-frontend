import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider/AuthProvider";
import { Navigate,  useLocation } from "react-router-dom";

const PrivetRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation()
    if(loading){
        return (
          <span className="loading loading-lg absolute top-1/2 left-1/2 loading-spinner text-gray-700"></span>
        );
    }

    if(user){
        return children;
    }

    return <Navigate state={location.pathname} to="/login"></Navigate>


};

export default PrivetRoute;