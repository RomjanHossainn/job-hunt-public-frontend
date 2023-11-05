import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const navigateHome = useNavigate()
    const {createUser} = useContext(AuthContext)

    const [alertMessage,setAlertMessage] = useState('')

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
                navigateHome('/')
                console.log(user)
                
              })
              .catch((error) => {
                console.log(error.message)
              });
          })
          .catch((erorr) => {
            console.log(erorr.message)
          });


    }
    return (
      <div className="w-full max-w-xl mx-auto py-10 px-5 md:px-10">
        <div className="text-center mb-10">
          <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
          <p>Enter your information to register</p>
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
            <p className="py-5">{alertMessage ? alertMessage : ''}</p>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <button className="block w-full  mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                  REGISTER NOW
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
};

export default Register;