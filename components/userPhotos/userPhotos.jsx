import React from 'react';
import './userPhotos.css';
import { Link } from "react-router-dom";
import axios from 'axios';
/**
 * Define UserPhotos, a React componment of CS142 project #5
 */

class UserPhotos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoCollection: [],
      currentUser: {},
      inputField: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var url = "/user/"+this.props.match.params.userId;

    axios.get(url)
    .then((response)=> {
      // handle success
      this.setState({
          currentUser: response.data
      });
      var temporaryName = this.state.currentUser.first_name;
      this.props.updateString("Photos of: " + temporaryName);
      console.log(response);
    }).catch((error) => {
      // handle error
      console.log(error);
    });

    var url2 = "/photosOfUser/"+this.props.match.params.userId;
    axios.get(url2)
    .then((response) => {
      // handle success
      this.setState({
          photoCollection: response.data
      });
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
        var temporaryName = this.state.currentUser.first_name;
        this.props.updateString("Photos of: " + temporaryName);
        console.log(response);
      }).catch(function (error) {
        // handle error
        console.log(error);
      });

      var url2 = "/photosOfUser/"+this.props.match.params.userId;
      axios.get(url2)
      .then((response) => {
        // handle success
        this.setState({
          photoCollection: response.data
        });
        console.log(response);
      }).catch((error) => {
        // handle error
        console.log(error);
      });
      var photoTitleString = "Photos of: " + this.state.currentUser.first_name;
      console.log(photoTitleString);
      this.props.updateString(photoTitleString);
    }
  }

  commentRendering(photoModelObject) {
    var array;
    if (photoModelObject.comments !== undefined){
      array =photoModelObject.comments.map(commentary =>
      <div key = {commentary._id} className = "photoItems">
      <span className = "box">
        <Link to={"/users/"+commentary.user._id}> {commentary.user.first_name+" "+commentary.user.last_name+": "}</Link>
        {commentary.comment+" "}
      </span>
      <div className = "dateTime"> {"Commented on: "+commentary.date_time} </div>
      </div>)
    }
    return array;
  }

  handleChange = (event) => {
    this.setState({
      inputField: event.target.value
    });
  }

  handleSubmit= (event) => {
    event.preventDefault();
    var url = "/commentsOfPhoto/"+event.target.name;

    axios.post(url,{
      comment: this.state.inputField
    })
      .then((response) => {
        console.log(response);
        var url2 = "/photosOfUser/"+this.props.match.params.userId;
        axios.get(url2)
          .then((response) => {
            this.setState({
              photoCollection: response.data
            });
          })
          .catch((error) => {
            console.log(error);
          })
      })
      .catch((error) => {
        console.log(error);
    });

  }

  render() {

    var photos = this.state.photoCollection;

    return (
      <div className = "left-align col s7" id = "photoWrapper">
        {
          photos.map(photoModel =>
            <div key = {photoModel._id} className = "photoItems">
              <img src= {"/images/"+photoModel.file_name} className = "photo"/>
              <div className = "photoDate"> {"Posted on: "+photoModel.date_time} </div>

              <form onSubmit={this.handleSubmit} name = {photoModel._id}>
                <label>
                  Share your thoughts! <input type="text" name="commentBox" value = {this.state.value} onChange = {this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
              </form>

              <div>
                {this.commentRendering(photoModel)}
              </div>
            </div>
        )}
      </div>
    );
  }
}

export default UserPhotos;
