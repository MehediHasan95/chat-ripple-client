import axios from "axios";
import useSuggestFriends from "../hooks/useSuggestFriends";
import { MALE } from "../utilities/constant";
import { emptyBox, female_dp, male_dp } from "../utilities/image";
import { useState } from "react";
import { Bounce } from "react-awesome-reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const SuggestFriends = () => {
  const [suggestFriends, refetch, isLoading, user] = useSuggestFriends();
  const [select, setSelect] = useState("");

  const handleSendRequest = (id) => {
    axios
      .patch(
        `https://chat-ripple-server.vercel.app/suggest-friends/?sid=${user.uid}&rid=${id}`
      )
      .then(({ data }) => {
        if (data.success) {
          refetch();
          setSelect("");
        }
      });
  };

  const handleCancleRequest = (id) => {
    axios
      .delete(
        `https://chat-ripple-server.vercel.app/suggest-friends/?sid=${user.uid}&rid=${id}`
      )
      .then(({ data }) => {
        if (data.success) {
          refetch();
          setSelect("");
        }
      });
  };

  return (
    <div>
      <div className="mb-3">
        <p className="text-xs leading-3">Friends</p>
        <h1>Suggestions</h1>
      </div>

      {suggestFriends.length === 0 && (
        <div className="text-center">
          <img src={emptyBox} alt="empty_box" className="w-16 mx-auto" />
          <p className="text-sm text-desire">No results found</p>
        </div>
      )}

      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!isLoading &&
          suggestFriends.map(({ _id, fullName, dp, gender, send_request }) => (
            <Bounce key={_id}>
              <div className="col-span-1 text-center rounded-lg p-3 bg-base-100 cursor-pointer hover:shadow-lg duration-300 hover:duration-300">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto shadow">
                  <img
                    src={dp ? dp : gender === MALE ? male_dp : female_dp}
                    alt="dp"
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
                <div className="h-14 grid place-items-center my-2">
                  <h1>{fullName}</h1>
                </div>
                <div>
                  {send_request?.includes(user.uid) ? (
                    <button
                      onClick={() => {
                        setSelect(_id);
                        handleCancleRequest(_id);
                      }}
                      className="w-full py-1 rounded-full bg-desire text-white"
                    >
                      {select === _id ? (
                        "Canceling..."
                      ) : (
                        <>
                          <span>Pending</span>
                          <FontAwesomeIcon icon={faClock} className="ms-2" />
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelect(_id);
                        handleSendRequest(_id);
                      }}
                      className="w-full py-1 rounded-full bg-bluePigment text-white"
                    >
                      {select === _id ? "Adding..." : "Add Friend"}
                    </button>
                  )}
                </div>
              </div>
            </Bounce>
          ))}
      </div>
    </div>
  );
};

export default SuggestFriends;
