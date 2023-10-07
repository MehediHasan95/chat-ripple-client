import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Dashboard from "./Dashboard";

const Home = () => {
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

export default Home;
