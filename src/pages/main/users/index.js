import { Table, Button, Space, Popconfirm } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import UserModal from './UserModal';
import { get, post } from '../../../apis';
import { useHistory } from 'react-router-dom';

function Users() {
    const history = useHistory();
    const [users, setUsers] = useState();
    const [id, setId] = useState();

    useEffect(() => {
        if (users === undefined) {
            getUsers();
        }
    });

    function getUsers() {
        get(
            'http://127.0.0.1:8000/api/users',
            {},
            function (code, msg, data) {
                setUsers(data);
            },
            history
        );
    }

    function deleteUser(id) {
        post(
            'http://127.0.0.1:8000/api/user/delete',
            { id },
            function (code, msg, data) {
                getUsers();
            },
            history
        );
    }

    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '昵称',
            dataIndex: 'nickname',
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
                return (
                    <Space>
                        <Button onClick={() => setId(record.id)}>编辑</Button>
                        <Popconfirm
                            title="确定删除吗?"
                            onConfirm={() => deleteUser(record.id)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button>删除</Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    return (
        <>
            <Button type="primary" onClick={() => setId(null)}>
                添加
            </Button>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={users}
                style={{ marginTop: 10 }}
            />
            {id !== undefined && (
                <UserModal id={id} getUsers={getUsers} setId={setId} />
            )}
        </>
    );
}

export default Users;
