import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { post } from '../apis';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Login(props) {
    const history = useHistory();

    function onFinish(values) {
        post('http://127.0.0.1:8000/api/login', values, function (data) {
            if (data.code === 1) {
                props.setToken(data.data.token);
                history.push('/');
            }
        });
    }

    return (
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
                    prefix={<UserOutlined className="site-form-item-icon" />}
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
                    prefix={<LockOutlined className="site-form-item-icon" />}
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
    );
}

function mapDispatchToProps(dispatch) {
    return {
        setToken: function (token) {
            dispatch({
                type: 'SET_TOKEN',
                payload: token,
            });
        },
    };
}

export default connect(null, mapDispatchToProps)(Login);
