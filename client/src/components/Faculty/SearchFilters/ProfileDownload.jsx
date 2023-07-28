import React, { useRef, useEffect } from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image, PDFDownloadLink, Font,Line,Svg } from '@react-pdf/renderer';
import dayjs from "dayjs";
import { useLoaderData, useNavigate } from 'react-router-dom'
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

const ProfilePdf = ({data}) => {
    const styles = StyleSheet.create({
      page: {
        flexDirection: "row",
        fontFamily:"Poppins"
      },
      section: {
        margin: 10,
        padding: 10,
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
            <View style={styles.title}><Text>Student Profile Of {data.name}</Text></View>
            <Svg height="10" width="580">
              <Line x1="0" y1="0" x2="560" y2="0" strokeWidth={1} stroke="rgb(0,0,0)"/>
            </Svg>
            <View wrap={false}>
              <Heading heading="Personal Information" />
              <Row heading="Name" data={data.name} />
              <Row heading="UID" data={data.uid} />
              <Row heading="Email" data={data.emailID} />
              <Row heading="Mobile No." data={data.phone} />
              <Row heading="Date of Birth" data={dayjs(data.dob).format("DD/MM/YYYY")} />
              <Row heading="Address" data={data.address} />
              <Row heading="Gender" data={data.gender} />
              <Row heading="Blood Group" data={data.blood} />
              <Row heading="Religion" data={data.religion} />
              <Svg style={{marginTop:15}} height="10" width="580">
                <Line x1="0" y1="0" x2="560" y2="0" strokeWidth={1} stroke="rgb(0,0,0)"/>
              </Svg>
            </View>
            <View style={{marginTop:15}} wrap={false}>
              <Heading heading="Parental Information" />
              <Row heading="Father Name" data={data.fname} />
              <Row heading="Father Mobile" data={data.fphone} />
              <Row heading="Father Email" data={data.femail} />
              <Row heading="Father Occupation" data={data.fprofession} />
              <Row heading="Mother Name" data={data.mname} />
              <Row heading="Mother Mobile" data={data.mphone} />
              <Row heading="Mother Email" data={data.memail} />
              <Row heading="Mother Occupation" data={data.mprofession} />
              <Svg style={{marginTop:15}} height="10" width="580">
                <Line x1="0" y1="0" x2="560" y2="0" strokeWidth={1} stroke="rgb(0,0,0)"/>
              </Svg>
            </View>
            <View style={{marginTop:35}} wrap={false}>
              {/* <Svg height="10" width="580">
                <Line x1="0" y1="0" x2="560" y2="0" strokeWidth={1} stroke="rgb(0,0,0)"/>
              </Svg> */}
              <Heading heading="Educational Information" />
              <SubHeading heading="Current Details" />
              <Row heading="Institute" data={data.educationalInfo[0].insName} />
              <Row heading="Degree" data={data.educationalInfo[0].degree} />
              <Row heading="Year" data={data.educationalInfo[0].year} />
              <Row heading="Branch" data={data.educationalInfo[0].branch} />
              <Row heading="Division" data={data.educationalInfo[0].division} />
              <Row heading="Batch" data={data.educationalInfo[0].batch} />
              <Row heading="CGPA" data={data.educationalInfo[0].score} />
              <Row heading="Passing Year" data={data.educationalInfo[0].passingYear} />
              <SubHeading heading="Junior College / XIIth" />
              <Row heading="Institute" data={data.educationalInfo[1].insName} />
              <Row heading="Board" data={data.educationalInfo[1].degree} />
              <Row heading="Score" data={data.educationalInfo[1].score} />
              <Row heading="Passing Year" data={data.educationalInfo[1].passingYear} />
              <SubHeading heading="School / Xth" />
              <Row heading="Institute" data={data.educationalInfo[2].insName} />
              <Row heading="Board" data={data.educationalInfo[2].degree} />
              <Row heading="Score" data={data.educationalInfo[2].score} />
              <Row heading="Passing Year" data={data.educationalInfo[2].passingYear} />
              <Svg style={{marginTop:15}} height="10" width="580">
                <Line x1="0" y1="0" x2="560" y2="0" strokeWidth={1} stroke="rgb(0,0,0)"/>
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
          <Fab color="primary" aria-label="add">
            <DownloadIcon />
          </Fab>
        </div>
        <PDFViewer
          style={{
            width: "100%",
            height: "100vh",
          }}
        >
          <ProfilePdf data={data} />
        </PDFViewer>
        {/* <div className="flex justify-between items-center text-xl font-semibold border-b-2 border-gray-300 pb-3">
          <p>Personal Information</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Name</p>
              <p className="font-semibold">Uid</p>
              <p className="font-semibold">Email</p>
              <p className="font-semibold">Batch</p>
              <p className="font-semibold">CGPA</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>{data.name}</p>
              <p>{data.uid}</p>
              <p>{data.emailID}</p>
              <p>{data.batch}</p>
              <p>{data.cgpa}</p>
            </div>
          </div>
        </div> */}
      </div>
    );
}

export default ProfileDownload

export async function loader({ params }) {
    console.log(params.uid)
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
        console.log("Something went wrong, please try again later");
    }
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
    }
}