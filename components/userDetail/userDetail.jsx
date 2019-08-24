import React from 'react';
import './userDetail.css';
import { Link } from "react-router-dom";
import axios from 'axios';

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.loggedInUser
    }
  }

  componentDidMount(){
    var url = "/user/"+this.props.match.params.userId;
    axios.get(url)
  .then((response) => {
    // handle success
    this.setState({
        currentUser: response.data
      });
      this.props.updateString(this.state.currentUser.first_name); //passes back to parent
    console.log(response);
  }).catch((error) => {
    // handle error
    console.log(error);
  });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.userId !== this.props.match.params.userId){
      var url = "/user/"+this.props.match.params.userId;
      axios.get(url)
    .then((response) => {
      // handle success
      this.setState({
          currentUser: response.data
        });
        this.props.updateString(this.state.currentUser.first_name);
      console.log(response);
    }).catch((error) => {
      // handle error
      console.log(error);
    });
    }
  }

  render() {
  var user = this.state.currentUser;
    return (
      <div className="left-align col s7" id = "detailWrapper">
        <ul id = "listWrapper">

          <p className = "name"> {this.state.currentUser.first_name + " "+this.state.currentUser.last_name} </p>
          <div> {"ID: "+user._id} </div>
          <div> {"First Name: "+user.first_name} </div>
          <div> {"Last Name: "+user.last_name} </div>
          <div> {"Occupation: "+user.occupation} </div>
          <div> {"Location: "+user.location} </div>
          <div> {"Description: "+user.description} </div>
        </ul>
        <button>  <Link to={"/photos/"+this.state.currentUser._id}> My Photos </Link> </button>
      </div>
    );
  }
}

export default UserDetail;
