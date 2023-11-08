import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navigation from "../../components/Navigation/Navigation";
import axios from "axios";
const Login = () => {
    const location = useLocation();
    document.title = 'Login Page';
    
    const navigatepath = useNavigate();
    const [alertMessage, setAlertMessage] = useState("");
    const {signInUser} = useContext(AuthContext)
    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        if ( !email && !password ) {
          return setAlertMessage("All Feilds are requard ");
        } else if (!email) {
          return setAlertMessage("Provied the email");
        } else if (!password) {
          return setAlertMessage("Provied the password");
        }



        
        signInUser(email,password)
        .then(result => {
                if(result.user){
                  console.log(result.user)
                  const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener("mouseenter", Swal.stopTimer);
                      toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                  });

                  Toast.fire({
                    icon: "success",
                    title: "Login Successfully",
                  });
                }
                form.reset()
                
                axios.post(`http://localhost:5000/jwt`,{email:result.user.email}, {withCredentials : true})

                .then(result => {
                  if(result.data.success){
                    navigatepath(location.state ? location.state : '/')
                  } 
                  
                })
                
        })
        .catch(erorr => {
            // console.log(erorr.message)
            if(erorr.message){
              return setAlertMessage('No matcing Your Information sorry')
            }
        })



    }
    return (
      <div>
        <Navigation></Navigation>
        <div className="w-full max-w-md mx-auto py-10 px-5 md:px-10">
          <div className="text-center mb-10">
            <h1 className="font-bold text-3xl text-gray-900">Sign In</h1>
            <p>Your Account</p>
          </div>
          <form onSubmit={handleLogin}>
            <div>
              <div className="md:flex -mx-3"></div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label for="" className="text-xs font-semibold px-1">
                    Email
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="email"
                      name="email"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder=" Your Email"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3">
                  <label for="" className="text-xs font-semibold px-1">
                    Password
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="password"
                      name="password"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="************"
                    />
                  </div>
                  <p className="text-end py-1 cursor-pointer">
                    Forgot Password
                  </p>
                </div>
              </div>

              <p className="pb-2">{alertMessage ? alertMessage : ""}</p>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button className="block w-full  mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                    Login N
                  </button>
                </div>
              </div>
              <p className="text-sm font-light text-gray-500  text-center">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  href="#"
                  state={location.state}
                  className="font-medium text-[#4338CA] hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Login;