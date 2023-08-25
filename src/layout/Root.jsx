import Dashboard from "../pages/Dashboard";
import Navbar from "../shared/Navbar";

const Root = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default Root;
