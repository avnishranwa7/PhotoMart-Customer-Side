import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MediaCard from './pages/Card/Card';
import About from './pages/About/About';
import Photog_login from './pages/Login/Login'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path='/' component={MediaCard}/>
        <Route path='/about:data?' component={About}/>
        <Route path='/login' component={Photog_login} />
        <Redirect to="/"/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
