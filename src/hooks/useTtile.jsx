import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Chat Ripple`;
  }, [title]);
};

export default useTitle;
