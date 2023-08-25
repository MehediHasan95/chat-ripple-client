import useTitle from "../hooks/useTtile";
import Profile from "./Profile";
import RequestFriends from "./RequestFriends";
import SuggestFriends from "./SuggestFriends";

const Dashboard = () => {
  useTitle("Home");
  return (
    <div>
      <div className="grid lg:grid-cols-5">
        <div className="lg:col-span-2 p-3">
          <Profile />
        </div>
        <div className="lg:col-span-3 p-3">
          <RequestFriends />
          <hr className="my-5" />
          <SuggestFriends />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
