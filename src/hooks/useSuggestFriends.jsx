import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSuggestFriends = () => {
  const { user, loading } = useAuth();

  const {
    refetch,
    data: suggestFriends = [],
    isLoading,
  } = useQuery({
    queryKey: ["suggest-friends"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `https://chat-ripple-server.vercel.app/suggest-friends/${user?.uid}`
      );
      return res.data;
    },
  });
  return [suggestFriends, refetch, isLoading, user];
};

export default useSuggestFriends;
