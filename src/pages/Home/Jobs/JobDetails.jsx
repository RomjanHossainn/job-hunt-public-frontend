import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const JobDetails = () => {
    const {category,id} = useParams();
    const [job,setJob] = useState(null)
    useEffect(() => {
        axios.get(``)
    },[])
    return (
        <div>
           
        </div>
    );
};

export default JobDetails;