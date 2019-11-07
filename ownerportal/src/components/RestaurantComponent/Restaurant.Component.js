import React, { Component } from 'react';
import './Restaurant.Component.css';
import axios from 'axios'
const amenities = [
  { "name": "Live-Music", "value": false },
  { "name": "Roof-Top", "value": false },
  { "name": "Free-Wifi", "value": false },
]

class StudentDetails extends Component {
  postrestaurantdetails = "http://8215d76c.ngrok.io/postresturantdetails";
  temp;
  subjects;
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      rname: "",
      pincode: "",
      totaltables: "",
      amenity1: "",
      amenity2: "",
      amenity3: "",
      amenity4: ""
    };

    this.postdata = this.postdata.bind(this);
    this.onChange = this.onChange.bind(this);
    this.init = this.init.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  async postdata(e) {
    console.log(this.state);
    e.preventDefault();
    await axios
      .post(
        this.postrestaurantdetails,
        {
          userid: this.state.userDetailsObject.user_id,
          address: this.state.address,
          restaurantname: this.state.rname,
          pinCode: this.state.pincode,
          totaltables: this.state.totaltables,
          amenities: this.state.amenity1 + ' ' + this.state.amenity2 + ' ' + this.state.amenity3 + ' ' + this.state.amenity4
        },
      )
      .then(resp => {

        localStorage.setItem("RestaurantData", JSON.stringify(resp.data));

        this.props.history.push("/AddItemComponent/");

      })
  }

  componentDidMount() {
    this.init();
  }

  navigate(buttonClicked) {
    if (buttonClicked == "statusCheck") {
      this.props.history.push("/checkStatus/");
      return;
    }
    else if (buttonClicked == "new") {
      this.props.history.push("/dashboard/");
    } else {
      this.props.history.push("/dashboard/");
    }

  }

  init() {
    var data = JSON.parse(localStorage.getItem("LoginData"));
    this.setState({ userDetailsObject: data });
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }


  render() {
    return (
      <div class="container">
        <form className="form-restaurantadd">
          <br></br>
          <div className="form-label-group">
            <input
              type="text"
              id="rname"
              className="form-control text-center"
              placeholder="Restaurant name"
              onChange={this.onChange}
              required
            />
            <label htmlFor="rname">Restaurant Name</label>
          </div>
          <div className="form-label-group">
            <input
              type="text"
              id="address"
              className="form-control text-center"
              placeholder="Address"
              onChange={this.onChange}
              required
            />
            <label htmlFor="address">Address</label>
          </div>
          <div className="form-label-group">
            <input
              type="text"
              id="pincode"
              className="form-control text-center"
              placeholder="Pincode"
              onChange={this.onChange}
              required
            />
            <label htmlFor="pincode">Pincode</label>
          </div>
          <div className="form-label-group">
            <input
              type="text"
              id="totaltables"
              className="form-control text-center"
              placeholder="Total Tables"
              onChange={this.onChange}
              required
            />
            <label htmlFor="totaltables">Total Tables</label>
          </div>
          <div className="form-label-group-checks">Amenities
             <br></br>
            <label for="amenity1"  >
              <input
                type="checkbox"
                id="amenity1"
                value="Live-Music"
                className="check form-label-group"
                onChange={this.onChange}
              ></input>Live-Music</label>

            <label htmlFor="amenity2">
              <input
                type="checkbox"
                id="amenity2"
                value="Roof-Top"
                className="check form-label-group"
                onChange={this.onChange}
              ></input>Roof-Top</label>

            <label htmlFor="amenity3">
              <input
                type="checkbox"
                id="amenity3"
                value="Free-Wifi"
                className="check form-label-group"
                onChange={this.onChange}
              ></input>Free-Wifi</label>

            <label htmlFor="amenity4">
              <input
                type="checkbox"
                id="amenity4"
                value="Smoking-Area"
                className="check form-label-group"
                onChange={this.onChange}
              ></input>Smoking-Area</label>
          </div>
          <br></br>

          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={this.postdata}
          >
            Submit
                  </button>

        </form>
      </div>

    );
  }
}

export default StudentDetails;