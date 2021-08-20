import * as React from "react";

import "../../Assets/StylesCSS/HomeMain.css";
import {convertNumToFarsi} from "../../Utilities/TranslateNumToFarsi";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import coverPhoto from "../../Assets/Pictures/cover photo.jpg";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentJSON: null
        }
    }

    handleReceiveStudentInfo = async (event) => {
        const data = await fetch(`http://localhost:8080/home/${localStorage.getItem("onlineStudentID")}`);
        const studentInfo = await data.json();
        this.setState({
           studentJSON: studentInfo
        });
    }

    componentDidMount() {
        this.handleReceiveStudentInfo();
    }

    render() {
        return(
            <div>
                <Header />
                {this.state.studentJSON !== null ? this.renderPageMain() : this.renderLoading()}
                <Footer />
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

    renderTitleAndText(title , text){
        return (
            <div className="col-12">
                <div className="row studentInfo">
                    <div className="title">
                        {title}
                    </div>
                    <div className="titleTextValue">
                        {text}
                    </div>
                </div>
            </div>
        );
    }

    renderTitleAndTextFirstRow(title , text){
        return (
            <div className="col-12">
                <div className="row studentInfo">
                    <div className="title">
                        <div className="firstRow">
                            {title}
                        </div>
                    </div>
                    <div className="titleTextValue">
                        <div className="firstRow">
                            {text}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderPassedCourse(passedCourseInfo , index){
        return(
            <div className="col-12 d-flex justify-content-center">
                <div className="passCourseArea">
                    <div className="col-md-1 index">
                        {convertNumToFarsi(index + 1)}
                    </div>
                    <div className="col-md-2 info">
                        {convertNumToFarsi(passedCourseInfo.code)}
                    </div>
                    <div className="col-md-3 info">
                        {this.state.studentJSON.courseNamesByCode[passedCourseInfo.code]}
                    </div>
                    <div className="col-md-2 info">
                        {convertNumToFarsi(passedCourseInfo.units)} واحد
                    </div>
                    <div className="col-md-2 statusArea">
                        {passedCourseInfo.grade >= 10 ?
                            <div className="passed">
                                قبول
                            </div>
                            :
                            <div className="failed">
                                مردود
                            </div>
                        }
                    </div>
                    {passedCourseInfo.grade >= 10 ?
                        <div className="col-md-2 gradePassed">
                            {convertNumToFarsi(passedCourseInfo.grade)}
                        </div>
                        :
                        <div className="col-md-2 gradeFailed">
                            {convertNumToFarsi(passedCourseInfo.grade)}
                        </div>
                    }
                </div>
            </div>
        );
    }

    renderSemester(numSemester , passedCoursesInfo , semesterGPA){
        return(
            <div className="row">
                <div className="col-12 rowArea">
                    <div className="areaMenu">
                        <div className="menuTitle">
                            کارنامه - ترم {convertNumToFarsi(numSemester)}
                        </div>
                        <div className="allPassedCoursesArea">
                            {passedCoursesInfo.map((singlePassedCourse , index) => (
                                this.renderPassedCourse(singlePassedCourse , index)
                                ))
                            }
                            <div className="col-12 d-flex justify-content-end">
                                <div className="averageArea">
                                    <div className="col-md-12 averageText">
                                        معدل: {convertNumToFarsi(semesterGPA)}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderPageMain(){
        const semesters = this.state.studentJSON.passedCoursesBySemester;
        return (
            <main>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block backgroundImage" src={coverPhoto}
                                 alt="First slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block backgroundImage" src={coverPhoto}
                                 alt="Second slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block backgroundImage" src={coverPhoto}
                                 alt="Third slide"/>
                        </div>
                    </div>
                    <a className="carousel-control-prev" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4 col-md-4 col-sm-3" align="center">
                            <div className="col-12">
                                <img alt="tmp" className="ProfileImage" src={this.state.studentJSON.imgAddress}/>
                            </div>
                            {this.renderTitleAndTextFirstRow("نام:" , this.state.studentJSON.name + " " + this.state.studentJSON.secondName)}
                            {this.renderTitleAndText("شماره دانشجویی:" , convertNumToFarsi(this.state.studentJSON.studentId))}
                            {this.renderTitleAndText("تاریخ تولد:" , convertNumToFarsi(this.state.studentJSON.birthDate))}
                            {this.renderTitleAndText("معدل کل:" , convertNumToFarsi(this.state.studentJSON.totalAverageGrade))}
                            {this.renderTitleAndText("واحد گذرانده:" , convertNumToFarsi(this.state.studentJSON.numUnitsPassed))}
                            {this.renderTitleAndText("دانشکده:" , this.state.studentJSON.faculty)}
                            {this.renderTitleAndText("رشته:" , this.state.studentJSON.field)}
                            {this.renderTitleAndText("مقطع:" , this.state.studentJSON.level)}
                            <div className="col-12">
                                <div className="row studentInfo">
                                    <div className="studyStatus">
                                        {this.state.studentJSON.status}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-8 col-md-8 col-sm-9 Separator">
                            <div className="container-fluid">
                                {
                                    Object.keys(semesters).map((numSemester , idx , numAllSemesters) =>
                                        this.renderSemester(numAllSemesters.length - numSemester + 1 , semesters[numAllSemesters.length - numSemester + 1] , this.state.studentJSON.averageGradeBySemester[numAllSemesters.length - numSemester + 1])
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}