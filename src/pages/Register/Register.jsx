import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import { signInWithPopup, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
const Register = () => {
    const navigateHome = useNavigate()
    const {createUser} = useContext(AuthContext)

    const [alertMessage,setAlertMessage] = useState('')
    const location = useLocation()
    
    const handleSignUp = (e) => {
        e.preventDefault()
        const form = e.target;
        
        const firstName = form.firstname.value;
        const lastName = form.lastname.value;
        const fullName = `${firstName} ${lastName}`;
        const email = form.email.value;
        const password = form.password.value;
        const imageURL = form.imageURL.value;


        if (!firstName && !lastName && !email && !password && !imageURL) {
          return setAlertMessage("All Feilds are requard ");
        } else if (!firstName) {
          return setAlertMessage("Provied the firstname");
        } else if (!lastName) {
          return setAlertMessage("Provied the lastname");
        } else if (!email) {
          return setAlertMessage("Provied the email");
        } else if (!password) {
          return setAlertMessage("Provied the password");
        } else if (!imageURL) {
          return setAlertMessage("Provied the imageURL");
        }

        if(!/^(?=.*[A-Z])(?=.*[\W_]).{6,}$/.test(password)){
            return setAlertMessage(
              "provied a valid password min-6 char && special char && capital letter"
            );
        }else if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)){
            return setAlertMessage('Provied the valid email')
        }
        

        createUser(email, password)
          .then((result) => {
            const user = result.user;

            updateProfile(user, {
              displayName: fullName,
              photoURL: imageURL,
            })
              .then(() => {
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
                  title: "Register Successfully",
                });
                form.reset();
                navigateHome(location.state?location.state : '/')
                
                
              })
              .catch((error) => {
                console.log(error.message)
              });
          })
          .catch((erorr) => {
            console.log(erorr.message)
          });
    }


    const provider = new GoogleAuthProvider()
    
    const handleGoogle = () => {
      signInWithPopup(auth,provider)
      .then(result => {
        // console.log(result.user)
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
          title: "Register Successfully",
        });
        navigateHome(location.state?location.state:'/');
      })
      .catch(erorr => {
        // console.log(erorr.message)
      })
    }


    return (
      <div className="w-full max-w-xl mx-auto py-10 px-5 md:px-10">
        <div className="text-center mb-10">
          <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
          <p>Enter your information to register</p>
          <div className="flex justify-center mt-5">
            <div className="px-6 sm:px-0 max-w-sm">
              <button onClick={handleGoogle}
                type="button"
                className="text-white  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
              >
                <svg
                  className="mr-2 -ml-1 w-4 h-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
        <form onSubmit={handleSignUp}>
          <div>
            <div className="md:flex -mx-3">
              <div className=" flex-1 px-3 mb-5">
                <label for="" className="text-xs font-semibold px-1">
                  First name
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="text"
                    name="firstname"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="First Name"
                  />
                </div>
              </div>
              <div className=" flex-1 px-3 mb-5">
                <label for="" className="text-xs font-semibold px-1">
                  Last name
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="text"
                    name="lastname"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Last Name"
                  />
                </div>
              </div>
            </div>
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
              <div className="w-full px-3 mb-4">
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
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 ">
                <label for="" className="text-xs font-semibold px-1">
                  Image URL
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="text"
                    name="imageURL"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Image URL"
                  />
                </div>
              </div>
            </div>
            <p className="py-5">{alertMessage ? alertMessage : ""}</p>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <button className="block w-full  mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                  REGISTER NOW
                </button>
              </div>
            </div>
            <div className="text-grey-dark mt-6 text-center">
              Already have an account?
              <Link
                to="/login"
                className="no-underline text-[#4338CA] font-bold border-b border-blue text-blue"
              >
                Log in
              </Link>
              .
            </div>
          </div>
        </form>
      </div>
    );
};

export default Register;