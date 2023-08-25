import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Authentication from "../auth/Authentication";
import ChatRoom from "../pages/ChatRoom";
import RequiredAuth from "./RequiredAuth";
import ChatArea from "../pages/ChatArea";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequiredAuth>
        <Root />
      </RequiredAuth>
    ),
  },
  {
    path: "/chat-room",
    element: (
      <RequiredAuth>
        <ChatRoom />
      </RequiredAuth>
    ),
    children: [
      {
        path: "message/:id",
        element: <ChatArea />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Authentication />,
  },
]);

export default router;