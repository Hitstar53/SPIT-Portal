import React, { useRef, useEffect } from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image, PDFDownloadLink, Font,Line,Svg } from '@react-pdf/renderer';
import dayjs from "dayjs";
import { useLoaderData, useNavigate, json } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import ServerUrl from '../../../constants'
import styles from "./FilterLayout.module.css";
import Fab from '@mui/material/Fab';
import DownloadIcon from '@mui/icons-material/Download';
import Poppins from "../../../assets/Poppins-Regular.ttf"
import PoppinsBold from "../../../assets/Poppins-Bold.ttf"
import PoppinsSemiBold from "../../../assets/Poppins-SemiBold.ttf"

Font.register({ family: 'Poppins', fonts:[
  {src:Poppins},
  {src:PoppinsSemiBold,fontWeight:600},
  {src:PoppinsBold,fontWeight:900}
] });
Font.registerHyphenationCallback(word => [word]);

const ProfilePdf = ({data}) => {
    const styles = StyleSheet.create({
      page: {
        flexDirection: "row",
        fontFamily:"Poppins"
      },
      section: {
        marginBottom:10,
        marginLeft:10,
        marginRight:10,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10,
        flexGrow: 1,
      },
      title: {
        fontSize: 24,
        fontWeight:900,
        textAlign: "center",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        marginBottom: 10,
        height:50,
        gap: 20
      },
    });
    
    return (
      <Document>
        <Page size="A4" style={styles.page} wrap>
          <View style={styles.section}>
          <Text style={{marginTop:10,textAlign:"right",fontSize:10,fontWeight:600}}  render={({ pageNumber, totalPages }) => (
        `${pageNumber}`
      )} fixed />
            <View style={styles.title}>
              <Text>Student Profile Of {data.name}</Text>
            </View>
            <Svg height="10" width="580">
              <Line
                x1="0"
                y1="0"
                x2="560"
                y2="0"
                strokeWidth={1}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <View wrap={false}>
              <Heading heading="Personal Information" />
              <Row heading="Name" data={data.name} />
              <Row heading="UID" data={data.uid} />
              <Row heading="Email" data={data.emailID} />
              <Row heading="Mobile No." data={data.phone} />
              <Row
                heading="Date of Birth"
                data={dayjs(data.dob).format("DD/MM/YYYY")}
              />
              <Row heading="Address" data={data.address} />
              <Row heading="Gender" data={data.gender} />
              <Row heading="Blood Group" data={data.blood} />
              <Row heading="Religion" data={data.religion} />
              <Svg style={{ marginTop: 15 }} height="10" width="580">
                <Line
                  x1="0"
                  y1="0"
                  x2="560"
                  y2="0"
                  strokeWidth={1}
                  stroke="rgb(0,0,0)"
                />
              </Svg>
            </View>
            <View style={{ marginTop: 15 }} wrap={false}>
              <Heading heading="Parental Information" />
              <Row heading="Father Name" data={data.fname} />
              <Row heading="Father Mobile" data={data.fphone} />
              <Row heading="Father Email" data={data.femail} />
              <Row heading="Father Occupation" data={data.fprofession} />
              <Row heading="Mother Name" data={data.mname} />
              <Row heading="Mother Mobile" data={data.mphone} />
              <Row heading="Mother Email" data={data.memail} />
              <Row heading="Mother Occupation" data={data.mprofession} />
              <Svg style={{ marginTop: 15 }} height="10" width="580">
                <Line
                  x1="0"
                  y1="0"
                  x2="560"
                  y2="0"
                  strokeWidth={1}
                  stroke="rgb(0,0,0)"
                />
              </Svg>
            </View>
              
           
            <View style={{ marginTop: 10 }} wrap={false}>
              <Heading  heading="Educational Information" />
              <SubHeading heading="Current Details" />
              <Row heading="Institute" data={data.educationalInfo[0].insName} />
              <Row heading="Degree" data={data.educationalInfo[0].degree} />
              <Row heading="Year" data={data.educationalInfo[0].year} />
              <Row heading="Branch" data={data.educationalInfo[0].branch} />
              <Row heading="Division" data={data.educationalInfo[0].division} />
              <Row heading="Batch" data={data.educationalInfo[0].batch} />
              <Row heading="CGPA" data={data.educationalInfo[0].score} />
              <Row
                heading="Passing Year"
                data={data.educationalInfo[0].passingYear}
              />
              <SubHeading heading="Junior College / XIIth" />
              <Row heading="Institute" data={data.educationalInfo[1].insName} />
              <Row heading="Board" data={data.educationalInfo[1].degree} />
              <Row heading="Score" data={data.educationalInfo[1].score} />
              <Row
                heading="Passing Year"
                data={data.educationalInfo[1].passingYear}
              />
              <SubHeading heading="School / Xth" />
              <Row heading="Institute" data={data.educationalInfo[2].insName} />
              <Row heading="Board" data={data.educationalInfo[2].degree} />
              <Row heading="Score" data={data.educationalInfo[2].score} />
              <Row
                heading="Passing Year"
                data={data.educationalInfo[2].passingYear}
              />
              <Svg style={{ marginTop: 15 }} height="10" width="580">
                <Line
                  x1="0"
                  y1="0"
                  x2="560"
                  y2="0"
                  strokeWidth={1}
                  stroke="rgb(0,0,0)"
                />
              </Svg>
            </View>
            <View break style={{ marginTop: 10 }}>
              <Heading heading="Academic Information" />
              {data.semester.map((sem) => {
                return (
                  <View wrap={false}>
                    <SubHeading heading={`Semester ${sem.semesterNumber}`} />
                    {sem.courses.length > 0 ? (
                      <>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          textAlign: "left",
                          marginTop: 5,
                          marginBottom: 5,
                        }}
                      >
                        SGPA: {sem.sgpa}
                      </Text>
                      <View wrap={false}>
                        <Thead data={["Course Name", "ISE", "MSE", "ESE"]} />
                        {sem.courses.map((course) => {
                          return (
                            <Tbody
                              data={[
                                course.courseName,
                                course.exams[0].obtainedScore,
                                course.exams[1].obtainedScore,
                                course.exams[2].obtainedScore,
                              ]}
                            />
                          );
                        })}
                      </View>
                      </>
                    ) : null}
                  </View>
                );
              })}
              <Svg style={{ marginTop: 15 }} height="10" width="580">
                <Line
                  x1="0"
                  y1="0"
                  x2="560"
                  y2="0"
                  strokeWidth={1}
                  stroke="rgb(0,0,0)"
                />
              </Svg>
            </View>
            <View style={{ marginTop: 10 }} wrap={false}>
              <Heading heading="Extra Curricular Information" />
              <SubHeading heading="Event Participation" />
              {data.participation.length > 0 ? (
                <View style={{ marginTop: 10 }} wrap={false}>
                  <Thead
                    data={["Event Name", "Organization", "Type", "Description"]}
                  />
                  {data.participation.map((event) => {
                    return (
                      <Tbody
                        data={[
                          event.eventName,
                          event.organization,
                          event.type,
                          event.description,
                        ]}
                      />
                    );
                  })}
                </View>
              ) : null}
              <SubHeading heading="Committe Participation" />
              {data.committee.length > 0 ? (
                <View style={{ marginTop: 10 }} wrap={false}>
                  <Thead data={["Committe Name", "Tenure", "Position"]} />
                  {data.committee.map((com) => {
                    return (
                      <Tbody
                        data={[com.committeeDetails, com.tenure, com.position]}
                      />
                    );
                  })}
                </View>
              ) : null}
              <SubHeading heading="Volunteer Work" />
              {data.volunteerWork.length > 0 ? (
                <View style={{ marginTop: 10 }} wrap={false}>
                  <Thead data={["Event Name", "Organization", "Description"]} />
                  {data.volunteerWork.map((work) => {
                    return (
                      <Tbody
                        data={[
                          work.eventName,
                          work.organization,
                          work.description,
                        ]}
                      />
                    );
                  })}
                </View>
              ) : null}
            </View>
            <Svg style={{ marginTop: 15 }} height="10" width="580">
              <Line
                x1="0"
                y1="0"
                x2="560"
                y2="0"
                strokeWidth={1}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <View break style={{ marginTop: 10 }}>
              <Heading heading="Professional Information" />
              {data.skills.length > 0 ? (
                <View style={{ marginTop: 10 }} wrap={false}>
                  <SubHeading heading="Skills" />
                  <Text style={{ fontSize: 12, textAlign: "left" }}>
                    {data.skills.join(", ")}
                  </Text>
                </View>
              ) : null}
              <SubHeading heading="Projects" />
              {data.projects.length > 0 ? (
                <View style={{ marginTop: 10 }} wrap={false}>
                  <Thead
                    data={[
                      "Title",
                      "Domain",
                      "TechStack",
                      "Team",
                      "Description",
                    ]}
                  />
                  {data.projects.map((proj) => {
                    return (
                      <Tbody
                        data={[
                          proj.name,
                          proj.domain,
                          proj.techStack.join(", "),
                          proj.team.join(", "),
                          proj.description,
                        ]}
                      />
                    );
                  })}
                </View>
              ) : null}
              <SubHeading heading="Research" />
              {data.research.length > 0 ? (
                <View style={{ marginTop: 10 }} wrap={false}>
                  <Thead
                    data={[
                      "Title",
                      "Domain",
                      "TechStack",
                      "Mentor",
                      "Description",
                    ]}
                  />
                  {data.research.map((proj) => {
                    return (
                      <Tbody
                        data={[
                          proj.name,
                          proj.domain,
                          proj.techStack.join(", "),
                          proj.mentor.join(", "),
                          proj.description,
                        ]}
                      />
                    );
                  })}
                </View>
              ) : null}
              <SubHeading heading="Internship" />
              {data.internship.length > 0 ? (
                <View style={{ marginTop: 10 }} wrap={false}>
                  <Thead
                    data={[
                      "Organization",
                      "Position",
                      "Duration",
                      "Mode",
                      "Description",
                    ]}
                  />
                  {data.internship.map((intern) => {
                    return (
                      <Tbody
                        data={[
                          intern.organization,
                          intern.position,
                          intern.duration,
                          intern.mode,
                          intern.description,
                        ]}
                      />
                    );
                  })}
                </View>
              ) : null}
              <View wrap={false}>
                <SubHeading heading="Placement" />
                <Row heading="Company Name" data={data.placement.companyName} />
                <Row heading="Contact No" data={data.placement.contactNo} />
                <Row heading="Address" data={data.placement.address} />
                <Row heading="Role" data={data.placement.role} />
                <Row
                  heading="Job Description"
                  data={data.placement.description}
                />
                <Row heading="Package" data={`${data.placement.ctc} LPA`} />
                <Row
                  heading="Date of Joining"
                  data={dayjs(data.placement.doj).format("DD/MM/YYYY")}
                />
              </View>
              <Svg style={{ marginTop: 15 }} height="10" width="580">
                <Line
                  x1="0"
                  y1="0"
                  x2="560"
                  y2="0"
                  strokeWidth={1}
                  stroke="rgb(0,0,0)"
                />
              </Svg>
            </View>
          </View>
        </Page>
      </Document>
    );
}

