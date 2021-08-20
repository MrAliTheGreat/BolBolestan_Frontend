import * as React from "react";


export default class Search extends React.Component{
    constructor(props) {
        super(props);
    }


    render(){
        return(
            <div className="row">
                <div className="col-12 searchArea">
                    <div className="searchBar">
                        <div className="col-8 col-sm-6 searchTextBox">
                            <input type="text" id="searchText" name="searchText" placeholder="نام درس"/>
                        </div>
                        <div className="col-4 col-sm-6">
                            <button type="button" className="searchButton" onClick={(e) =>
                                this.props.searchForOffersByName(e , document.getElementById("searchText").value)}
                            >
                                جستجو
                                <i className="flaticon-loupe"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}