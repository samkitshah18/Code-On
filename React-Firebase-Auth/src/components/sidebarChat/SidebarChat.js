import { Avatar } from "@mui/material";
import React from "react";
import "./SidebarChat.css";

function SidebarChat() {
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        <p>CodeFile Name</p>
      </div>
    </div>
  );
}

export default SidebarChat;
