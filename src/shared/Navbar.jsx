import {
  faClock,
  faComments,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { signOutUser, create } = useAuth();

  return (
    <div className="bg-base-100">
      <div className="navbar max-w-screen-2xl mx-auto">
        <div className="flex-1">
          <h1 className="text-bluePigment text-2xl font-bold font-signika">
            <FontAwesomeIcon icon={faComments} className="me-2" />
            Chat <span className="underline">Ripple</span>
          </h1>
        </div>
        <div className="flex-none space-x-5">
          <p className="hidden lg:block">
            <FontAwesomeIcon icon={faClock} /> Today {create}
          </p>
          <button
            onClick={() => signOutUser()}
            className="bg-desire text-white px-2 lg:px-4 py-1 text-xs lg:text-sm rounded-full uppercase"
          >
            Sign Out <FontAwesomeIcon icon={faSignOut} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