const Row = ({heading,data}) =>{
  return(
    <View style={{flexDirection:"row"}} wrap={false}>
      <Text style={{width:"50%",marginTop:5,marginBottom:5,fontSize:12,fontWeight:600}}>{heading}:</Text>
      <Text style={{width:"50%",marginTop:5,marginBottom:5,fontSize:12}}>{data}</Text>
    </View>  
  )
}
const SubHeading = ({heading}) =>{
  return(
    <View style={{flexDirection:"row"}} wrap={false}>
      <Text style={{
          fontSize: 15,
          fontWeight: 600,
          textAlign: "left",
          marginTop: 15,
        }}>
          {heading}
      </Text>
    </View>  
  )
}
const Heading = ({heading}) =>{
  return (
    <View style={{ flexDirection: "row" }} wrap={false}>
      <Text style={{ fontSize: 20, fontWeight: 600, textAlign: "left" }}>
        {heading}
      </Text>
    </View>
  );
}

const TheadStyles = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    border: 1,
    alignItems: "center",
    textAlign: "center",
    flexGrow: 1,
  },
  tableHeaderCell: {
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    fontSize: 12,
    fontWeight: 700,
  },
  tableHeaderCellLast: {
    fontSize: 12,
    fontWeight: 700,
  },
});

const Thead = ({ data }) => {
  return (
    <View style={TheadStyles.tableHeader} wrap={false}>
      {
        data.map((head,index) => {
          return (
            <Text style={index!==data.length-1?{...TheadStyles.tableHeaderCell,width:`${100/data.length}%`}:{...TheadStyles.tableHeaderCellLast,width:`${100/data.length}%`}}>
              {head}
            </Text>
          )
        })
      }
    </View>
  );
};

