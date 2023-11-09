import { useContext, useEffect, useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import axios from "axios";
import {NavLink, Outlet } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import Contact from "../../components/Contact/Contact";
import Feature from "../../components/Feature/Feature";
const Home = () => {
  document.title = 'Home Page';
    const {loading} = useContext(AuthContext)
    const [categroyes,setCategoryes] = useState(null)
    
    useEffect(() => {
        const getCategoryes = async() => {
         await axios
            .get("https://jobhut-backend.vercel.app/categoryes")
            .then((result) => {
              setCategoryes(result.data);
            });
        }
        getCategoryes();
    },[])

    


  


    if(loading && !categroyes){
        return (
          <span className="loading loading-lg absolute top-1/2  left-1/2 loading-spinner text-gray-700"></span>
        );
    }
    return (
      <div>
        <Navigation></Navigation>
        <Banner></Banner>
        <div>
          <div className="flex flex-wrap items-center gap-5">
            {categroyes?.map((category) => (
              <NavLink
                to={`/jobs/${category.category_name}`}
                className="bg-[#7B61FF] active:text-red-600 px-5 py-2 rounded-full text-white category"
                key={category._id}
              >
                {category.category_name}
              </NavLink>
            ))}
          </div>
          <div className="relative">
            <Outlet></Outlet>
          </div>
        </div>
        <div>
          <Feature></Feature>
          <Contact></Contact>
          <Footer></Footer>
        </div>
      </div>
    );
};

export default Home;