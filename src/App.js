import Main from './pages/Main';
import Login from './pages/Login';
import { Switch, Route } from 'react-router-dom';

function App() {
    return (
        <Switch>
            <Route path="/login" component={Login} exact></Route>
            <Route path="/" component={Main}></Route>
        </Switch>
    );
}

export default App;
