import { useContext } from "react";
import Navigation from "../../components/Navigation/Navigation";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const Home = () => {
    const {loading} = useContext(AuthContext)
    if(loading){
        return (
          <span className="loading loading-lg absolute top-1/2 left-1/2 loading-spinner text-gray-700"></span>
        );
    }
    return (
        <div>
            <Navigation></Navigation>
            <h2>Home</h2>
        </div>
    );
};

export default Home;