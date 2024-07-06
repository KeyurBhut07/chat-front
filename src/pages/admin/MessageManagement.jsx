import { Avatar, Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Tabel from '../../components/shared/Tabel';
import { fileFormat, transformImage } from '../../components/lib/features';
import { dasboardData } from '../../components/constants/sampleData';
import moment from 'moment';
import RenderAttachments from "../../components/shared/RenderAttachments"

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 200,
    headerClassName: 'table-header',
  },
  {
    field: 'attachments',
    headerName: 'Attachments',
    width: 200,
    headerClassName: 'table-header',
    renderCell: (params) => {
      const {attachments} = params.row
      return attachments.length > 0 ?  attachments.map((i)=>{
        const url = i.url
        const file = fileFormat(url)


        return <Box>
          <a href={url} download target='_blank' style={{color : "black"}}>
            {RenderAttachments(file,url)}
          </a>
        </Box>
      })  : "No Attchments"
    },
  },
  {
    field: 'content',
    headerName: 'Content',
    width: 400,
    headerClassName: 'table-header',
  },
  {
    field: 'sender',
    headerName: 'Send By',
    width: 200,
    headerClassName: 'table-header',
    renderCell: (params) => (
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: 'chat',
    headerName: 'Chat',
    width: 220,
    headerClassName: 'table-header',
  },
  {
    field: 'groupChat',
    headerName: 'Group Chat',
    headerClassName: 'table-header',
    width: 100,
  },
  {
    field: 'createdAt',
    headerName: 'Time',
    headerClassName: 'table-header',
    width: 250,
  },
];

const MessageManagement = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      dasboardData.messages.map((i) => ({
        ...i,
        id: i._id,
        sender: {
          name: i.sender.name,
          avatar: transformImage(i.sender.avatar, 50),
        },
        createdAt : moment(i.createdAt).format("MMMM Do YYYY , hh:mm:ss a")
      }))
    );
  }, []);
  return (
    <AdminLayout>
      <Tabel heading={'All Messages'} rows={rows} columns={columns} rowHeight={150} />
    </AdminLayout>
  );
};

export default MessageManagement;
