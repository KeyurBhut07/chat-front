import {
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  setRef,
  Tooltip,
} from '@mui/material';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsFileMenu, setUploadLoader } from '../../redux/slices/misc';
import {
  AudioFile,
  Image as ImageIcon,
  UploadFile,
  VideoFile,
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useSendAttachmentsMutation } from '../../redux/api/api';

const FileMenu = ({ ancoreE1, chatId }) => {
  const { isFileMenu } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const closeFile = () => dispatch(setIsFileMenu(false));

  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const fileRef = useRef(null);

  const [sendAttachments] = useSendAttachmentsMutation();

  const selectImage = () => imageRef.current?.click();
  const selectAudio = () => audioRef.current?.click();
  const selectVideo = () => videoRef.current?.click();
  const selectFile = () => fileRef.current?.click();

  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);
    if (files.length <= 0) return;
    if (files.length > 5)
      return toast.error(`You can only send 5 ${key} at a time`);

    dispatch(setUploadLoader(true));
    const toastId = toast.loading(`Sending ${key}...`);
    closeFile();
    try {
      // fettching start here
      const myForm = new FormData();
      myForm.append('chatId', chatId);
      files.forEach((file) => myForm.append('files', file));

      const response = await sendAttachments(myForm);
      if (response?.data) {
        toast.success(`Sent ${key} successfully`, { id: toastId });
      } else {
        toast.error(`Failed to send ${key}`, { id: toastId });
      }
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      dispatch(setUploadLoader(false));
    }
  };
  return (
    <Menu anchorEl={ancoreE1} open={isFileMenu} onClose={closeFile}>
      <div style={{ width: '10rem' }}>
        <MenuList>
          <MenuItem onClick={selectImage}>
            <Tooltip title="Image">
              <ImageIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: '0.5rem' }}>Image</ListItemText>
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg, image/gif"
              style={{ display: 'none' }}
              ref={imageRef}
              onChange={(e) => fileChangeHandler(e, 'Images')}
            />
          </MenuItem>

          <MenuItem onClick={selectVideo}>
            <Tooltip title="Video">
              <VideoFile />
            </Tooltip>
            <ListItemText style={{ marginLeft: '0.5rem' }}>Video</ListItemText>
            <input
              type="file"
              multiple
              accept="video/mp4, video/webm, video/ogg"
              style={{ display: 'none' }}
              ref={videoRef}
              onChange={(e) => fileChangeHandler(e, 'Videos')}
            />
          </MenuItem>

          <MenuItem onClick={selectAudio}>
            <Tooltip title="Audio">
              <AudioFile />
            </Tooltip>
            <ListItemText style={{ marginLeft: '0.5rem' }}>Audio</ListItemText>
            <input
              type="file"
              multiple
              accept="audio/mpeg, audio/wav"
              style={{ display: 'none' }}
              ref={audioRef}
              onChange={(e) => fileChangeHandler(e, 'Audios')}
            />
          </MenuItem>

          <MenuItem onClick={selectFile}>
            <Tooltip title="File">
              <UploadFile />
            </Tooltip>
            <ListItemText style={{ marginLeft: '0.5rem' }}>File</ListItemText>
            <input
              type="file"
              multiple
              accept="*"
              style={{ display: 'none' }}
              ref={fileRef}
              onChange={(e) => fileChangeHandler(e, 'Files')}
            />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  );
};

export default FileMenu;
