import HomeNavbar from "../shared/HomeNavbar";
import According from "../view/According";
import Category from "../view/Category";
import Footer from "../view/Footer";
import Header from "../view/Header";

const Root = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      <HomeNavbar />
      <Header />
      <Category />
      <According />
      <Footer />
    </div>
  );
};

export default Root;
