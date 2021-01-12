import { Layout, Menu } from 'antd';
import { Switch, Route, useHistory } from 'react-router-dom';
import Dashboard from './dashboard';
import Users from './users';
import Settings from './settings';

const { Sider, Content } = Layout;

function Main() {
    const history = useHistory();
    function clickMenu(e) {
        console.log(e, history);
        history.push(e.key);
    }

    return (
        <Layout>
            <Sider>
                <Menu
                    defaultSelectedKeys={[history.location.pathname]}
                    mode="inline"
                    onClick={clickMenu}
                >
                    <Menu.Item key="/dashboard">概览</Menu.Item>
                    <Menu.Item key="/users">用户管理</Menu.Item>
                    <Menu.Item key="/settings">个人设置</Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content>
                    <Switch>
                        <Route path="/" component={Dashboard} exact />
                        <Route path="/dashboard" component={Dashboard} exact />
                        <Route path="/users" component={Users} exact />
                        <Route path="/settings" component={Settings} exact />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Main;
