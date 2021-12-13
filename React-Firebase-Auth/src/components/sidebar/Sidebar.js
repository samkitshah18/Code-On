import { useState, useEffect } from "react";
import "./Sidebar.css";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from 'react-router-dom';
import { logout, useAuth } from "../../firebase";
import { IconButton, Avatar } from "@mui/material";
import SidebarChat from "../sidebarChat/SidebarChat";

function Sidebar({ allCodes, setCurrentItem, setAllCodes }) {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
      localStorage.setItem("userInfo", null)
      navigate("/login");
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }


  const newItem = { name: "Untitled", code: "" }


  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://octodex.github.com/images/yogitocat.png" />
        <div className="sidebar__headerRight">
          <IconButton>
            <AddCircleIcon onClick={() => { setAllCodes([newItem, ...allCodes]); setCurrentItem(newItem) }} />
          </IconButton>
          <IconButton>
            <LogoutIcon onClick={handleLogout} />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__chats">
        {/* {rooms.map((room) => ( */}
        {allCodes ?
          allCodes.map(item => {
            return (
              <SidebarChat item={item} setCurrentItem={setCurrentItem} />
            )
          }) : "Empty"
        }


        {/* ))} */}
      </div>
    </div>
  );
}

export default Sidebar;
