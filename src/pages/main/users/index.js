import { Table, Button } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import UserModal from './UserModal';

function Users() {
    const [users, setUsers] = useState();
    const [id, setId] = useState();

    useEffect(() => {
        if (users === undefined) {
            getUsers();
        }
    });

    function getUsers() {
        axios.get('http://127.0.0.1:8000/users').then(function (response) {
            setUsers(response.data);
        });
    }

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '性别',
            dataIndex: 'sex',
        },
        {
            title: '描述',
            dataIndex: 'desc',
        },
        {
            title: '操作',
            render: (text, record) => {
                return <Button onClick={() => setId(record.id)}>编辑</Button>;
            },
        },
    ];

    return (
        <>
            <Table rowKey="id" columns={columns} dataSource={users} />
            {id !== undefined && (
                <UserModal id={id} getUsers={getUsers} setId={setId} />
            )}
        </>
    );
}

export default Users;
