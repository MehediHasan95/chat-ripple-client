import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";

const useMyFriends = () => {
  const { user, loading } = useAuth();
  const {
    refetch: myRefetch,
    data: myFriends = [],
    isLoading: myLoading,
  } = useQuery({
    queryKey: ["my-friends"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `https://chat-ripple-server.vercel.app/my-friends/${user?.uid}`
      );
      return res.data;
    },
  });
  return [{ myFriends, myLoading, myRefetch, user }];
};

export default useMyFriends;
