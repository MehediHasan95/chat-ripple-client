import HashLoader from "react-spinners/HashLoader";
import useTitle from "../hooks/useTtile";

const Spinner = () => {
  useTitle("Loading...");
  return (
    <div className="min-h-screen grid place-items-center">
      <HashLoader color="#851A50" />
    </div>
  );
};

export default Spinner;
