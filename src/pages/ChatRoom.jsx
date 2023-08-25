import useMyFriends from "../hooks/useMyFriends";
import ChatList from "./ChatList";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faHome,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { emptyBox } from "../utilities/image";
import useTitle from "../hooks/useTtile";

const ChatRoom = () => {
  const [{ myFriends, myLoading, myRefetch, user }] = useMyFriends();
  const location = useLocation();
  useTitle("Messenger");

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="grid lg:grid-cols-3">
        <div className="lg:col-span-1 p-3">
          <div className="flex justify-between items-center mb-5">
            <h1 className="font-semibold text-xl">Chats</h1>
            <Link to="/">
              <FontAwesomeIcon
                icon={faHome}
                className="hover:text-frenchPlum"
                title="Back to Home"
              />
            </Link>
          </div>

          <div className="flex flex-row lg:flex-col overflow-auto scroll-container">
            {!myLoading ? (
              myFriends.map((friends) => (
                <ChatList
                  key={friends._id}
                  friends={friends}
                  myRefetch={myRefetch}
                  user={user}
                />
              ))
            ) : (
              <p className="text-center my-10">
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              </p>
            )}
            {myFriends.length === 0 && (
              <div className="text-center">
                <img src={emptyBox} alt="empty_box" className="w-16 mx-auto" />
                <p className="text-sm text-desire">No friends found</p>
              </div>
            )}
          </div>
        </div>
        <div className="lg:col-span-2  min-h-screen grid content-between">
          {location.pathname === "/chat-room" ? (
            <div className="min-h-screen grid place-items-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold">
                  Welcome to{" "}
                  <span className="text-frenchPlum font-signika">
                    <FontAwesomeIcon icon={faComments} className="me-2" />
                    Chat <span className="underline">Ripple</span>
                  </span>
                </h1>
                <p>Please select a chat to start messaging</p>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
