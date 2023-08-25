import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { emptyBox, female_dp, male_dp } from "../utilities/image";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import useProfile from "../hooks/useProfile";
import { MALE } from "../utilities/constant";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import useMyFriends from "../hooks/useMyFriends";

const Profile = () => {
  const [currentProfile, isLoading] = useProfile();
  const { fullName, email, create, gender, dp } = currentProfile || {};
  const [{ myFriends, myLoading }] = useMyFriends();

  return (
    <div>
      {!isLoading ? (
        <>
          <div className="w-52 h-52 rounded-full mx-auto overflow-hidden border-2 border-frenchPlum">
            <img
              src={dp ? dp : gender === MALE ? male_dp : female_dp}
              alt={fullName}
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>

          <div className="text-center my-3">
            <h1 className="text-xl font-semibold">{fullName}</h1>
            <p className="text-sm">{email}</p>
            <p className="text-sm">Since {create}</p>
          </div>
          <div className="my-3">
            <div className="flex items-center justify-between">
              <div className="my-5">
                <p className="text-xs leading-3">List</p>
                <h1>My Friends</h1>
              </div>
              <div>
                <Link to="/chat-room">
                  <button className="px-5 hover:text-frenchPlum hover:font-semibold underline">
                    Messenger <FontAwesomeIcon icon={faMessage} />
                  </button>
                </Link>
              </div>
            </div>

            {!myLoading ? (
              myFriends.map(({ _id, uid, fullName, gender, dp }) => (
                <Link key={_id} to={`chat-room/message/${uid}`}>
                  <div
                    key={_id}
                    className="flex items-center space-x-3 mb-2 p-1 rounded-lg cursor-pointer hover:text-frenchPlum hover:font-bold"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden border">
                      <img
                        src={dp ? dp : gender === MALE ? male_dp : female_dp}
                        alt={fullName}
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    </div>
                    <h1>{fullName}</h1>
                  </div>
                </Link>
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
        </>
      ) : (
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Profile;
