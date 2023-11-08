import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
const AddJob = () => {
    
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleAddJob = (e) => {
        e.preventDefault()
        const form = e.target;
        const min_salary = form.min_price.value;
        const max_salary = form.max_price.value;
        const job_title = form.job_title.value;
        const location = form.location.value;
        const jobType = form.jobType.value;
        const category = form.category.value;
        const dead_line = form.dead_line.value;
        const email = form.email.value;
        const description = form.description.value;


        const addJob = {
            min_salary,
            max_salary,
            job_title,
            location,
            jobType,
            category,
            dead_line,
            email,
            description
        }

        axios.post("http://localhost:5000/jobpost",addJob)
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
                  title: "Job Addeded Successfully",
                });
                form.reset();
                navigate("/mypostedjobs");
            }
        })
        

    }
    return (
      <>
        <Navigation></Navigation>
        <form
          onSubmit={handleAddJob}
          className="w-full max-w-3xl mx-auto pt-12 md:pt-12 py-10"
        >
          <div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label for="" className="text-xs font-semibold px-1">
                    Min-Price
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="text"
                      name="min_price"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="min-Price"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label for="" className="text-xs font-semibold px-1">
                    Max-Price
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="text"
                      name="max_price"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="Max-Price"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label for="" className="text-xs font-semibold px-1">
                    Job Title
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="text"
                      name="job_title"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="job title"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label for="" className="text-xs font-semibold px-1">
                    Location
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="text"
                      name="location"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="location"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label for="" className="text-xs font-semibold px-1">
                    Job Type
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="text"
                      name="jobType"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="job type"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label for="" className="text-xs font-semibold px-1">
                    Select Category
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                    </div>
                    <select
                      name="category"
                      className="border w-full py-3 px-3 rounded-md"
                    >
                      <option value="graphic design">graphic design</option>
                      <option value="web development">web development</option>
                      <option value="digital marketing">
                        digital marketing
                      </option>
                    </select>
                    {/* <input
                    type="text"
                    name="category"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="category"
                  /> */}
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
                      name="dead_line"
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
                      readOnly
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="************"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3">
                  <label for="" className="text-xs font-semibold px-1">
                    Description
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                    </div>
                    <textarea
                      type="text"
                      name="description"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="Description"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex -mx-3 mt-5">
              <div className="w-full px-3 mb-5">
                <button
                  className={`block w-full mx-auto bg-indigo-500 text-white rounded-lg px-3 py-3 font-semibold`}
                >
                  Add Job
                </button>
              </div>
            </div>
          </div>
        </form>
        <Footer></Footer>
      </>
    );
};

export default AddJob;