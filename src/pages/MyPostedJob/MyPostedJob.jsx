import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
const MyPostedJob = () => {
    const {user} = useContext(AuthContext);
    const [mypostedjob,setMyPostedJob] = useState(null);
    
    useEffect(() =>{
        axios.get(`http://localhost:5000/mypostedjob?email=${user?.email}`)
        .then(result => setMyPostedJob(result.data))
        
    },[user])
    
    if(!mypostedjob){
        return (
          <span className="loading loading-lg absolute top-1/2 left-1/2 loading-spinner text-gray-700"></span>
        );
    }

    return (
      <div className="relative overflow-x-auto py-14">
        <h1 className="text-center text-3xl pb-10">{mypostedjob?.length > 0 ? 'Posted Job Avalable' : 'No Posted Jobs'}</h1>
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
           {
            mypostedjob?.map(posted => {
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
                      <button className="bg-rose-500 text-white px-2 py-1 rounded-md">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
            })
           }
          </tbody>
        </table>
      </div>
    );
};

export default MyPostedJob;