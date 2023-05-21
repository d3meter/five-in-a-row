import { createContext } from "react";

const UserContext = createContext({
  user1: null,
  user2: null,
});

export default UserContext;