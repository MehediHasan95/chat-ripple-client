import { Link } from "react-router-dom";
import { header_image } from "../utilities/image";

const Header = () => {
  return (
    <div className="grid lg:grid-cols-2 max-w-screen-2xl mx-auto">
      <div className="col-span-1 grid place-items-center">
        <div className="space-y-4 text-center lg:text-left my-10 lg:my-0 px-3 lg:px-0">
          <h1 className="text-3xl lg:text-7xl font-patuaOne">
            <span className="text-bluePigment">Communication</span> made easy
            with instant <span className="text-desire">messaging</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde sed
            ipsum aliquid odio nesciunt minus, similique maiores vitae nostrum
            officiis.
          </p>
          <Link to="/home" className="inline-block">
            <button className="btn-sm lg:btn-md rounded-full w-32 bg-bluePigment text-white">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <div className="col-span-1 grid place-items-center">
        <img src={header_image} alt="" />
      </div>
    </div>
  );
};

export default Header;
