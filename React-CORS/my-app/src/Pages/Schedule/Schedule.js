import * as React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../../Assets/StylesCSS/ScheduleMain.css";
import {convertNumToFarsi} from "../../Utilities/TranslateNumToFarsi";
import ReactDOMServer from 'react-dom/server';

export default class Schedule extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            studentCourses: null,
            currentTerm: null
        }
    }

    async componentDidMount() {
        await this.handleStudentCoursesFetch();
        await this.handleSemesterNumberFetch();
        this.placeCoursesInTable();
    }

    async handleStudentCoursesFetch(){
        const serverData = await fetch(`http://localhost:8080/schedule/${localStorage.getItem("onlineStudentID")}`);
        const jsonData = await serverData.json();
        this.setState({
            studentCourses: jsonData
        });
    }

    async handleSemesterNumberFetch(){
        const serverData = await fetch(`http://localhost:8080/schedule/${localStorage.getItem("onlineStudentID")}/currentTerm`);
        const jsonData = await serverData.json();
        this.setState({
            currentTerm: jsonData
        });
    }

    generateSizeCourseTableFormat(course){
        let timeComplete = course.time.split("-");
        let start = timeComplete[0].split(":");
        let end = timeComplete[1].split(":");

        let hour = parseInt(end[0]) - parseInt(start[0]); let minute = Math.abs(parseInt(end[1]) - parseInt(start[1]));

        let classTimeSize = "";

        if(hour === 1 && minute === 0){
            classTimeSize = "oneSession";
        }
        else if(hour === 1 && minute === 30){
            classTimeSize = "oneHalfSession";
        }
        else if(hour === 2 && minute === 0){
            classTimeSize = "twoSession";
        }
        else if(hour === 2 && minute === 30){
            classTimeSize = "oneHalfSession";
        }
        else if(hour === 3 && minute === 0){
            classTimeSize = "threeSession";
        }

        console.log("name: " + course.name);
        console.log("classTimeSize: " + classTimeSize);
        console.log("hour: " + hour + " minute: " + minute);
        console.log("+++++++++++++++");

        return(
            <div className={classTimeSize}>
                {convertNumToFarsi(course.time)}
                <br/>
                {course.name}
                <br/>
                {
                    course.type === "Umumi" ? "عمومی" :
                    course.type === "Takhasosi" ? "تخصصی" :
                    course.type === "Asli" ? "اصلی" : "پایه"
                }
            </div>
        );
    }

    generateCourseTableFormat(course){
        let timeName = "startTime";
        let timeComplete = course.time.split("-");
        let start = timeComplete[0].split(":");
        if(parseInt(start[1]) === 0){
            timeName += start[0];
        }
        else if(parseInt(start[1]) === 30){
            timeName += start[0] + "-" + start[1];
        }

        console.log("name: " + course.name);
        console.log("timeName: " + timeName);
        console.log("________________");

        return(
            <div className="startRow">
                {
                    course.type === "Umumi" ?
                        <div className={"scheduleBox yellow " + timeName}>
                            {this.generateSizeCourseTableFormat(course)}
                        </div>
                    :
                    course.type === "Takhasosi" ?
                        <div className={"scheduleBox blue " + timeName}>
                            {this.generateSizeCourseTableFormat(course)}
                        </div>
                    :
                    course.type === "Asli" ?
                        <div className={"scheduleBox green " + timeName}>
                            {this.generateSizeCourseTableFormat(course)}
                        </div>
                    :
                        <div className={"scheduleBox red " + timeName}>
                            {this.generateSizeCourseTableFormat(course)}
                        </div>
                }
            </div>
        );
    }

    placeCoursesInTable(){
        const studentCourses = this.state.studentCourses;

        for(let i = 0 ; i < studentCourses.length ; i++){
            const days = studentCourses[i].days;
            for(let j = 0; j < days.length; j++){
                document.getElementById("day" + days[j]).innerHTML += ReactDOMServer.renderToStaticMarkup(this.generateCourseTableFormat(studentCourses[i]));
            }
        }
    }

    renderEmpty(index){
        return(
            <tr>
                <td>
                    <div className="tableRowIdentifier2">
                        {
                            index === 1 ? "۷:۳۰ - ۹:۰۰" :
                            index === 2 ? "۹:۰۰ - ۱۰:۰۰" :
                            index === 3 ? "۱۰:۰۰ - ۱۱:۰۰" :
                            index === 4 ? "۱۱:۰۰ - ۱۲:۰۰" :
                            index === 5 ? "۱۲:۰۰ - ۱۳:۰۰" :
                            index === 6 ? "۱۳:۰۰ - ۱۴:۰۰" :
                            index === 7 ? "۱۴:۰۰ - ۱۵:۰۰" :
                            index === 8 ? "۱۵:۰۰ - ۱۶:۰۰" :
                            index === 9 ? "۱۶:۰۰ - ۱۷:۰۰" : "۱۷:۰۰ - ۱۸:۰۰"
                        }
                    </div>
                </td>
                <td id = "daySaturday">

                </td>
                <td id = "daySunday">

                </td>
                <td id = "dayMonday">

                </td>
                <td id = "dayTuesday">

                </td>
                <td id = "dayWednesday">

                </td>
                <td id = "dayThursday">
                    <div className="tableRowIdentifier2">

                    </div>
                </td>
            </tr>
        );
    }

    renderSchedule(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 rowArea">
                        <div className="topArea">
                            <div className="col-1 calender_icon">
                                <i className="flaticon-calendar"></i>
                            </div>
                            <div className="col-3 icon_text">
                                برنامه هفتگی
                            </div>
                            <div className="col-6">

                            </div>
                            <div className="col-2 term_text">
                                ترم {convertNumToFarsi(this.state.currentTerm)}
                            </div>

                        </div>

                    </div>
                    <div className="col-12 rowArea2">
                        <div className="downArea">
                            <div className="tableArea">
                                <div className="table-responsive tableInfo2">
                                    <table id = "coursesTable" className="table tableCourses2">
                                        <tr>
                                            <th scope="col" className="firstColumn"></th>
                                            <th scope="col">
                                                <div className="tableColumnIdentifier2">
                                                    شنبه
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="tableColumnIdentifier2">
                                                    یکشنبه
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="tableColumnIdentifier2">
                                                    دوشنبه
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="tableColumnIdentifier2">
                                                    سه شنبه
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="tableColumnIdentifier2">
                                                    چهارشنبه
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="tableColumnIdentifier2">
                                                    پنج شنبه
                                                </div>
                                            </th>
                                        </tr>
                                        {this.renderEmpty(1)}
                                        {this.renderEmpty(2)}
                                        {this.renderEmpty(3)}
                                        {this.renderEmpty(4)}
                                        {this.renderEmpty(5)}
                                        {this.renderEmpty(6)}
                                        {this.renderEmpty(7)}
                                        {this.renderEmpty(8)}
                                        {this.renderEmpty(9)}
                                        {this.renderEmpty(10)}

                                    </table>
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

    isOkToRender(){
        return(this.state.studentCourses !== null && this.state.currentTerm !== null);
    }

    render() {
        return(
            <div>
                <Header />
                <main>
                    {this.isOkToRender() ? this.renderSchedule() : this.renderLoading()}
                </main>
                <Footer />
            </div>
        );
    }
}