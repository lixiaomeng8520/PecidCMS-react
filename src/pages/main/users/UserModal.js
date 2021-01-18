import { Modal, Form, Input, Radio } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

function UserModal({ id, getUsers, setId }) {
    const [form] = Form.useForm();

    useEffect(() => {
        getUser();
    });

    function getUser() {
        axios.get('http://127.0.0.1:8000/user/' + id).then(function (response) {
            form.setFieldsValue(response.data);
        });
    }

    function submit() {
        const values = form.getFieldsValue();
        axios
            .post('http://127.0.0.1:8000/user/' + id, values)
            .then(function (response) {
                console.log(response);
                getUsers();
                setId(undefined);
            });
    }

    return (
        <Modal
            visible={true}
            title="编辑用户"
            okText="确定"
            cancelText="取消"
            onOk={submit}
        >
            <Form form={form}>
                <Form.Item label="姓名" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="性别" name="sex">
                    <Radio.Group>
                        <Radio value={0}>男</Radio>
                        <Radio value={1}>女</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="描述" name="desc">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default UserModal;
