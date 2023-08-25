import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { female_dp, male_dp, say_hello } from "../utilities/image";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useParams } from "react-router-dom";
import { MALE } from "../utilities/constant";
import useAuth from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";
import axios from "axios";
import useTitle from "../hooks/useTtile";
import useMessenger from "../hooks/useMessenger";
import { useEffect } from "react";

const ChatArea = () => {
  const { id } = useParams();

  const { user, time } = useAuth();
  const [currentProfile] = useProfile();
  const [userMessage, refetch, isLoading] = useMessenger(id);
  const { uid, fullName, gender, dp } = !isLoading ? userMessage : {};
  useTitle(fullName);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    if (currentProfile.fullName) {
      axios
        .post("https://chat-ripple-server.vercel.app/messenger/", {
          [user.uid]: [
            {
              message,
              time,
              sender: user?.uid,
              fullName: currentProfile.fullName,
              dp: currentProfile.dp,
            },
          ],
          sender: user?.uid,
          receiver: uid,
        })
        .then(({ data }) => {
          if (data.success) {
            refetch();
            e.target.reset();
          }
        });
    }
  };
  console.log(isLoading);

  return (
    <>
      <div className="flex justify-between p-3 bg-base-300 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border">
            <img
              src={dp ? dp : gender === MALE ? male_dp : female_dp}
              alt={fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <h1>{fullName}</h1>
        </div>
        <button className="px-4">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>
      </div>
      <div className="h-[52rem] overflow-y-auto message_box">
        {!isLoading && userMessage[user?.uid] ? (
          userMessage[user?.uid]?.map(
            ({ message, fullName, time, dp, sender }, index) => (
              <div key={index} className="p-3 flex space-x-2 items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden border flex ">
                  <img
                    src={dp ? dp : gender === MALE ? male_dp : female_dp}
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full">
                  <div className="space-x-3">
                    <span className="font-bold text-frenchPlum">
                      {fullName}{" "}
                      {sender === user.uid && (
                        <span className="text-blue-500">(Me)</span>
                      )}
                    </span>
                    <span className="text-xs text-gray-400">{time}</span>
                  </div>
                  <h1 className="text-sm text-justify">{message}</h1>
                </div>
              </div>
            )
          )
        ) : (
          <div className="text-center grid place-items-center">
            <div className="text-2xl font-bold">
              <img src={say_hello} alt="say_hello" className="w-3/5 mx-auto" />
              <p>
                Hey! <span className="text-frenchPlum">{fullName}👋</span>
              </p>
              <p className="text-base">
                ChatRipple is a messaging app for friends
              </p>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSendMessage} className="flex mb-1">
        <input
          type="text"
          name="message"
          className="w-full ps-5 py-3 outline-none border-none bg-base-300 rounded-l-full"
          placeholder="Type a message"
        />
        <button className="px-4 py-3 bg-frenchPlum text-white rounded-r-full">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </>
  );
};

export default ChatArea;
