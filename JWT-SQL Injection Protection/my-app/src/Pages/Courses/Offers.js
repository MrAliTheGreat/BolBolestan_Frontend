import * as React from "react";
import "../../Assets/StylesCSS/CoursesMain.css"
import {convertNumToEnglish, convertNumToFarsi} from "../../Utilities/TranslateNumToFarsi";
import {convertDayToFarsi} from "../../Utilities/TranslateDayToFarsi";


export default class Offers extends React.Component{
    constructor(props) {
        super(props);
    }

    handleSortButtonClick(event , buttonElement){
        this.props.resetAllButtons();
        buttonElement.className = "chosenCategoryButton";

        this.props.searchForOffersByType(buttonElement.name);
    }

    isOkToShowOffers(){
        return(this.props.searchOffers !== null && this.props.OffersNamesByCode !== null)
    }

    render(){
        return(
            <div className="row">
                <div className="col-12 rowArea">
                    <div className="areaMenu">
                        <div className="menuTitle">
                            دروس ارائه شده
                        </div>
                        <div className="offeringContents">
                            <div className="row offeringFirstRow">
                                <div className="col-2 defaultButton">
                                    <button id="allOffersButton" type="button" name="all" className="chosenCategoryButton" onClick={(e) =>
                                        this.handleSortButtonClick(e , document.getElementById("allOffersButton"))}
                                    >
                                        همه
                                    </button>
                                </div>
                                <div className="col-2 defaultButton">
                                    <button id="exclusiveOffersButton" type="button" name="Takhasosi" className="defaultCategoryButton"onClick={(e) =>
                                        this.handleSortButtonClick(e , document.getElementById("exclusiveOffersButton"))}
                                    >
                                        اختصاصی
                                    </button>
                                </div>
                                <div className="col-2 defaultButton">
                                    <button id = "mainOffersButton" type="button" name = "Asli" className="defaultCategoryButton"onClick={(e) =>
                                        this.handleSortButtonClick(e , document.getElementById("mainOffersButton"))}
                                    >
                                        اصلی
                                    </button>
                                </div>
                                <div className="col-2 defaultButton">
                                    <button id = "baseOffersButton" type="button" name = "Paaye" className="defaultCategoryButton"onClick={(e) =>
                                        this.handleSortButtonClick(e , document.getElementById("baseOffersButton"))}
                                    >
                                        پایه
                                    </button>
                                </div>
                                <div className="col-2 defaultButton">
                                    <button id = "generalOffersButton" type="button" name = "Umumi" className="defaultCategoryButton"onClick={(e) =>
                                        this.handleSortButtonClick(e , document.getElementById("generalOffersButton"))}
                                    >
                                        عمومی
                                    </button>
                                </div>
                            </div>
                            <div className="row offeringTableArea">
                                <div className="table-responsive offeringTable">
                                    {this.isOkToShowOffers() ? this.renderTableOffers() : this.renderLoading()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderLoading(){
        return (
            <div className="h-100 m-5 center-text p-5 d-flex justify-content-center">
                <div className="spinner-grow text-danger m-5" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    renderTableOffers(){
        {/* <!--                    Table is implemented ltr so it's more readable-->*/}
        return(
            <table className="table tableOfferings">
                <tr>
                    <th scope="col">
                        <div className="tableColumnIdentifier"></div>
                    </th>
                    <th scope="col">
                        <div className="tableColumnIdentifier">
                            کد
                        </div>
                    </th>
                    <th scope="col">
                        <div className="tableColumnIdentifier">
                            ظرفیت
                        </div>
                    </th>
                    <th scope="col">
                        <div className="tableColumnIdentifier">
                            نوع
                        </div>
                    </th>
                    <th scope="col">
                        <div className="tableColumnIdentifier">
                            نام درس
                        </div>
                    </th>
                    <th scope="col">
                        <div className="tableColumnIdentifier">
                            استاد
                        </div>
                    </th>
                    <th scope="col">
                        <div className="tableColumnIdentifier">
                            واحد
                        </div>
                    </th>
                    <th scope="col">
                        <div className="tableColumnIdentifier tableDescription">
                            توضیحات
                        </div>
                    </th>
                </tr>

                {
                    this.props.searchOffers.map((searchOffering , index) =>
                        this.renderSingleSearchOffering(searchOffering , this.props.searchOffers.length , index)
                    )
                }
            </table>
        );
    }

    getOfferDaysText(days){
        let daysText = "";
        for (let i = 0 ; i < days.length ; i++){
            if(i == days.length - 1){
                daysText += convertDayToFarsi(days[i]);
            }
            else{
                daysText += (convertDayToFarsi(days[i]) + " - ");
            }
        }
        return daysText;
    }

    getExamTimeText(examStart , examEnd){
        let startComplete = examStart.split("T");
        let start = startComplete[1].split(":");
        let endComplete = examEnd.split("T");
        let end = endComplete[1].split(":");
        let date = startComplete[0].split("-");
        return(convertNumToFarsi(date[1]) + "/" + convertNumToFarsi(date[2]) + " - " +
            convertNumToFarsi(start[0]) + ":" + convertNumToFarsi(start[1]) + "-" +
            convertNumToFarsi(end[0]) + ":" + convertNumToFarsi(end[1]) );
    }

    renderSingleSearchOffering(searchOffer , numOfferings , index){
        return(
            <tr>
                <td scope="row">
                    <div className="defaultButton">
                        {searchOffer.offerStatus == "WAITING" ?
                            <button type="button" className="waitingOffer">
                                <i className="flaticon-clock-circular-outline"></i>
                            </button>
                            :
                            <button id={"add" + index} type="button" className="addOfferButton" onClick={this.props.handleAddOffer}>
                                <i className="flaticon-add"></i>
                            </button>
                        }
                    </div>
                </td>
                <td>
                    <div id = {"code" + index} className="tableTextContent">
                        {convertNumToFarsi(searchOffer.code)}-{searchOffer.classCode.length == 1 ?
                        "۰" + convertNumToFarsi(searchOffer.classCode) :
                        convertNumToFarsi(searchOffer.classCode)}
                    </div>
                </td>
                <td>
                    <div className="tableRowIdentifier">
                        {convertNumToFarsi(searchOffer.numSignedUp)}/{convertNumToFarsi(searchOffer.capacity)}
                    </div>
                </td>
                <td>
                    <div className="tableTextContent">
                        <div className="offerType">
                            {
                                searchOffer.type == "Umumi" ? <div className="yellow">عمومی</div> :
                                searchOffer.type == "Takhasosi" ? <div className="blue">تخصصی</div> :
                                searchOffer.type == "Asli" ? <div className="green">اصلی</div> :
                                <div className="red">پایه</div>
                            }
                        </div>
                    </div>
                </td>
                <td>
                    <div className="tableTextContent">
                        {searchOffer.name}
                    </div>
                </td>
                <td>
                    <div className="tableTextContent">
                        {searchOffer.instructor}
                    </div>
                </td>
                <td className="hoveringCellWithMessage">
                    <div className="tableRowIdentifier">
                        {convertNumToFarsi(searchOffer.units)}
                    </div>
                    {(index < numOfferings - 4 || numOfferings <= 4)?
                        <span className="hoverMessage">
                            {convertNumToFarsi(searchOffer.time)}
                            <br/>
                            {this.getOfferDaysText(searchOffer.days)}
                            <br/>
                            __________________
                            <br/>
                            <div className="hoverMessageTitle">
                                پیش نیازی ها
                            </div>
                            {searchOffer.prerequisites.map((pre) =>
                                this.props.OffersNamesByCode[pre]
                            )}
                            <br/>
                            <div className="hoverMessageTitle">
                                امتحان
                            </div>
                            {this.getExamTimeText(searchOffer.examTimeStart , searchOffer.examTimeEnd)}
                        </span>
                        :
                        <span className="BottomRowsMessage">
                            {convertNumToFarsi(searchOffer.time)}
                            <br/>
                            {this.getOfferDaysText(searchOffer.days)}
                            <br/>
                            __________________
                            <br/>
                            <div className="hoverMessageTitle">
                                پیش نیازی ها
                            </div>
                                {searchOffer.prerequisites.map((pre) =>
                                    this.props.OffersNamesByCode[pre]
                                )}
                                <br/>
                            <div className="hoverMessageTitle">
                                امتحان
                            </div>
                            {this.getExamTimeText(searchOffer.examTimeStart , searchOffer.examTimeEnd)}
                        </span>
                    }
                </td>
                {/* <!--                                        Number based on number of offerings-->*/}
                {index == 0 ? <td rowSpan={numOfferings}></td> : ""}
            </tr>
        );
    }
}