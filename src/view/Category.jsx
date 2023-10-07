import { chat, group, shield } from "../utilities/image";

const Category = () => {
  return (
    <div className="max-w-screen-2xl mx-auto  my-32">
      <span className="text-xl uppercase my-5 border-b-4 border-bluePigment inline-block text-bluePigment font-bold">
        Our Services
      </span>
      <div className="grid gap-10 lg:grid-cols-3 px-3 lg:px-0">
        <div className="col-span-1 text-center py-10 rounded-lg space-y-5 bg-base-200 hover:bg-bluePigment hover:text-white duration-300 hover:duration-300">
          <img src={chat} alt="" className="w-24 mx-auto" />
          <h1 className="text-xl font-semibold">Instant Message</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
            atque?
          </p>
        </div>
        <div className="col-span-1 text-center py-10 rounded-lg space-y-5 bg-base-200 hover:bg-bluePigment hover:text-white duration-300 hover:duration-300">
          <img src={shield} alt="" className="w-24 mx-auto" />
          <h1 className="text-xl font-semibold">Secure Message</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
            atque?
          </p>
        </div>
        <div className="col-span-1 text-center py-10 rounded-lg space-y-5 bg-base-200 hover:bg-bluePigment hover:text-white duration-300 hover:duration-300">
          <img src={group} alt="" className="w-24 mx-auto" />
          <h1 className="text-xl font-semibold">Find Friends</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
            atque?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Category;
