import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { female_dp, male_dp, say_hello } from "../utilities/image";
import {
  faEllipsisVertical,
  faFaceSmile as faFaceSmileBold,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useParams } from "react-router-dom";
import { MALE } from "../utilities/constant";
import useAuth from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";
import axios from "axios";
import useTitle from "../hooks/useTtile";
import useMessenger from "../hooks/useMessenger";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import moment from "moment";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const ChatArea = () => {
  const { id } = useParams();
  const { user, time } = useAuth();
  const [currentProfile] = useProfile();
  const [message, refetch, isLoading] = useMessenger(id);
  const [emoji, setEmoji] = useState(false);
  const [selectEmoji, setSlectEmoji] = useState([]);

  const { uid, fullName, gender, dp, status, activeFromNow } = !isLoading
    ? message
    : {};

  useTitle(fullName);
  useEffect(() => {
    refetch();
  }, [refetch, id]);

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
            setSlectEmoji([]);
          }
        });
    }
  };

  const handleEmojiSelect = (emoji) => {
    setSlectEmoji([...selectEmoji, emoji.native]);
  };

  return (
    <>
      <div className="grid lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex justify-between p-3 bg-base-100">
            <div className="flex items-center space-x-3">
              <div className={`avatar ${status && "online"}`}>
                <div className="w-10 rounded-full border">
                  <img
                    src={dp ? dp : gender === MALE ? male_dp : female_dp}
                    alt={fullName}
                  />
                </div>
              </div>
              <div>
                <h1>{fullName}</h1>
                <p className="text-xs font-normal">
                  {status ? (
                    <span className="text-green-500">Active</span>
                  ) : (
                    <spam className="text-red-500">Offline</spam>
                  )}
                </p>
              </div>
            </div>
            <button className="px-4">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
          </div>
          <div className="h-[88vh] overflow-y-auto message_box bg-base-200">
            {!isLoading && message[user?.uid] ? (
              message[user?.uid]?.map(
                ({ message, fullName, time, dp, sender }, index) => (
                  <div key={index} className="p-3 flex space-x-2 items-center">
                    <div className="avatar">
                      <div className="w-8 rounded-full border">
                        <img
                          src={dp ? dp : gender === MALE ? male_dp : female_dp}
                          alt={fullName}
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <div className="space-x-2">
                        <span className="font-bold text-bluePigment">
                          {fullName}{" "}
                          {sender === user.uid && (
                            <span className="text-blue-500">(Me)</span>
                          )}
                        </span>
                        <span className="text-xs text-gray-400">
                          {moment(time).startOf().fromNow()} {time}
                        </span>
                      </div>
                      <h1 className="text-sm text-justify">{message}</h1>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="text-center grid place-items-center">
                <div className="text-2xl font-bold">
                  <Lottie
                    loop
                    animationData={say_hello}
                    play
                    style={{ width: 300, height: 300 }}
                  />

                  <p>
                    Say hi!{" "}
                    <span className="text-bluePigment">{fullName}👋</span>
                  </p>
                  <p className="text-base">
                    ChatRipple is a messaging app for friends
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center space-x-2 px-2 relative">
            <div
              className={`absolute bottom-16 left-5 z-10 ${
                emoji ? "block" : "hidden"
              }`}
            >
              <Picker
                data={data}
                onEmojiSelect={(emoji) => handleEmojiSelect(emoji)}
                previewPosition="none"
              />
            </div>
            <div className="avatar">
              <button
                onClick={() => setEmoji(!emoji)}
                className="w-12 h-12 rounded-full  bg-base-100"
              >
                <FontAwesomeIcon
                  icon={emoji ? faFaceSmileBold : faFaceSmile}
                  className="text-xl"
                />
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="flex w-full">
              <input
                type="text"
                name="message"
                onFocus={() => setEmoji(false)}
                defaultValue={selectEmoji.join("")}
                className="w-full ps-5 py-3 outline-none border-none bg-base-100 rounded-l-full"
                placeholder="Type a message"
              />
              <button className="px-4 py-3 bg-bluePigment text-white rounded-r-full">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </div>
        </div>
        <div className="col-span-1 text-center bg-base-100 hidden lg:block">
          <div className={`avatar ${status ? "online" : "offline"}  mt-5`}>
            <div className="w-24 rounded-full border">
              <img
                src={dp ? dp : gender === MALE ? male_dp : female_dp}
                alt={fullName}
              />
            </div>
          </div>

          <h1 className="text-xl font-semibold">{fullName}</h1>
          <p className="text-sm text-gray-400">
            {status ? (
              "Active now"
            ) : (
              <>Active {moment(activeFromNow).startOf().fromNow()}</>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatArea;
