import React, { Component } from "react";
import "./SignIn.Component.css";
import "../Images/Wallpaper.jpg"
import axios from "axios";
var http = require("http");
http.post = require("http-post");

class SignInComponent extends Component {
  login = "http://8215d76c.ngrok.io/ownerlogin";
  signInObject = {};
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passWord: "",
      responseObject: ""
    };

    this.signIn = this.signIn.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  async signIn(e) {
    e.preventDefault();
    var loader = document.getElementById("loader");
    loader.className = "fullScreen";
    loader.firstChild.style.display = "inline-block";

    await axios
      .post(
        this.login,
        {
          userid: this.state.email,
          password: this.state.passWord
        },
      )
      .then(resp => {

        localStorage.setItem("LoginData", JSON.stringify(resp.data));
        if (resp.data.email) {
          this.props.history.push("/restaurantDetails/");
        }
      })
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    return (
      <div>
        <div id="loader">
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Sign In</h5>
                  <form className="form-signin">
                    <div className="form-label-group">
                      <input
                        type="email"
                        id="email"
                        className="form-control text-center"
                        placeholder="User Id"
                        onChange={this.onChange}
                        required
                      />
                      <label htmlFor="email">User Id</label>
                    </div>
                    <div className="form-label-group">
                      <input
                        type="password"
                        id="passWord"
                        className="form-control text-center"
                        placeholder="Password"
                        onChange={this.onChange}
                        required
                      />
                      <label htmlFor="passWord">Password</label>
                    </div>
                    <button
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                      onClick={this.signIn}
                    >
                      Sign in
                  </button>
                    <hr className="my-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInComponent;
