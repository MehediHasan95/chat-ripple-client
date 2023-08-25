import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";

const useMessenger = (id) => {
  const { loading } = useAuth();

  const {
    refetch,
    data: userMessage,
    isLoading,
  } = useQuery({
    queryKey: ["messenger"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `https://chat-ripple-server.vercel.app/message-profile/${id}`
      );
      return res.data;
    },
  });

  return [userMessage, refetch, isLoading];
};

export default useMessenger;
