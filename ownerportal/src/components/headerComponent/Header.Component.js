import React, { Component } from 'react';
import "./Header.Component.css";

class HeaderComponent extends Component {
    state = {
        route: ''
    }

    render() {
        return (<nav className="navbar">
            <a className="navbar" href="#"><h5>BonApp Owner</h5></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse row" id="navbarSupportedContent">
                <div className="col-2 offset-10">                    
                </div>
            </div>
        </nav>);
    }
}

export default HeaderComponent;