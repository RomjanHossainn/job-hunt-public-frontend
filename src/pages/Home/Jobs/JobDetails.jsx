import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import Navigation from "../../../components/Navigation/Navigation";
import Footer from "../../../components/Footer/Footer";
const JobDetails = () => {
  
    const navigateMybids = useNavigate()
    
    const {id} = useParams();
    const [job,setJob] = useState(null)
    const {user} = useContext(AuthContext)
    useEffect(() => {
        axios.get(`http://localhost:5000/job?id=${id}`)
        .then(result => setJob(result.data))
    },[id])


    const {
      job_title,
      jobType,
      location,
      dead_line,
      category,
      max_salary,
      min_salary,

      email,
      description,
    } = job || {};

   
    

    if(!job){
        return (
          <span className="loading loading-lg absolute top-1/2 left-1/2 loading-spinner text-gray-700"></span>
        );
    }


    const handleBidNow = (e) => {
      e.preventDefault();
      const form = e.target;
      const price = form.price.value;
      const dead_line = form.deadline.value;
      const buyeremail = form.buyeremail.value;
      const email = form.email.value;

      const bidsData = {
        price,
        dead_line,
        buyeremail,
        email,
        status : 'pending',
        job_title,
        category,
        location
      }

      axios.post("http://localhost:5000/postbidsjob",bidsData)
      .then(result => {
        if(result.data.insertedId){
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
            title: "Bid on the jobs",
          });
          form.reset();
          navigateMybids('/mybids');
        }
      })
      
    }



    return (
      <>
        <Navigation></Navigation>
        <div className="rounded-md w-full max-w-3xl mx-auto my-12 bg-white px-4 shadow-md transition transform duration-500 ">
          <div className="flex flex-col justify-start">
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold text-bookmark-blue flex space-x-1 items-center mb-2">
                <svg
                  className="w-7 h-7 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                <span>{job_title}</span>
              </div>
              <span className="bg-green-500 rounded-full uppercase text-white text-sm px-4 py-1 font-bold shadow-xl">
                {jobType}
              </span>
            </div>
            <div className="text-sm text-gray-500 flex space-x-1 items-center">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{location}</span>
            </div>
            <div className="mt-3 space-y-1">
              <p className="font-semibold">Category - {category}</p>
              <p>{description}</p>
              <p>Salary:{` ${min_salary} - ${max_salary} TK`}</p>
              <div className="flex justify-between items-center">
                <p>Dead Line : {dead_line}</p>
                <p className="text-[#275DF5]">Send me job like this</p>
              </div>
            </div>
            <div className="mt-5">
              <h1 className="text-lg font-bold">Bid Now</h1>
              <div className="w-full max-w-md  py-10 ">
                <form onSubmit={handleBidNow}>
                  <div>
                    <div className="md:flex -mx-3"></div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-5">
                        <label for="" className="text-xs font-semibold px-1">
                          Salary
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="text"
                            name="price"
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="Salary"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3">
                        <label for="" className="text-xs font-semibold px-1">
                          Dead Line
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="date"
                            name="deadline"
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="Dead Line"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3">
                        <label for="" className="text-xs font-semibold px-1">
                          Your Email
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="email"
                            name="email"
                            defaultValue={user?.email}
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="************"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3">
                        <label for="" className="text-xs font-semibold px-1">
                          Buyer Email
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="email"
                            name="buyeremail"
                            readOnly
                            defaultValue={email}
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex -mx-3 mt-5">
                      <div className="w-full px-3 mb-5">
                        <button
                          disabled={email === user?.email}
                          className={`block w-full mx-auto bg-indigo-500 text-white rounded-lg px-3 py-3 font-semibold`}
                        >
                          Bid on the project
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </>
    );
};

export default JobDetails;