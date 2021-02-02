import { Button, Layout, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Switch, Route, useHistory } from 'react-router-dom';
import Dashboard from './Dashboard';
import Users from './Users';
import Settings from './Settings';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import createPersistedState from 'use-persisted-state';
import { get } from '../../apis';
import { Header } from 'antd/lib/layout/layout';
const { Sider, Content } = Layout;
const useTokenState = createPersistedState('token');

function Main(props) {
    const history = useHistory();
    const [token, setToken] = useTokenState(null);

    useEffect(function () {
        if (props.my === null) {
            props.getMy(history);
        }
    });

    function clickMenu(e) {
        history.push(e.key);
    }

    function dropdownOnClick({ key }) {
        switch (key) {
            case 'logout':
                setToken(null);
                history.push('/login');
                break;
            default:
                break;
        }
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
            <Layout>
                <Header style={{ backgroundColor: '#fff' }}>
                    {props.my !== null && (
                        <Dropdown
                            overlay={
                                <Menu onClick={dropdownOnClick}>
                                    <Menu.Item key="logout">登出</Menu.Item>
                                </Menu>
                            }
                        >
                            <a
                                className="ant-dropdown-link"
                                onClick={(e) => e.preventDefault()}
                            >
                                {props.my.nickname} <DownOutlined />
                            </a>
                        </Dropdown>
                    )}
                    {/* <Button type="primary" onClick={logout}>
                        // 登出 //{' '}
                    </Button> */}
                </Header>
                <Layout style={{ padding: 24 }}>
                    <Content style={{ background: 'white', padding: 24 }}>
                        <Switch>
                            <Route path="/" component={Dashboard} exact />
                            <Route path="/users" component={Users} exact />
                            <Route
                                path="/settings"
                                component={Settings}
                                exact
                            />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

function mapStateToProps(state) {
    return state;
}

const mapDispatchToProps = {
    getMy: function (history) {
        return function (dispatch) {
            get(
                'http://127.0.0.1:8000/api/my',
                {},
                function (code, msg, data) {
                    if (code === 1) {
                        dispatch({
                            type: 'SET_MY',
                            payload: data,
                        });
                    }
                },
                history
            );
        };
    },
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
