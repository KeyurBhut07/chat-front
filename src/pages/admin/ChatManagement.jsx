import { Avatar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { dasboardData } from '../../components/constants/sampleData';
import AdminLayout from '../../components/layout/AdminLayout';
import { transformImage } from '../../components/lib/features';
import AvtarCard from '../../components/shared/AvtarCard';
import Tabel from '../../components/shared/Tabel';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 200,
    headerClassName: 'table-header',
  },
  {
    field: 'avatar',
    headerName: 'Avatar',
    width: 150,
    headerClassName: 'table-header',
    renderCell: (params) => <AvtarCard avatar={params.row.avatar} />,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 300,
    headerClassName: 'table-header',
  },
  {
    field: 'totalMembers',
    headerName: 'Total Member',
    width: 120,
    headerClassName: 'table-header',
  },
  {
    field: 'members',
    headerName: 'Members',
    width: 150,
    headerClassName: 'table-header',
    renderCell: (params) => <AvtarCard mx={100} avatar={params.row.members} />,
  },
  {
    field: 'totalMessages',
    headerName: 'Total Messages',
    headerClassName: 'table-header',
    width: 120,
  },
  {
    field: 'creator',
    headerName: 'Created By',
    headerClassName: 'table-header',
    width: 250,
    renderCell: (params) => (
      <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];

const ChatManagement = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      dasboardData.chats.map((i) => ({
        ...i,
        id: i._id,
        avatar: i.avatar.map((i) => transformImage(i, 50)),
        members: i.members.map((i) => transformImage(i.avatar, 50)),
      }))
    );
  }, []);
  return (
    <AdminLayout>
      <Tabel heading={'All Chats'} columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default ChatManagement;
