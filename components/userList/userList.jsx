import React from 'react';
import './userList.css';
import { Link } from "react-router-dom";
import axios from 'axios';
/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfUsers : []
    };
  }

  componentDidMount() {
    var url = "/user/list";
    axios.get(url)
    .then((response) => {
      // handle success
      console.log(response);
      this.setState({
          listOfUsers: response.data//why is this undefined?
      });
      console.log(response);
  }).catch((error) => {
    // handle error
    console.log(error);
  });
  }

  render() {
    const userListing = this.state.listOfUsers.map( (eachUser) => <li key = {eachUser._id} className="collection-item"> <Link to={"/user/"+eachUser._id}>{eachUser.first_name} {eachUser.last_name}</Link> </li>);
    return (
      <div className="userlist collection col s4 z-depth-2" id = "list">
        <ul>
          {userListing}
        </ul>
      </div>
    );
  }
}

export default UserList;
