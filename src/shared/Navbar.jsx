import { faComments, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { signOutUser } = useAuth();

  return (
    <div>
      <div className="py-5 flex justify-between px-3 mb-3">
        <h1 className="text-frenchPlum text-2xl font-bold font-signika">
          <FontAwesomeIcon icon={faComments} className="me-2" />
          Chat <span className="underline">Ripple</span>
        </h1>
        <button
          onClick={() => signOutUser()}
          className="px-4 py-1 rounded-lg uppercase shadow hover:bg-desire hover:text-white text-sm duration-300 hover:duration-300"
        >
          Sign out <FontAwesomeIcon icon={faSignOut} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
