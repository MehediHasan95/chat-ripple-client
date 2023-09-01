import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";

const useProfile = () => {
  const { user, loading } = useAuth();

  const {
    refetch,
    data: currentProfile,
    isLoading,
  } = useQuery({
    queryKey: ["user-profile"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `https://chat-ripple-server.vercel.app/user-profile/${user?.uid}`
      );
      return res.data;
    },
  });

  return [currentProfile, isLoading, refetch];
};

export default useProfile;
