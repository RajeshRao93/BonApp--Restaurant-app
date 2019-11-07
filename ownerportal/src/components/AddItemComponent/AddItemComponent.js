import React, { Component } from 'react';
import './AddItemComponent.css';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
const cuisines =
    [
        { cuisineid: 1, cuisinename: 'Indian' },
        { cuisineid: 2, cuisinename: 'Mexican' },
        { cuisineid: 3, cuisinename: 'Italian' },
        { cuisineid: 4, cuisinename: 'Punjabi' },
        { cuisineid: 5, cuisinename: 'Continental' },
        { cuisineid: 6, cuisinename: 'Chinese' },
        { cuisineid: 7, cuisinename: 'Mughlai' },
        { cuisineid: 8, cuisinename: 'Asian' },
        { cuisineid: 9, cuisinename: 'Thai' },
        { cuisineid: 10, cuisinename: 'Mediterranean' }

    ];
class AddItem extends Component {
    postmenudetails = "http://8215d76c.ngrok.io/postmenudetails";
    temp;
    subjects;
    constructor(props) {
        super(props);
        this.state = {
            restaurantid: "",
            cuisineid: "",
            itemname: "",
            price: "",
            itemdescription: "",
            availability: "",
            responseObject: ""
        };
        this.postdata = this.postdata.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async postdata(e) {
        console.log(this.state);
        e.preventDefault();
        await axios
            .post(
                this.postmenudetails,
                {
                    restaurantid: this.state.userDetailsObject.restaurant_id,
                    cuisineid: this.state.cuisineid,
                    itemname: this.state.itemname,
                    price: this.state.price,
                    itemdescription: this.state.itemdescription,
                    availability: "1"

                },
            )
            .then(resp => {
                window.location.reload();
            })
    }

    componentDidMount() {
    }

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        var data = JSON.parse(localStorage.getItem("RestaurantData"));
        this.state.userDetailsObject = data[0];
        console.log(this.state.userDetailsObject.restaurant_id);

        return (
            <div class="container">
                <form className="form-menuadd">
                    <br></br>
                    <div className="form-label-group" >
                        <input
                            type="text"
                            id="itemname"
                            className="form-control text-center"
                            placeholder="Item Name"
                            onChange={this.onChange}
                            required
                        />
                        <label htmlFor="itemname">Item Name</label>
                    </div>
                    <div className="form-label-group">
                        <input
                            type="text"
                            id="itemdescription"
                            className="form-control text-center"
                            placeholder="Item Description"
                            onChange={this.onChange}
                            required
                        />
                        <label htmlFor="itemdescription">Item Description</label>
                    </div>
                    <div className="form-label-group" >
                        <input
                            type="text"
                            id="price"
                            className="form-control text-center"
                            placeholder="Price"
                            onChange={this.onChange}
                            required
                        />
                        <label htmlFor="price">Price</label>
                    </div>
                    <div className="drop" >
                        <select text-align="center" border-radius="4px" id="cuisineid" onChange={this.onChange} className="drop form-control text-center">

                            <option className="drop" >Select Cuisine Type</option>
                            {
                                cuisines.map((h, i) =>
                                    (<option key={i} value={h.cuisineid}>{h.cuisinename}</option>))
                            }
                        </select>

                    </div>
                    <br></br>
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                        onClick={this.postdata}>
                        Add Item
                  </button>

                </form>
            </div >

        );
    }
}

export default AddItem;