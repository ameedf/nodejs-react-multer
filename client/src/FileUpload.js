import React, { Component } from 'react';
import axios from 'axios';

class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      userName: '',
      imageUrl: null,
    }
  }
  async formSubmitted(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imageFile', this.state.file);
    formData.append('userName', this.state.userName);
    console.log(formData);
    try {
      // npm i axios
      const response = await axios.post('/persons', formData);
      console.log(response);
      this.setState({ imageUrl: response.data.imageFileName });
    } catch (err) {
      console.log(err);
    }
  }
  fileChosen(e) {
    const file = e.target.files[0];
    console.log(file);
    this.setState({ file });
  }
  userNameChaned(e) {
    this.setState({ userName: e.target.value });
  }
  render() {
    return (
      <div>
        <form onSubmit={(e) => this.formSubmitted(e)}>
          <input type="file" onChange={(e) => this.fileChosen(e)} />
          <br />
          user name: <input type="text" onChange={e => this.userNameChaned(e)} />
          <br />
          <input type="submit" value="Send" />
        </form>
        {this.state.imageUrl &&
          < img src={this.state.imageUrl} alt="abc" width="200" height="200"/>
        }
      </div>);
  }
}

export default FileUpload;