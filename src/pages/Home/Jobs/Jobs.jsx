import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SingleJob from "./SingleJob";

const Jobs = () => {
    const { category_name } = useParams();
    const [jobs,setJobs] = useState(null)

    useEffect(() => {
        setJobs(null)
        const getJobs = async () => {
         await axios
            .get(
              `https://jobhut-backend.vercel.app/categoryesitem?name=${category_name}`
            )
            .then((result) => setJobs(result.data));
        }
        getJobs()
    },[category_name])
    

    if(!jobs){
      return (
        <span className="loading loading-lg relative top-20 mb-20 left-1/2 loading-spinner text-gray-700"></span>
        
      );
    }
    
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {
          jobs?.map(job => <SingleJob key={job._id} job={job}></SingleJob>)
        }
      </div>
    );
};

export default Jobs;