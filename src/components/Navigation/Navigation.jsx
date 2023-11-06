import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo.png'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const Navigation = () => {



    const {user,logOut} = useContext(AuthContext)

    const handleLogout = () => {
      logOut()
      .then(() => {
        // console.log('logout success')
      })
      .catch(erorr => {
        // console.log(erorr)
      })
    }

    const navLinks = <>
        <li><NavLink className='text-lg' to="/home">Home</NavLink></li>
        <li><NavLink className='text-lg' to="/addjobs">Add Jobs</NavLink></li>
        <li><NavLink className='text-lg' to="/mypostedjobs">My Posted Jobs</NavLink></li>
        <li><NavLink className='text-lg' to="/mybids">My Bids</NavLink></li>
        <li><NavLink className='text-lg' to="/bidrequest">Bid Request</NavLink></li>
        <li><NavLink className='text-lg' to="/login">Login</NavLink></li>
    </>
    return (
      <div className="navbar bg-base-100">
        <div className="max-w-max">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="cursor-pointer w-[120px]">
            <img src={logo} alt="" />
          </Link>
        </div>

        <div className="navbar-end flex-1">
          <div className="navbar-center hidden lg:flex me-8">
            <ul className="menu menu-horizontal px-1">{navLinks}</ul>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user ? user.photoURL : ""} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {
                user?<h3 className=" text-lg text-center mb-3">
                Name :- {user ? user.displayName : ""}
              </h3>:''
              }
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                {user ? (
                  <a onClick={handleLogout}>Logout</a>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
};

export default Navigation;