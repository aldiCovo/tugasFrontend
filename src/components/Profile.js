import React, { Component } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
import axios from "../config/axios";
import { onEdit, logout } from "../actions/index";

const cookie = new cookies();

class Profile extends Component {
  state = {
    edit: true
  };
  fileUpload = async () => {
    const formData = new FormData(); // FormData() adalah fn untuk ??
    var imagefile = this.gambar; // mengambil gambar dari inputan dan disimpan pada imagefile

    formData.append("avatar", imagefile.files[0]); // kalo gambarnya hanya satu, kalau gambarnya banyak maka ga pake index
    try {
      // await axios.post(`/users/${userid}/avatar`, formData, {
      await axios.post(`/users/${cookie.get("idLogin")}/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/from-data"
        }
      });
      console.log("berhasil upload file");
    } catch (e) {
      console.log("gagal upload file");
    }
  };

  deleteAvatar = async userId => {
    try {
      axios.patch(`/users/avatar/${userId}`, {
        avatar: null
      });
    } catch (e) {
      console.log(e);
    }
  };

  // deleteAvatar = async () => {
  //   try {
  //     await axios.delete('/users/avatar', {data:{id: this.props.id}})
  //     this.setStateIndex()
  //   } catch (e) {
  //     console.log("error from filedelete: " + e)
  //   }
  // }

  deleteProfile = async userId => {
    try {
      await axios.delete(`/users/${userId}/delete`);
      this.props.logout();
      // return <Redirect to="register" />;
    } catch (e) {
      console.log(e);
    }
  };

  saveProfile = async userId => {
    const name = this.name.value;
    const age = this.age.value;
    this.props.onEdit(name, age, userId);
    this.setState({ edit: !this.state.edit });
  };

  dataUser = () => {
    const { name, age, email, id } = this.props.user;
    if (this.state.edit) {
      return (
        <div>
          <li class="list-group-item pl-0">{`Name: ${name}`}</li>
          <li class="list-group-item pl-0">{`Age: ${age}`}</li>
          <li class="list-group-item pl-0">{`Email: ${email}`}</li>
          <li class="list-group-item px-0">
            <div class="d-flex ">
              <Button
                onClick={() => {
                  this.setState({ edit: !this.state.edit });
                }}
                color="primary"
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  this.deleteProfile(this.props.user.id);
                }}
                color="danger"
              >
                Delete Profile
              </Button>
            </div>
          </li>
        </div>
      );
    }
    return (
      <div>
        <li class="list-group-item pl-0">
          <input
            type="text"
            class="form-control"
            ref={input => {
              this.name = input;
            }}
            defaultValue={name}
          />
        </li>
        <li class="list-group-item pl-0">
          <input
            type="number"
            class="form-control"
            ref={input => {
              this.age = input;
            }}
            defaultValue={age}
          />
        </li>
        <li class="list-group-item px-0">
          <div class="d-flex justify-content-center">
            <Button
              onClick={() => {
                this.saveProfile(id);
              }}
              color="outline-primary"
            >
              save
            </Button>
          </div>
        </li>
      </div>
    );
  };

  render() {
    if (cookie.get("idLogin")) {
      return (
        <div className="container">
          <div class="card w-25">
            <img
              src={`http://localhost:2009/users/${cookie.get(
                "idLogin"
              )}/avatar`}
              class="card-img-top"
              alt="..."
            />

            <div class="card-body">
              <div className="custom-file">
                <input
                  type="file"
                  id="myfile"
                  ref={input => (this.gambar = input)}
                />
              </div>
              <div class="d-flex ">
                <Button color="primary" onClick={() => this.fileUpload()}>
                  Upload
                </Button>
                <Button
                  color="danger"
                  onClick={() => {
                    this.deleteAvatar(this.props.user.id);
                    //this.deleteAvatar();
                  }}
                >
                  Delete FP
                </Button>
              </div>

              <ul class="list-group list-group-flush mt-3">
                {this.dataUser()}
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return <Redirect to="register" />;
  }
}

// const mps = state => {
//   return { id: state.auth.id };
// };

const mps = state => {
  return {
    // userId: state.auth.id,
    // name: state.auth.name
    user: state.auth
  };
};

export default connect(
  mps,
  { onEdit, logout }
)(Profile);
