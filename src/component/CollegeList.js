"use client";

import { useEffect, useState } from "react";
import { fetchCollegeByCourses, fetchColleges, fetchCourses } from "@/service/strapiService"
import ChartContainer from "./ChartContainer";


const CollegeList = () => {
    const [collegeList, setCollegeList] = useState([])
    // const [courseList, setCourseList] = useState([])
    const [courseDataChart, setCourseDataChart] = useState([])


    useEffect(() => {
        fetchColleges().then(resp => {
            setCollegeList(resp?.data?.data)
        }
        ).catch(err => {
            console.log(err)
        });


        fetchCourses().then(resp => {
            // setCourseList(resp?.data.data)
            const courseList = resp?.data.data
            if (courseList?.length > 0) {
                let tempArr = []
                courseList.forEach((c, i) => {
                    fetchCollegeByCourses(c.attributes.name).then(cc => {
                        if (cc?.data?.data[0]?.attributes?.name != undefined) {
                            tempArr[i] = { value: cc?.data?.data.length, label: c.attributes.name}
                            setCourseDataChart(tempArr)
                        }
                    })
                })
                
            }
        }
        ).catch(err => {
            console.log(err)
        });

    }, [])

    // const calculateCourseByCollege = async () => {
    //     console.log(courseList?.length)
    //     if (courseList?.length > 0) {
    //         let tempArr = []

    //         courseList.forEach((c, i) => {
    //             fetchCollegeByCourses(c.attributes.name).then(cc => {
    //                 if (cc?.data?.data[0]?.attributes?.name != undefined) {
    //                     tempArr[i] = { value: cc?.data?.data.length, label: c.attributes.name}
    //                     setCourseDataChart(tempArr)
    //                 }

    //             })
    //         })
            
    //     }
    // }

    // useEffect(() => {
    //     // calculateCourseByCollege();
    // }, [courseList])





    console.log("courseDataChart",courseDataChart?.length)

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">College Name</th>
                                <th scope="col">State</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Courses</th>
                                <th scope="col">year_founded</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collegeList?.map((item, i) => (
                                <tr key={`${i}+${item.id}`}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.attributes.name}</td>
                                    <td>{item.attributes.state}</td>
                                    <td>{item.attributes.rating}</td>
                                    <td>
                                        <ul >{item.attributes.courses?.data?.map((c, i) => (
                                            <li key={c.id}> {c.attributes.name}</li>
                                        ))}</ul>
                                    </td>
                                    <td>{item.attributes.year_founded}</td>
                                </tr>
                            ))}
                            {collegeList?.length < 0 && <h1>No Data Found</h1>}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-4  text-center">
                    {/* <div className="h-50 w-25"> */}
                    <ChartContainer data={courseDataChart} />
                    {/* </div> */}
                </div>
                <div className="col-lg-4 text-center">
                    {/* <div className="h-50 w-25"> */}
                    {/* <ChartContainer /> */}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}



export default CollegeList