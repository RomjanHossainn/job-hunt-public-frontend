import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const JobUpdate = () => {
    const {user} = useContext(AuthContext);
    const {id} = useParams();
    console.log(id)
    const [previusJob,setPreviusJob] = useState(null)
    useEffect(() => {
        axios.get(`https://jobhut-backend.vercel.app/job?id=${id}`)
        .then(result => setPreviusJob(result.data))
    },[id])

    console.log(previusJob)
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
    } = previusJob || {};

    const handleUpdate = e => {
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
      const updateJob = {
        min_salary,
        max_salary,
        job_title,
        location,
        jobType,
        category,
        dead_line,
        email,
        description,
      };

      axios.put(`https://jobhut-backend.vercel.app/updatejob?id=${id}`,updateJob)
      .then(result => {
        if(result.data.modifiedCount > 0){
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
            title: "Update Successfully",
          });
        }
      })
      
    }

    if(!previusJob){
        return (
          <span className="loading loading-lg absolute top-1/2 left-1/2 loading-spinner text-gray-700"></span>
        );
    }


    return (
      <form
        onSubmit={handleUpdate}
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
                    defaultValue={min_salary}
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
                    defaultValue={max_salary}
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
                    defaultValue={job_title}
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
                    defaultValue={location}
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
                    defaultValue={jobType}
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
                  Category
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="text"
                    defaultValue={category}
                    name="category"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="category"
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
                    name="dead_line"
                    defaultValue={dead_line}
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
                    defaultValue={email}
                    readOnly
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="email"
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
                    defaultValue={description}
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
                Update Job
              </button>
            </div>
          </div>
        </div>
      </form>
    );
};

export default JobUpdate;