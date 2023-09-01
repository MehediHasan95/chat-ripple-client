import Dashboard from "../pages/Dashboard";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";

const Root = () => {
  return (
    <div className="min-h-screen grid content-between">
      <div>
        <Navbar />
        <Dashboard />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
