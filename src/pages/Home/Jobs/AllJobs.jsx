import axios from "axios";
import { useEffect, useState } from "react";
import SingleJob from "./SingleJob";

const AllJobs = () => {
    const [jobs, setJobs] = useState(null);
     useEffect(() => {
       const getjobs = async() => {
       await axios
          .get("https://jobhut-backend.vercel.app/alljobs")
          .then((result) => setJobs(result.data));
       }
       getjobs()
     }, []);

     if(!jobs){
        return (
          <span className="loading loading-lg absolute top-1/2 left-1/2 loading-spinner text-gray-700"></span>
        );
        
     }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-6 gap-5">
            {
                jobs?.map(job => <SingleJob key={job._id} job={job}></SingleJob>)
            }
        </div>
    );
};

export default AllJobs;