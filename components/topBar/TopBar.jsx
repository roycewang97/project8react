import React from 'react';
import axios from 'axios';
import './TopBar.css';

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.handleUploadButtonClicked = this.handleUploadButtonClicked.bind(this);
  }

  handleLogout = () => {
    var url = "/admin/logout";
    axios.post(url, {}) //pass in url and your payload object
    .then((response) => {
      console.log('This is what:', response);
      this.props.checkLogIn(false, {});
    })
    .catch((error) => { //set the error
      console.log('returned error: ', error);
    })
  }

  //this function is called when user presses the update button
  handleUploadButtonClicked = (event) => {
     event.preventDefault();
     if (this.uploadInput.files.length > 0) {
      // Create a DOM form and add the file to it under the name uploadedphoto
      const domForm = new FormData();
      domForm.append('uploadedphoto', this.uploadInput.files[0]);
      axios.post('/photos/new', domForm)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(`POST ERR: ${err}`)
        });
    }
  }

// {!this.props.isLoggedIn ?
//   <div id = "message"> Please Log In </div>
// :
// <span>
//     <span id = "inputContent">
//       <input type="file" accept="image/*" ref={(domFileRef) => { this.uploadInput = domFileRef; }} />
//       <button onClick = {this.handleUploadButtonClicked} > Upload Photo </button>
//     </span>
//       <div className = "topBar Content" id = "right"> {this.props.loggedInUser.first_name} </div>
//       <button id = "logOutButton" onClick = {this.handleLogout} className = "topBar Content"> Log Out! </button>
// </span>
// }

  render() {
    var welcome = "Hi! "+ this.props.loggedInUser.first_name;
    return (
      <nav>
        <div className = "topBarWrapper">
          <span className = "horizon">
            <span className = "personalName"> Royce Wang </span>
            <span id ="center"> FBOOk </span>
            {!this.props.isLoggedIn ?
              <div id = "message"> Please Log In </div>
              :
              <span>
                  <span>
                    <input type="file" accept="image/*" ref={(domFileRef) => { this.uploadInput = domFileRef; }} />
                    <button onClick = {this.handleUploadButtonClicked} > Upload Photo </button>
                  </span>
                    <span id ="sized"> {welcome} </span>
                    <button onClick = {this.handleLogout}> Log Out! </button>
              </span>
            }
          </span>
        </div>
      </nav>
    );
  }
}

export default TopBar;
