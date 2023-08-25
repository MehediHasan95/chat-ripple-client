import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";

const useRequestFriends = () => {
  const { user, loading } = useAuth();

  const {
    refetch,
    data: requestFriends = [],
    isLoading,
  } = useQuery({
    queryKey: ["request-friends"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `https://chat-ripple-server.vercel.app/request-friends/${user?.uid}`
      );
      return res.data;
    },
  });
  return [requestFriends, refetch, isLoading, user];
};

export default useRequestFriends;
