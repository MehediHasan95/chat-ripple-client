import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const HomeNavbar = () => {
  const { user, loading } = useAuth();

  return (
    <>
      <div className="navbar max-w-screen-2xl mx-auto">
        <div className="navbar-start">
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
              <li>
                <button className="btn-sm w-24 rounded-full hover:bg-bluePigment hover:text-white">
                  Home
                </button>
              </li>
              <li>
                <button className="btn-sm w-24 rounded-full hover:bg-bluePigment hover:text-white">
                  About
                </button>
              </li>
              <li>
                <button className="btn-sm w-24 rounded-full hover:bg-bluePigment hover:text-white">
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <h1 className="text-bluePigment text-2xl font-bold font-signika">
            <FontAwesomeIcon icon={faComments} className="me-2" />
            Chat <span className="underline">Ripple</span>
          </h1>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal px-1">
            <li>
              <button className="btn-sm w-24 rounded-full hover:bg-bluePigment hover:text-white">
                Home
              </button>
            </li>
            <li>
              <button className="btn-sm w-24 rounded-full hover:bg-bluePigment hover:text-white">
                About
              </button>
            </li>
            <li>
              <button className="btn-sm w-24 rounded-full hover:bg-bluePigment hover:text-white">
                Contact
              </button>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <p>{!loading && user.displayName}</p>
          ) : (
            <Link to="/auth">
              <button className="btn-sm w-28 rounded-full border border-bluePigment hover:bg-bluePigment hover:text-white">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeNavbar;
