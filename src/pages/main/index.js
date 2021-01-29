import { Button, Layout, Menu } from 'antd';
import { Switch, Route, useHistory } from 'react-router-dom';
import Dashboard from './Dashboard';
import Users from './Users';
import Settings from './Settings';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const { Sider, Content } = Layout;

function Main(props) {
    const history = useHistory();

    useEffect(function () {
        console.log(props);
        if (props.token === '') {
            history.push('/login');
        }
    });

    function clickMenu(e) {
        history.push(e.key);
    }

    function logout() {
        props.setToken('');
    }

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider>
                <Menu
                    defaultSelectedKeys={[history.location.pathname]}
                    mode="inline"
                    onClick={clickMenu}
                    style={{ height: '100%' }}
                >
                    <Menu.Item key="/">概览</Menu.Item>
                    <Menu.Item key="/users">用户管理</Menu.Item>
                    <Menu.Item key="/settings">个人设置</Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ padding: 24 }}>
                <Button type="primary" onClick={logout}>
                    登出
                </Button>
                <Content style={{ background: 'white', padding: 24 }}>
                    <Switch>
                        <Route path="/" component={Dashboard} exact />
                        <Route path="/users" component={Users} exact />
                        <Route path="/settings" component={Settings} exact />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
}

function mapStateToProps(state) {
    return state;
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
