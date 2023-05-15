import React from "react";
import Main from "./Main";
import { UserStore } from "./src/contexts/Context";
export default function App() {
  return (
    <UserStore>
        <Main />
    </UserStore>
  );
}
