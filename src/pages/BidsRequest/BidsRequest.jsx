import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

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

    console.log(mybidsreq);

    return (
      <div>
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
                </tr>
              </thead>
              <tbody>
                {mybidsreq?.map((bids) => {
                  const {
                    price,
                    dead_line,
                    email,
                    buyeremail,
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
                      <td className="px-6 py-4">{price}</td>
                      <td className="px-6 py-4">{dead_line}</td>
                      <td className="px-6 py-4">{email}</td>
                      <td className="px-6 py-4">{buyeremail}</td>
                      {status === "pending" ? (
                        <td className="px-6 py-4">
                          <button className="capitalize text-lg font-bold">
                            {status}
                          </button>
                        </td>
                      ) : (
                        <td>Comlete</td>
                      )}
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

export default BidsRequest;