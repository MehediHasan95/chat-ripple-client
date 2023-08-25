import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";

const useProfile = () => {
  const { user, loading } = useAuth();

  const { data: currentProfile, isLoading } = useQuery({
    queryKey: ["user-profile"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `https://chat-ripple-server.vercel.app/user-profile/${user?.uid}`
      );
      return res.data;
    },
  });
  return [currentProfile, isLoading];
};

export default useProfile;