const TbodyStyles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    borderBottom: 1,
    borderLeft: 1,
    borderRight: 1,
    textAlign: "center",
    flexGrow: 1,
  },
  tableRowCell: {
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    paddingHorizontal: 10,
    fontSize: 12,
  },
  tableRowCellLast: {
    fontSize: 12,
    paddingHorizontal: 10,
  },
});

const Tbody = ({ data }) => {
  return (
    <View style={TbodyStyles.tableRow}>
      {
        data.map((body,index) => {
          return (
            <Text style={index!==data.length-1?{...TbodyStyles.tableRowCell,width:`${100/data.length}%`}:{...TbodyStyles.tableRowCellLast,width:`${100/data.length}%`}}>
              {body}
            </Text>
          )
        })
      }
    </View>
  );
};


const ProfileDownload = () => {
    const data = useLoaderData()
    const navigate = useNavigate()
    const container = styles.container + " flex flex-col gap-8 p-8";
    return (
      <div className={container}>
        <div className="flex justify-between items-center text-4xl font-semibold">
          <p className="flex items-center gap-4">
            <FaArrowLeft
              onClick={() => navigate(-1)}
              className="text-2xl cursor-pointer"
            />
            Student Profile
          </p>
          {/* <Fab color="primary" aria-label="add">
            <DownloadIcon />
          </Fab> */}
        </div>
        <PDFViewer
          style={{
            width: "100%",
            height: "100vh",
          }}
        >
          <ProfilePdf data={data} />
        </PDFViewer>
      </div>
    );
}

export default ProfileDownload

export async function loader({ params }) {
    const response = await fetch(`${ServerUrl}/api/faculty/downloadStudent`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            uid: params.uid,
        }),
    });
    if (!response.ok) {
      throw json(
        { message: "Could not fetch profile information" },
        { status: 422 }
      );
    }
    if (response.ok) {
        const data = await response.json();
        return data;
    }
}