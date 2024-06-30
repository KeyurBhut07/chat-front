import React, { useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import { grayColor } from "../components/constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponent";
import { orange } from "@mui/material/colors";
import FileMenu from "../components/dialogs/FileMenu";
import { samapleMessage, sampleChats } from "../components/constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";

const user = {
  _id : "jkdlsjdks",
  name : "Keyur Ritul"
}

const Chat = () => {
  const containerRef = useRef(null);
    return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"80vh"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {/* message  */}

        {samapleMessage.map(i=>(
          <MessageComponent key={i._id} message={i} user={user}/>
        ))}
      </Stack>
      <form
        style={{
          height: "9vh",
        }}
        action=""
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox placeholder="Type Message Here...." />
          <IconButton
            type="submit"
            sx={{
              rotate: "-40  deg",
              backgroundColor: "orange",
              color: "white",
              marginLeft: "2rem",
              padding: "0.5rem",
              "&:hover": {
                backgroundColor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </>
  );
};

export default AppLayout()(Chat);
