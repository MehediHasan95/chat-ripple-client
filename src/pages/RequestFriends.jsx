import axios from "axios";
import useRequestFriends from "../hooks/useRequestFriends";
import { MALE } from "../utilities/constant";
import { emptyBox, female_dp, male_dp } from "../utilities/image";
import useMyFriends from "../hooks/useMyFriends";

const RequestFriends = () => {
  const [requestFriends, refetch, isLoading, user] = useRequestFriends();

  const [{ myRefetch }] = useMyFriends();

  const handleConfirmRequest = (id, uid) => {
    axios
      .patch(
        `https://chat-ripple-server.vercel.app/request-friends/?sid=${user.uid}&mid=${id}&rid=${uid}`
      )
      .then(({ data }) => {
        if (data.success) {
          refetch();
          myRefetch();
        }
      });
  };

  const handleDeleteRequest = (id, uid) => {
    axios
      .delete(
        `https://chat-ripple-server.vercel.app/request-friends/?sid=${user.uid}&mid=${id}&rid=${uid}`
      )
      .then(({ data }) => {
        if (data.success) {
          refetch();
          myRefetch();
        }
      });
  };

  return (
    <div>
      <div className="mb-3">
        <p className="text-xs leading-3">Friends</p>
        <h1>Requests</h1>
      </div>

      {requestFriends.length === 0 && (
        <div className="text-center">
          <img src={emptyBox} alt="empty_box" className="w-16 mx-auto" />
          <p className="text-sm text-desire">
            No friend requests received yet!
          </p>
        </div>
      )}

      <div className="grid gap-3 lg:grid-cols-2">
        {!isLoading &&
          requestFriends.map(({ _id, uid, fullName, gender, dp }) => (
            <div
              key={_id}
              className="flex items-center space-x-3 p-2 rounded-lg border"
            >
              <div className="w-20 h-20 rounded-lg overflow-hidden border">
                <img
                  src={dp ? dp : gender === MALE ? male_dp : female_dp}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <h1>{fullName}</h1>
                <div className="space-x-2">
                  <button
                    onClick={() => handleConfirmRequest(_id, uid)}
                    className="px-6 py-1 bg-pastelGreen text-white rounded-full border-none"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleDeleteRequest(_id, uid)}
                    className="px-6 py-1 bg-desire text-white rounded-full border-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RequestFriends;
