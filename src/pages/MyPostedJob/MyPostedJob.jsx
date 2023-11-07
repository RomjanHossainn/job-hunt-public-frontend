import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const MyPostedJob = () => {
    const {user} = useContext(AuthContext);
    const [mypostedjob,setMyPostedJob] = useState(null);
    
    useEffect(() =>{
        axios.get(`http://localhost:5000/mypostedjob?email=${user?.email}`)
        .then(result => setMyPostedJob(result.data))
        
    },[user])

    const handleDelete = (_id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:5000/jobdelete?id=${_id}`)
          .then(result => {
            if(result.data.deletedCount){
              const filterDelete = mypostedjob.filter(job => job._id !== _id)
              setMyPostedJob(filterDelete);
            }
          })
          Swal.fire({
            title: "Deleted!",
            text: "Your job has been deleted.",
            icon: "success",
          });
        }
      });
      
    } 
    
    if(!mypostedjob){
        return (
          <span className="loading loading-lg absolute top-1/2 left-1/2 loading-spinner text-gray-700"></span>
        );
    }

    return (
      <div className="relative overflow-x-auto py-14">
        <div className={mypostedjob?.length > 0 ? "" : "mt-40"}>
          <h1 className="text-center text-4xl pb-10">
            {mypostedjob?.length > 0 ? "Posted Job Avalable" : "No Posted Jobs"}
          </h1>
          {!mypostedjob.length > 0 ? (
            <img
              className="max-w-[200px] mx-auto"
              src="https://cdn3.vectorstock.com/i/1000x1000/00/07/not-available-flat-icon-vector-12770007.jpg"
              alt=""
            />
          ) : (
            ""
          )}
        </div>

        <div className={mypostedjob?.length > 0 ? "block" : "hidden"}>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Job Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Min-Salary
                </th>
                <th scope="col" className="px-6 py-3">
                  Max-Salary
                </th>
              </tr>
            </thead>
            <tbody>
              {mypostedjob?.map((posted) => {
                const {
                  job_title,

                  category,
                  max_salary,
                  min_salary,
                  _id,
                  email,
                } = posted || {};
                return (
                  <tr
                    key={posted._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {category}
                    </th>
                    <td className="px-6 py-4">{job_title}</td>
                    <td className="px-6 py-4">{email}</td>
                    <td className="px-6 py-4">{min_salary}TK</td>
                    <td className="px-6 py-4">{max_salary}TK</td>
                    <td className="px-6 py-4 ">
                      <Link
                        to={`/mypostedjobs/updatejob/${_id}`}
                        className="bg-[#22C55E] px-2 py-1 text-white rounded-md"
                      >
                        Update
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(_id)}
                        className="bg-rose-500 text-white px-2 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default MyPostedJob;