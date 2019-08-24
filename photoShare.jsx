import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch
} from 'react-router-dom';
import { Redirect } from 'react-router';

// import necessary components
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/UserDetail';
import UserList from './components/userList/UserList';
import UserPhotos from './components/userPhotos/UserPhotos';
import LoginRegister from './components/loginregister/LoginRegister';

import './node_modules/materialize-css/dist/css/materialize.css';
import './styles/main.css';

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text : "Please Login",
      isLoggedIn: false,
      //you'd want to set the user from the idea
      loggedInUser: {} //need first name and last name
     }

    this.updateString = this.updateString.bind(this);
    this.checkLogIn = this.checkLogIn.bind(this);

  }

  updateString(newString) {
    this.setState({
      text: newString
    });
  }

  checkLogIn = (checkForLogIn, userLoggedIn) => {
    this.setState({
      isLoggedIn: checkForLogIn,
      loggedInUser: userLoggedIn
    });
  }

  render() {
    return (
      <HashRouter>
      <div>
        <TopBar isLoggedIn={this.state.isLoggedIn} loggedInUser = {this.state.loggedInUser} checkLogIn = {this.checkLogIn}/>
          {this.state.isLoggedIn ?
            <div className="row">
              <UserList />
              <div className="center-align">
                <Switch>
                  <Route path="/user/:userId"
                    render={ props => <UserDetail {...props} loggedInUser = {this.state.loggedInUser} updateString= {this.updateString}/> }
                   />
                  <Route path="/photos/:userId"
                    render ={ props => <UserPhotos {...props} updateString= {this.updateString} /> }
                  />
                  <Route path="/users" component={UserList}  />
                </Switch>
              </div>
            </div>
            :
            <Redirect to= "/login-register"/>
          }
      <Route path="/login-register"
        render  ={props => <LoginRegister {...props} checkLogIn={this.checkLogIn}/>}
        />


      </div>
    </HashRouter>
    );
  }
}


ReactDOM.render(
  <PhotoShare />,
  document.getElementById('photoshareapp'),
);
