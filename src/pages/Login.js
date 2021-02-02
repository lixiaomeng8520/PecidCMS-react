import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { post } from '../apis';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import createPersistedState from 'use-persisted-state';
const { Title } = Typography;
const useTokenState = createPersistedState('token');

function Login() {
    const history = useHistory();
    const [, setToken] = useTokenState();

    function onFinish(values) {
        post(
            'http://127.0.0.1:8000/api/login',
            values,
            function (code, msg, data) {
                if (code === 1) {
                    setToken(data.token);
                    history.push('/');
                }
            },
            history
        );
    }

    return (
        <div style={{ width: '300px', margin: '250px auto' }}>
            <Title level={2} style={{ textAlign: 'center' }}>
                PecidCMS
            </Title>
            <Form
                name="normal_login"
                onFinish={onFinish}
                onFinishFailed={() => {
                    console.log('onFinishFailed');
                }}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名',
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="用户名"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '密码',
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="请输入密码"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
