import { Avatar } from "@mui/material";
import React from "react";
import "./SidebarChat.css";

function SidebarChat({ item, setCurrentItem }) {
  return (
    <div className="sidebarChat" onClick={() => { console.log(item.code); setCurrentItem(item) }}>
      <Avatar />
      <div className="sidebarChat__info">
        <p>{item.name}</p>
      </div>
    </div>
  );
}

export default SidebarChat;
