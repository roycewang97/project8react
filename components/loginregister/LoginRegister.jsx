import React from 'react';
import axios from 'axios';


class LoginRegister extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      usernameError: "",
      passwordError: "",
      register: false,

      first_name: '', // First name of the user.
      last_name: '',  // Last name of the user.
      location: '',    // Location  of the user.
      description: '',  // A brief user description
      occupation: '', // Occupation of the user.
      login_name: '', //login name
      passwordSignUp: '', //sign up password
      passwordCheck: '', //password Confirm

      signUppasswordError: '',
      showUpCompn: false
    }

    this.setBoxValue1 = this.setBoxValue1.bind(this);
    this.setBoxValue2 = this.setBoxValue2.bind(this);

    this.auth = this.auth.bind(this);
    this.setUniversalBoxValue = this.setUniversalBoxValue.bind(this);
  }

  setBoxValue1 = (event) => {
    this.setState({
      username: event.target.value
    });
  }
  setBoxValue2 = (event) => {
    this.setState({
      password: event.target.value
    });
  }
  setUniversalBoxValue = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  auth  = (event) => {
    //insert axios post method here
    event.preventDefault();
    var url = "/admin/login";
    //access axios post method here because only send to the browser if the button was clicked
    axios.post(url, {
      login_name: this.state.username,
      password: this.state.password
    })
    .then((response) => {
      this.props.checkLogIn(true, response.data);//this is the problem
      this.props.history.push('/user/'+response.data._id);
      this.setState({
        usernameError: ""
      });
    })
    .catch((error) => {
      this.setState({
        usernameError: error.response.data
      })
      console.log(error.response.data);//this is where the browser console logs the error
    });
  }
    reg = (event) => {
      event.preventDefault();
      this.setState({
        register: true,
      });
      var url = "/user";
        axios.post(url, {
          first_name: this.state.first_name, // First name of the user.
          last_name: this.state.last_name,  // Last name of the user.
          location: this.state.location,    // Location  of the user.
          description: this.state.description,  // A brief user description
          occupation: this.state.occupation, // Occupation of the user.
          login_name: this.state.login_name,
          password: this.state.passwordSignUp
        })
        .then((response)=> {
          console.log(response);
          console.log("User Created");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    showUp = () => {
      this.setState({
        showUpCompn: true
      });
    }
  render() {
    return(
      <div>
        <input name = "username" type = "text" placeholder = "Username..." value = {this.state.username} onChange = {this.setBoxValue1}/>
        <p> {this.state.usernameError} </p>
        <input name = "password" type = "password" placeholder = "Password..." value = {this.state.password} onChange = {this.setBoxValue2}/>
        <p> {this.state.passwordError} </p>
        <button onClick = {this.auth}> Submit! </button>
        <p> No account? No Problem! </p>
        <button onClick = {this.showUp}> Register Me! </button>
          {
            this.state.showUpCompn ?
            <div>
              <div> First Name: <input type = "text" name = "first_name" value = {this.first_name} onChange = {this.setUniversalBoxValue}/>  </div>
              <div> Last Name:  <input  type = "text" name = "last_name" value = {this.last_name} onChange = {this.setUniversalBoxValue}/>  </div>
              <div> Location:  <input  type = "text" name = "location" value = {this.location} onChange = {this.setUniversalBoxValue}/>   </div>
              <div> Description: <input type = "text" name = "description" value = {this.description} onChange = {this.setUniversalBoxValue}/> </div>
              <div> Occupation:  <input type = "text" name = "occupation" value = {this.occupation} onChange = {this.setUniversalBoxValue}/> </div>
              <div> Login Username:  <input type = "text" name = "login_name" value = {this.login_name} onChange = {this.setUniversalBoxValue}/>   </div>
              <div> Password:  <input type = "password" name = "passwordSignUp" value = {this.passwordSignUp} onChange = {this.setUniversalBoxValue}/>   </div>
              <div> Confirm Password:  <input type = "password" name = "passwordCheck" value = {this.passwordCheck} onChange = {this.setUniversalBoxValue}/>   </div>
              {
                (this.state.passwordCheck === this.state.passwordSignUp) ?
                <div>
                  <p> {"Don't tell anyone your password. Keep it safe!"}</p>
                  <button onClick = {this.reg}> Sign Up! </button>
                </div>
                :
                <p> {"Passwords do not match. Try again"} </p>
              }

            </div>
            :
            <div>
            </div>
          }
      </div>
    );
  }

}

export default LoginRegister;
