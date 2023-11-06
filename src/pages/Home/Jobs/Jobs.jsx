import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SingleJob from "./SingleJob";

const Jobs = () => {
    const { category_name } = useParams();
    const [jobs,setJobs] = useState(null)

    useEffect(() => {
        setJobs(null)
        axios.get(`http://localhost:5000/categoryesitem?name=${category_name}`)
        .then(result => setJobs(result.data))
    },[category_name])
    
    useEffect(() => {
        setJobs(null)
        axios.get(`http://localhost:5000/categoryesitem?name=${category_name}`)
        .then(result => setJobs(result.data))
    },[category_name])

    if(!jobs){
      return (
        <span className="loading loading-lg absolute top-1/2 left-1/2 loading-spinner text-gray-700"></span>
        
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