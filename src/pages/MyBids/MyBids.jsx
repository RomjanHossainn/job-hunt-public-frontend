import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import { VscCheckAll } from "react-icons/vsc";
import { BsBookmarkX } from "react-icons/bs";
import Swal from "sweetalert2";
const MyBids = () => {
    const [mybids,setMybids] = useState(null);
    const {user} = useContext(AuthContext)
    useEffect(() => {
        axios.get(`http://localhost:5000/yourbidsjobs?email=${user?.email}`)
        .then(result => setMybids(result.data))
    },[user])


    if(!mybids){
        return (
          <span className="loading loading-lg absolute top-1/2 left-1/2 loading-spinner text-gray-700"></span>
        );
    }

    const handleBidDelete = (_id) => {
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
            axios
              .delete(`http://localhost:5000/deletemybid?id=${_id}`)
              .then((result) => {
                if (result.data.deletedCount > 0) {
                    Swal.fire({
                      title: "Deleted!",
                      text: "Your bid has been deleted.",
                      icon: "success",
                    });
                  const filterBids = mybids.filter(bid => bid._id !== _id)
                  setMybids(filterBids)
                  
                }
              });
            
          }
        });
    }
    

    return (
      <div>
        <div className="relative overflow-x-auto py-14">
          <div className={mybids?.length > 0 ? "" : "mt-40"}>
            <h1 className="text-center text-4xl pb-10">
              {mybids?.length > 0
                ? "My bids"
                : "No bids avalable"}
            </h1>
            {!mybids.length > 0 ? (
              <img
                className="max-w-[200px] mx-auto"
                src="https://cdn3.vectorstock.com/i/1000x1000/00/07/not-available-flat-icon-vector-12770007.jpg"
                alt=""
              />
            ) : (
              ""
            )}
          </div>

          <div className={mybids?.length > 0 ? "block" : "hidden"}>
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
                    Salary
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Dead Line
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Clear
                  </th>
                </tr>
              </thead>
              <tbody>
                {mybids?.map((bids) => {
                  const {
                    price,
                    dead_line,
                    _id,
                    email,
                    status,
                    job_title,
                    category,
                    
                  } = bids || {};
                  return (
                    <tr
                      key={bids._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {category}
                      </th>
                      <td className="px-6 py-4">{job_title}</td>
                      <td className="px-6 py-4">{price}TK</td>
                      <td className="px-6 py-4">{dead_line}</td>
                      <td className="px-6 py-4">{email}</td>
                      {status === "pending" ? (
                        <td className="px-6 py-4">
                          <button className="capitalize text-amber-700  font-bold">
                            {status}
                          </button>
                        </td>
                      ) : (
                        <td>
                          {status !== "Rejected" ? (
                            <VscCheckAll
                              className={`text-3xl font-bold ${
                                status === "Rejected"
                                  ? "text-[#F43F5E]"
                                  : "text-[#00A35C]"
                              } ms-3 `}
                            ></VscCheckAll>
                          ) : (
                            <BsBookmarkX
                              className={`text-2xl font-bold ${
                                status === "Rejected"
                                  ? "text-[#F43F5E]"
                                  : "text-[#00A35C]"
                              } ms-3 `}
                            ></BsBookmarkX>
                          )}
                          <p
                            className={`${
                              status === "Rejected"
                                ? "text-[#F43F5E]"
                                : "text-[#00A35C]"
                            }`}
                          >
                            Bid-{status}
                          </p>
                        </td>
                      )}
                      <td className="text-center">
                        <button onClick={() => handleBidDelete(_id)} className="bg-[#F43F5E] text-white rounded-md px-3 py-1">delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default MyBids;