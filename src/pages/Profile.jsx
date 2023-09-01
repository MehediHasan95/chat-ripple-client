import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { emptyBox, female_dp, male_dp } from "../utilities/image";
import { faEdit, faMessage } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import useProfile from "../hooks/useProfile";
import { MALE } from "../utilities/constant";
import { faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import useMyFriends from "../hooks/useMyFriends";
import axios from "axios";
import { useEffect, useState } from "react";
import { AttentionSeeker } from "react-awesome-reveal";

const Profile = () => {
  const [currentProfile, isLoading, refetch] = useProfile();
  const { _id, fullName, email, create, gender, dp, status } =
    currentProfile || {};
  const [{ myFriends, myLoading }] = useMyFriends();
  const [loader, setLoader] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setLoader(true);
    const fullName = e.target.fullName.value;
    const dp = e.target.dp.value;
    const gender = e.target.gender.value;
    axios
      .patch(`https://chat-ripple-server.vercel.app/user-profile/${_id}`, {
        fullName,
        dp,
        gender,
      })
      .then(({ data }) => {
        if (data.success) {
          setLoader(false);
          setUpdateSuccess(true);
          refetch();
        }
      });
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      {!isLoading ? (
        <>
          <div className="relative">
            <label
              htmlFor="edit_my_profile"
              title="Edit your profile"
              className="absolute top-1 right-1 hover:text-bluePigment cursor-pointer"
            >
              <FontAwesomeIcon icon={faEdit} />
            </label>

            <div
              className={`w-52 h-52 rounded-full mx-auto overflow-hidden border-4 ${
                status ? "border-green-500" : "border-red-500"
              }`}
            >
              <img
                src={dp ? dp : gender === MALE ? male_dp : female_dp}
                alt={fullName}
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
            {!dp && (
              <AttentionSeeker effect="pulse">
                <p className="text-center text-xs text-white bg-desire w-fit mx-auto px-2 my-3">
                  Please upload your profile picture
                </p>
              </AttentionSeeker>
            )}
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
                  <button className="px-5 hover:text-bluePigment hover:font-semibold underline">
                    Messenger <FontAwesomeIcon icon={faMessage} />
                  </button>
                </Link>
              </div>
            </div>

            {!myLoading ? (
              myFriends.map(({ _id, uid, fullName, gender, dp, status }) => (
                <Link key={_id} to={`chat-room/message/${uid}`}>
                  <div
                    key={_id}
                    className="flex items-center space-x-3 mb-2 p-1 rounded-lg cursor-pointer hover:text-bluePigment hover:font-bold"
                  >
                    <div className={`avatar ${status ? "online" : "offline"}`}>
                      <div className="w-12 rounded-full">
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
                          <span className="text-red-500">Offline</span>
                        )}
                      </p>
                    </div>
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

      <>
        <input type="checkbox" id="edit_my_profile" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            {updateSuccess ? (
              <div className="text-center">
                <p className="mb-5 text-green-500">
                  Your profile updated successfully
                </p>
                <label htmlFor="edit_my_profile" className="btn btn-xs">
                  Cancle <FontAwesomeIcon icon={faXmark} />
                </label>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">
                    Update you profile information
                  </h3>
                  <label htmlFor="edit_my_profile" className="btn btn-xs">
                    <FontAwesomeIcon icon={faXmark} />
                  </label>
                </div>
                <form onSubmit={handleUpdateProfile} className="my-5">
                  <input
                    type="text"
                    defaultValue={fullName}
                    name="fullName"
                    className="w-full p-2 mb-3 border outline-none"
                    placeholder="Full Name"
                    required
                  />
                  <input
                    type="text"
                    defaultValue={dp}
                    name="dp"
                    className="w-full p-2 mb-3 border outline-none"
                    placeholder="Photo url"
                  />
                  <select
                    name="gender"
                    defaultValue={gender}
                    className="w-full p-2 mb-3 border outline-none"
                  >
                    <option selected disabled>
                      {gender ? gender : "Empty"}
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <button className="w-full p-2 bg-bluePigment text-white">
                    {loader ? (
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="animate-spin"
                      />
                    ) : (
                      "Update Now"
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default Profile;
