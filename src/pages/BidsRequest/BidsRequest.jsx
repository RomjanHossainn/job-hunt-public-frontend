import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";

const BidsRequest = () => {
    const [mybidsreq, setMybidreq] = useState(null);
    
    const { user } = useContext(AuthContext);
    
    useEffect(() => {
      axios
        .get(`http://localhost:5000/buyeremailjobs?email=${user?.email}`)
        .then((result) => setMybidreq(result.data));
    }, [user?.email]);

    if (!mybidsreq) {
      return (
        <span className="loading loading-lg absolute top-1/2 left-1/2 loading-spinner text-gray-700"></span>
      );
    }

    const handleAccepet = (_id) => {
        
        axios
          .patch(`http://localhost:5000/bidstatus?id=${_id}`, {
            newstatus: "accepted",
          })
          .then((result) => {
            if (result.data.modifiedCount > 0) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Accepted Done",
                showConfirmButton: false,
                timer: 1500,
              });
              const allReq = mybidsreq.filter((item) => item._id !== _id);
              const findReq = mybidsreq.find((item) => item._id === _id);

              findReq.status = "accepted";

              setMybidreq([findReq, ...allReq]);
            }
          });
    }

    const handleReject = (_id) => {
        axios
          .patch(`http://localhost:5000/bidstatus?id=${_id}`, {
            newstatus: "Rejected",
          })
          .then((result) => {
            if (result.data.modifiedCount > 0) {
              const allReq = mybidsreq.filter((item) => item._id !== _id);
              const findReq = mybidsreq.find((item) => item._id === _id);

              findReq.status = "Rejected";

              setMybidreq([findReq, ...allReq]);
            }
          });
    }

    return (
      <div>
        <Navigation></Navigation>
        <div className="relative overflow-x-auto py-14">
          <div className={mybidsreq?.length > 0 ? "" : "mt-40"}>
            <h1 className="text-center text-4xl pb-10">
              {mybidsreq?.length > 0 ? "My bids Request" : "No bids Request avalable"}
            </h1>
            {!mybidsreq.length > 0 ? (
              <img
                className="max-w-[200px] mx-auto"
                src="https://cdn3.vectorstock.com/i/1000x1000/00/07/not-available-flat-icon-vector-12770007.jpg"
                alt=""
              />
            ) : (
              ""
            )}
          </div>

          <div className={mybidsreq?.length > 0 ? "block" : "hidden"}>
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
                    bids Req
                  </th>
                </tr>
              </thead>
              <tbody>
                {mybidsreq?.map((bids) => {
                    
                  const {
                    price,
                    dead_line,
                    email,
                    _id,
                    
                    status,
                    job_title,
                    category,
                  } = bids || {};
                  console.log(status);
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
                        <td className="px-6 py-4 flex items-center gap-4">
                          <button
                            onClick={() => handleAccepet(_id)}
                            className="capitalize bg-[#22C55E] rounded-md px-3 py-1 text-white text-md "
                          >
                            Accepet
                          </button>
                          <button
                            onClick={() => handleReject(_id)}
                            className=" bg-[#F43F5E] rounded-md px-3 py-1 text-white text-md"
                          >
                            Reject
                          </button>
                        </td>
                      ) : (
                        <td
                          className={`font-bold text-lg text-center border px-2 ${
                            status === "Rejected"
                              ? "text-[#ab2c42]"
                              : "text-[#22C55E]"
                          }`}
                        >
                          {status}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
};

export default BidsRequest;