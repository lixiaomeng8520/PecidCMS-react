import { Modal, Form, Input, Radio } from 'antd';
import { useEffect } from 'react';
import { get, post } from '../../../apis';
import { useHistory } from 'react-router-dom';

function UserModal({ id, getUsers, setId }) {
    const history = useHistory();
    const [form] = Form.useForm();

    useEffect(() => {
        if (id !== null) {
            getUser();
        }
    });

    function getUser() {
        get(
            'http://127.0.0.1:8000/api/user/' + id,
            {},
            function (code, msg, data) {
                form.setFieldsValue(data);
            },
            history
        );
    }

    function submit() {
        const values = form.getFieldsValue();

        let url = '';
        if (id === null) {
            url = 'http://127.0.0.1:8000/api/user/add';
        } else {
            url = 'http://127.0.0.1:8000/api/user/edit';
            values.id = id;
        }

        post(
            url,
            values,
            function (code, msg, data) {
                if (code === 1) {
                    setId(undefined);
                    getUsers();
                }
            },
            history
        );
    }

    return (
        <Modal
            visible={true}
            title="用户表单"
            okText="确定"
            cancelText="取消"
            onOk={submit}
            onCancel={() => setId(undefined)}
        >
            <Form
                form={form}
                initialValues={{
                    username: '',
                    password: '',
                    nickname: '',
                    sex: 0,
                    desc: '',
                }}
            >
                <Form.Item label="用户名" name="username">
                    <Input />
                </Form.Item>
                <Form.Item label="密码" name="password">
                    <Input />
                </Form.Item>
                <Form.Item label="昵称" name="nickname">
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
