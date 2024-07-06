import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Tabel from '../../components/shared/Tabel';
import { Avatar } from '@mui/material';
import { dasboardData } from '../../components/constants/sampleData';
import { transformImage } from '../../components/lib/features';


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
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    headerClassName: 'table-header',
  },
  {
    field: 'username',
    headerName: 'Username',
    width: 200,
    headerClassName: 'table-header',
  },
  {
    field: 'friends',
    headerName: 'Friends',
    width: 150,
    headerClassName: 'table-header',
  },
  {
    field: 'groups',
    headerName: 'Groups',
    headerClassName: 'table-header',
    width: 200,
  },
];

const UserManagement = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(dasboardData.users.map((i) => ({ ...i, id: i._id, avatar : transformImage(i.avatar) })));
  }, []);
  return (
    <AdminLayout>
      <Tabel heading={'All Users'} columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default UserManagement;
