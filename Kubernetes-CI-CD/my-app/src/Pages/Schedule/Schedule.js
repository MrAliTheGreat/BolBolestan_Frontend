import * as React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../../Assets/StylesCSS/ScheduleMain.css";
import {convertNumToFarsi} from "../../Utilities/TranslateNumToFarsi";
import ReactDOMServer from 'react-dom/server';
import {AxiosWithHeader} from "../../Services/AxiosWithHeader";

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
        const serverData = await AxiosWithHeader.get(`http://87.247.185.122:31007/schedule/JWT`);
        const jsonData = serverData.data;
        this.setState({
            studentCourses: jsonData
        });
    }

    async handleSemesterNumberFetch(){
        const serverData = await AxiosWithHeader.get(`http://87.247.185.122:31007/schedule/currentTerm`);
        const jsonData = serverData.data;
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

        // console.log("name: " + course.name);
        // console.log("classTimeSize: " + classTimeSize);
        // console.log("hour: " + hour + " minute: " + minute);
        // console.log("+++++++++++++++");

        return(
            <div className={classTimeSize}>
                {convertNumToFarsi(course.time)}
                <br/>
                {course.name}
                <br/>
                {
                    course.type === "Umumi" ? "??????????" :
                    course.type === "Takhasosi" ? "??????????" :
                    course.type === "Asli" ? "????????" : "????????"
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

        // console.log("name: " + course.name);
        // console.log("timeName: " + timeName);
        // console.log("________________");

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
                            index === 1 ? "??:???? - ??:????" :
                            index === 2 ? "??:???? - ????:????" :
                            index === 3 ? "????:???? - ????:????" :
                            index === 4 ? "????:???? - ????:????" :
                            index === 5 ? "????:???? - ????:????" :
                            index === 6 ? "????:???? - ????:????" :
                            index === 7 ? "????:???? - ????:????" :
                            index === 8 ? "????:???? - ????:????" :
                            index === 9 ? "????:???? - ????:????" : "????:???? - ????:????"
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
                                ???????????? ??????????
                            </div>
                            <div className="col-6">

                            </div>
                            <div className="col-2 term_text">
                                ?????? {convertNumToFarsi(this.state.currentTerm)}
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
                                                    ????????
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="tableColumnIdentifier2">
                                                    ????????????
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="tableColumnIdentifier2">
                                                    ????????????
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="tableColumnIdentifier2">
                                                    ???? ????????
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="tableColumnIdentifier2">
                                                    ????????????????
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="tableColumnIdentifier2">
                                                    ?????? ????????
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