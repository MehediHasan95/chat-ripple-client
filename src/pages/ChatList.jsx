import { NavLink } from "react-router-dom";
import { MALE } from "../utilities/constant";
import { female_dp, male_dp } from "../utilities/image";
import { useEffect, useState } from "react";

const ChatList = ({ friends, myRefetch, user }) => {
  const { uid, fullName, dp, gender } = friends;
  const [lastMessage, setLastMessage] = useState({});

  useEffect(() => {
    setLastMessage(friends[user?.uid]?.pop());
    myRefetch();
  }, [friends, myRefetch, user]);

  return (
    <NavLink to={`message/${uid}`}>
      {({ isActive }) => (
        <div
          className={
            isActive
              ? "flex flex-col lg:flex-row items-center space-x-0 lg:space-x-3 mb-2 cursor-pointer p-1 rounded-lg bg-base-300"
              : "flex flex-col lg:flex-row items-center space-x-0 lg:space-x-3 mb-2 cursor-pointer p-1 rounded-lg"
          }
        >
          <div className="w-10 lg:w-14 h-10 lg:h-12 rounded-full overflow-hidden border">
            <img
              src={dp ? dp : gender === MALE ? male_dp : female_dp}
              alt={fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between h-10 lg:h-6 text-center">
              <h1 className="font-semibold text-xs lg:text-base">{fullName}</h1>
              <p className="text-xs hidden lg:block">{lastMessage?.time}</p>
            </div>
            <p className="text-xs hidden lg:block">{lastMessage?.message}</p>
          </div>
        </div>
      )}
    </NavLink>
  );
};

export default ChatList;
