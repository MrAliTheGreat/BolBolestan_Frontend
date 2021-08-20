import * as React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../../Assets/StylesCSS/CoursesMain.css";
import {convertNumToEnglish, convertNumToFarsi} from "../../Utilities/TranslateNumToFarsi";
import {convertDayToFarsi} from "../../Utilities/TranslateDayToFarsi";
import Search from "./Search";
import Offers from "./Offers";
import {AxiosWithHeader} from "../../Services/AxiosWithHeader";

const axios = require('axios')

export default class Courses extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            searchOffers: null,
            OffersNamesByCode: null,
            studentSelectedNowOffers: null,
            studentSelectedNowStatus: null,
            numSelectedNowUnits: 0
        }

        this.resetAllButtons.bind(this);
    }

    async componentDidMount() {
        await this.handleOfferingsNameFetch();
        this.handleSearchOfferingFetch();
        this.handleResetSelectedNowOffers();
        this.handleSelectedNowOffersFetch();
        this.handleSelectedNowOffersStatusFetch();
        this.handleNumUnitsSelectedNowOffersFetch();

        this.intervalTimer = setInterval(() => {
            this.setState({
                searchOffers: null,
                studentSelectedNowStatus: null
            });
            this.handleSearchOfferingFetch();
            this.handleResetSelectedNowOffers();
            this.handleSelectedNowOffersStatusFetch();
            this.handleNumUnitsSelectedNowOffersFetch();
        }, 60 * 1000); // First operand is in minutes => 10 minutes
    }

    componentWillUnmount() {
        clearInterval(this.intervalTimer);
    }

    isOkToShowSelectedNowOffers(){
        return(this.state.studentSelectedNowOffers !== null && this.state.studentSelectedNowStatus !== null);
    }

    // !!! MODIFICATION !!!
    // These 3 can be turned into one
    handleSearchOfferingFetch = async (event) => {
        const serverData = await AxiosWithHeader.get(`http://localhost:8080/courses/offers`);
        const jsonData = serverData.data;
        this.setState({
            searchOffers: jsonData
        });
    }

    handleOfferingsNameFetch = async (event) => {
        const serverData = await AxiosWithHeader.get(`http://localhost:8080/courses/offersNames`);
        const jsonData = serverData.data;
        this.setState({
            OffersNamesByCode: jsonData
        });
    }

    handleSelectedNowOffersFetch = async (event) => {
        const serverData = await AxiosWithHeader.get(`http://localhost:8080/courses/selectedNowOffers`);
        const jsonData = serverData.data;
        this.setState({
            studentSelectedNowOffers: jsonData
        });
    }

    handleSelectedNowOffersStatusFetch = async (event) => {
        const serverData = await AxiosWithHeader.get(`http://localhost:8080/courses/selectedNowOffersStatus`);
        const jsonData = serverData.data;
        this.setState({
            studentSelectedNowStatus: jsonData
        })
    }

    handleNumUnitsSelectedNowOffersFetch = async (event) => {
        const serverData = await AxiosWithHeader.get(`http://localhost:8080/courses/numSelectedNowOffersUnits`);
        const jsonData = serverData.data;
        this.setState({
            numSelectedNowUnits: jsonData
        });
    }

    handleAddOffer(event){
        const offerIndex = event.currentTarget.id.replace("add" , "");
        const offerCompleteCode = document.getElementById("code" + offerIndex).textContent.split("-");
        const offerCode = convertNumToEnglish(offerCompleteCode[0]) , offerClassCode = parseInt(convertNumToEnglish(offerCompleteCode[1])).toString();
        this.addToSelectedNowOffers(offerCode , offerClassCode);
    }

    async searchForOffersByName(event , searchText){
        this.resetAllButtons();
        document.getElementById("allOffersButton").className = "chosenCategoryButton";

        this.setState({
            searchOffers: null
        });
        let response = await AxiosWithHeader.post("http://localhost:8080/courses/searchName" , {
            searchText: searchText
        });
        if(response.data === "OK"){
            this.handleSearchOfferingFetch();
        }
        else{
            alert("مشکلی در سرچ پیش آمده است!");
        }
    }

    async searchForOffersByType(searchType){
        this.setState({
            searchOffers: null
        });
        let response = await AxiosWithHeader.post("http://localhost:8080/courses/searchType" , {
            searchType: searchType
        });
        if(response.data === "OK"){
            this.handleSearchOfferingFetch();
        }
        else{
            alert("مشکلی در سرچ پیش آمده است!");
        }
    }

    resetAllButtons(){
        document.getElementById("allOffersButton").className = "defaultCategoryButton";
        document.getElementById("exclusiveOffersButton").className = "defaultCategoryButton";
        document.getElementById("mainOffersButton").className = "defaultCategoryButton";
        document.getElementById("baseOffersButton").className = "defaultCategoryButton";
        document.getElementById("generalOffersButton").className = "defaultCategoryButton";
    }

    async addToSelectedNowOffers(offerCode , offerClassCode){
        this.setState({
            studentSelectedNowOffers: null
        });
        let response = await AxiosWithHeader.post(`http://localhost:8080/courses/add` , {
            offerCode: offerCode ,
            offerClassCode: offerClassCode
        });
        if(response.data === "OK"){
            this.handleSelectedNowOffersFetch();
            this.handleSelectedNowOffersStatusFetch();
            this.handleNumUnitsSelectedNowOffersFetch();
        }
        else{
            alert("مشکلی در اضافه کردن درس پیش آمده است! " + response.data);
            this.handleSelectedNowOffersFetch();
            this.handleSelectedNowOffersStatusFetch();
            this.handleNumUnitsSelectedNowOffersFetch();
        }
    }

    renderSearch(){
        return(
            <div className="row">
                <div className="col-12 searchArea">
                    <div className="searchBar">
                        <div className="col-8 col-sm-6 searchTextBox">
                            <input type="text" id="searchText" name="searchText" placeholder="نام درس"/>
                        </div>
                        <div className="col-4 col-sm-6">
                            <button type="button" className="searchButton" onClick={(e) =>
                                this.searchForOffersByName(e , document.getElementById("searchText").value)}
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

    async removeFromSelectedNowOffers(offerCode , offerClassCode){
        this.setState({
            studentSelectedNowOffers: null
        });
        let response = await AxiosWithHeader.delete(`http://localhost:8080/courses/remove` , { data:
            {
                offerCode: offerCode,
                offerClassCode: offerClassCode
            }
        });
        if(response.data === "OK"){
            this.handleSelectedNowOffersFetch();
            this.handleSelectedNowOffersStatusFetch();
            this.handleNumUnitsSelectedNowOffersFetch();
        }
        else{
            alert("مشکلی در حذف کردن درس پیش آمده است!");
        }
    }

    handleRemoveSelectedNowOffer(event){
        const offerIndex = event.currentTarget.id.replace("remove" , "");
        const offerCompleteCode = document.getElementById("codeSelectedNow" + offerIndex).textContent.split("-");
        const offerCode = convertNumToEnglish(offerCompleteCode[0]) , offerClassCode = parseInt(convertNumToEnglish(offerCompleteCode[1])).toString();
        this.removeFromSelectedNowOffers(offerCode , offerClassCode);
    }

    renderSingleSelectedNowOffer(singleSelectedNowOffer , index){
        return(
            <tr>
                <th scope="row">
                    <div className="tableRowIdentifier">
                        {convertNumToFarsi(singleSelectedNowOffer.units)}
                    </div>
                </th>
                <td>
                    <div className="tableTextContent">
                        {singleSelectedNowOffer.instructor}
                    </div>
                </td>
                <td>
                    <div className="tableTextContent">
                        {this.state.OffersNamesByCode[singleSelectedNowOffer.code]}
                    </div>
                </td>
                <td>
                    <div id = {"codeSelectedNow" + index} className="tableTextContent">
                        {convertNumToFarsi(singleSelectedNowOffer.code)}-{singleSelectedNowOffer.classCode.length == 1 ?
                                                                          "۰" + convertNumToFarsi(singleSelectedNowOffer.classCode) :
                                                                          convertNumToFarsi(singleSelectedNowOffer.classCode)}
                    </div>
                </td>
                <td>
                    <div className="tableStatusContent">
                        {
                            this.state.studentSelectedNowStatus[singleSelectedNowOffer.code] === "NOT_FINALIZED" ?
                                <div className="notFinalized">
                                    ثبت نهایی نشده
                                </div>
                            :
                            this.state.studentSelectedNowStatus[singleSelectedNowOffer.code] === "FINALIZED" ?
                                <div className="finalized">
                                    ثبت شده
                                </div>
                            :
                                <div className="waiting">
                                    در انتظار
                                </div>
                        }
                    </div>
                </td>
                <td>
                    <button id = {"remove" + index} type="button" className="defaultButton tableRemoveIcon" onClick={this.handleRemoveSelectedNowOffer.bind(this)}>
                        <i className="flaticon-trash-bin"></i>
                    </button>
                </td>
            </tr>
        );
    }

    renderStudentSelectedNowOffersTable(){
        {/* <!--                    Table is implemented ltr so it's more readable-->*/}
        return(
            <table className="table tableCourses">
                <tr>
                    <th scope="col">
                        <div className="tableColumnIdentifier">
                            واحد
                        </div>
                    </th>
                    <th scope="col">
                        <div className="tableColumnIdentifier">
                            استاد
                        </div>
                    </th>
                    <th scope="col">
                        <div className="tableColumnIdentifier">
                            نام درس
                        </div>
                    </th>
                    <th scope="col">
                        <div className="tableColumnIdentifier">
                            کد
                        </div>
                    </th>
                    <th scope="col">
                        <div className="tableColumnIdentifier">
                            وضعیت
                        </div>
                    </th>
                    <th scope="col"></th>
                </tr>

                {this.state.studentSelectedNowOffers.map((selectedNowOffer , index) =>
                    this.renderSingleSelectedNowOffer(selectedNowOffer , index)
                )}

            </table>
        );
    }

    async handleResetSelectedNowOffers(event){
        this.setState({
            studentSelectedNowOffers: null
        });
        let response = await AxiosWithHeader.post(`http://localhost:8080/courses/reset` , {
            reset: "reset"
        });
        if(response.data === "OK"){
            this.handleSelectedNowOffersFetch();
            this.handleSelectedNowOffersStatusFetch();
            this.handleNumUnitsSelectedNowOffersFetch();
        }
        else{
            alert("مشکلی در ریست کردن درس ها پیش آمده است!");
        }
    }

    async handleSubmit(event){
        this.setState({
            studentSelectedNowOffers: null,
            studentSelectedNowStatus: null
        });
        let response = await AxiosWithHeader.post(`http://localhost:8080/courses/submit` , {
            submit: "submit"
        });;
        if(response.data === "OK"){
            this.handleSearchOfferingFetch();
            this.handleResetSelectedNowOffers();
            // this.handleSelectedNowOffersFetch();
            this.handleSelectedNowOffersStatusFetch();
            this.handleNumUnitsSelectedNowOffersFetch();
        }
        else{
            alert("مشکلی در ثبت کردن درس ها پیش آمده است! " + response.data);
            this.handleSearchOfferingFetch();
            this.handleResetSelectedNowOffers();
            // this.handleSelectedNowOffersFetch();
            this.handleSelectedNowOffersStatusFetch();
            this.handleNumUnitsSelectedNowOffersFetch();
        }
    }

    renderBarUnderSelectedNowOffers(){
        return(
            <div className="row col-12 BottomCoursesList">
                <div className="col-8 col-sm-6" align="right">
                    تعداد واحد های ثبت شده: {convertNumToFarsi(this.state.numSelectedNowUnits)}
                </div>
                <div className="col-4 col-sm-6" align="left">
                    <button type="button" className="defaultButton" onClick={(e) => this.handleResetSelectedNowOffers(e)}>
                        <i className="flaticon-refresh-arrow"></i>
                    </button>
                    <button type="button" className="FinalizeButton" onClick={(e) => this.handleSubmit(e)}>
                        ثبت نهایی
                    </button>
                </div>
            </div>
        );
    }

    renderStudentSelectedNowOffersArea(){
        return(
            <div className="row">
                <div className="col-12 rowArea">
                    <div className="areaMenu flex-column">
                        <div className="menuTitle">
                            دروس انتخاب شده
                        </div>
                        <div className="coursesListArea">
                            <div className="table-responsive tableInfo">
                                {this.isOkToShowSelectedNowOffers() ? this.renderStudentSelectedNowOffersTable() : this.renderLoading()}
                            </div>
                        </div>

                        {this.isOkToShowSelectedNowOffers() ? this.renderBarUnderSelectedNowOffers() : this.renderLoadingBarUnderSelectedNowOffers()}

                    </div>
                </div>
            </div>
        );
    }

    renderMain(){
        return(
            <main>
                <div className="container-fluid">
                    {this.renderStudentSelectedNowOffersArea()}

                    {<Search searchForOffersByName = {this.searchForOffersByName.bind(this)} />}

                    {<Offers resetAllButtons = {this.resetAllButtons}
                             searchForOffersByType = {this.searchForOffersByType.bind(this)}
                             searchOffers = {this.state.searchOffers}
                             OffersNamesByCode = {this.state.OffersNamesByCode}
                             handleAddOffer = {this.handleAddOffer.bind(this)} />}
                </div>
            </main>
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

    renderLoadingBarUnderSelectedNowOffers(){
        return (
            <div className="h-100 m-1 center-text p-0 d-flex justify-content-center">
                <div className="spinner-grow text-info m-1" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Header />
                {this.renderMain()}
                <Footer />
            </div>
        );
    }
}