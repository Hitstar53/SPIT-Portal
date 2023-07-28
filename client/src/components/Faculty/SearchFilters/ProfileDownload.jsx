import React, { useRef, useEffect } from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image, PDFDownloadLink, Font } from '@react-pdf/renderer';
import dayjs from "dayjs";
import { useLoaderData, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import ServerUrl from '../../../constants'
import styles from "./FilterLayout.module.css";
import Fab from '@mui/material/Fab';
import DownloadIcon from '@mui/icons-material/Download';

Font.register({ family: 'Poppins', src: "https://fonts.googleapis.com/css?family=Poppins" });

const ProfilePdf = ({data}) => {
    const styles = StyleSheet.create({
      page: {
        flexDirection: "row",
      },
      section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
      },
      title: {
        fontSize: 24,
        fontFamily: "Helvetica-Bold",
        textAlign: "center",
        marginBottom: 10,
      },
      heading: {
        fontSize: 14,
        fontFamily: "Helvetica-Bold",
        textAlign: "left",
        marginTop: 10,
        marginBottom: 10,
      },
      subHeading: {
        fontSize: 12,
        fontFamily: "Helvetica-Bold",
        textAlign: "left",
        marginTop: 25,
        marginBottom: 5,
      },
      text: {
        fontSize: 12,
        textAlign: "left",
        marginTop: 5,
        marginBottom: 5,
      },
      row: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
      },
      column: {
        width: "50%",
        flexDirection: "column",
        flexGrow: 1,
        marginLeft: 10,
        marginRight: 10,
      },
    });
    
    return (
      <Document>
        <Page size="A4" style={styles.page} wrap>
          <View style={styles.section}>
            <Text style={styles.title}>Student Profile</Text>
            <View style={styles.row} wrap={false}>
              <View style={styles.column}>
                <Text style={styles.heading}>Personal Information</Text>
                <Text style={styles.text}>Name</Text>
                <Text style={styles.text}>Uid</Text>
                <Text style={styles.text}>Email</Text>
                <Text style={styles.text}>Mobile No.</Text>
                <Text style={styles.text}>Date of Birth</Text>
                <Text style={styles.text}>Address</Text>
                <Text style={styles.text}>Gender</Text>
                <Text style={styles.text}>Blood Group</Text>
                <Text style={styles.text}>Religion</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.heading}>&nbsp;</Text>
                <Text style={styles.text}>{data.name}</Text>
                <Text style={styles.text}>{data.uid}</Text>
                <Text style={styles.text}>{data.emailID}</Text>
                <Text style={styles.text}>{data.phone}</Text>
                <Text style={styles.text}>
                  {dayjs(data.dob).format("DD/MM/YYYY")}
                </Text>
                <Text style={styles.text}>{data.address}</Text>
                <Text style={styles.text}>{data.gender}</Text>
                <Text style={styles.text}>{data.blood}</Text>
                <Text style={styles.text}>{data.religion}</Text>
              </View>
            </View>
            <View style={styles.row} wrap={false}>
              <View style={styles.column}>
                <Text style={styles.heading}>Parental Information</Text>
                <Text style={styles.text}>Father Name</Text>
                <Text style={styles.text}>Father Mobile</Text>
                <Text style={styles.text}>Father Email</Text>
                <Text style={styles.text}>Father Occupation</Text>
                <Text style={styles.text}>Mother Name</Text>
                <Text style={styles.text}>Mother Mobile</Text>
                <Text style={styles.text}>Mother Email</Text>
                <Text style={styles.text}>Mother Occupation</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.heading}>&nbsp;</Text>
                <Text style={styles.text}>{data.fname}</Text>
                <Text style={styles.text}>{data.fphone}</Text>
                <Text style={styles.text}>{data.femail}</Text>
                <Text style={styles.text}>{data.fprofession}</Text>
                <Text style={styles.text}>{data.mname}</Text>
                <Text style={styles.text}>{data.mphone}</Text>
                <Text style={styles.text}>{data.memail}</Text>
                <Text style={styles.text}>{data.mprofession}</Text>
              </View>
            </View>
            <View style={styles.row} wrap={false}>
              <View style={styles.column}>
                <Text style={styles.heading}>Educational Information</Text>
                <Text style={styles.subHeading}>Current Details</Text>
                <Text style={styles.text}>Institute</Text>
                <Text style={styles.text}>Degree</Text>
                <Text style={styles.text}>Year</Text>
                <Text style={styles.text}>Branch</Text>
                <Text style={styles.text}>Division</Text>
                <Text style={styles.text}>Batch</Text>
                <Text style={styles.text}>CGPA</Text>
                <Text style={styles.text}>Passing Year</Text>
                <Text style={styles.subHeading}>Junior College / XIIth</Text>
                <Text style={styles.text}>Institute</Text>
                <Text style={styles.text}>Board</Text>
                <Text style={styles.text}>Score</Text>
                <Text style={styles.text}>Passing Year</Text>
                <Text style={styles.subHeading}>School / Xth</Text>
                <Text style={styles.text}>Institute</Text>
                <Text style={styles.text}>Board</Text>
                <Text style={styles.text}>Score</Text>
                <Text style={styles.text}>Passing Year</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.heading}>&nbsp;</Text>
                <Text style={styles.subHeading}>&nbsp;</Text>
                <Text style={styles.text}>{data.educationalInfo[0].insName}</Text>
                <Text style={styles.text}>{data.educationalInfo[0].degree}</Text>
                <Text style={styles.text}>{data.educationalInfo[0].year}</Text>
                <Text style={styles.text}>{data.educationalInfo[0].branch}</Text>
                <Text style={styles.text}>{data.educationalInfo[0].division}</Text>
                <Text style={styles.text}>{data.educationalInfo[0].batch}</Text>
                <Text style={styles.text}>{data.educationalInfo[0].score}</Text>
                <Text style={styles.text}>{data.educationalInfo[0].passingYear}</Text>
                <Text style={styles.subHeading}>&nbsp;</Text>
                <Text style={styles.text}>{data.educationalInfo[1].insName}</Text>
                <Text style={styles.text}>{data.educationalInfo[1].degree}</Text>
                <Text style={styles.text}>{data.educationalInfo[1].score}</Text>
                <Text style={styles.text}>{data.educationalInfo[1].passingYear}</Text>
                <Text style={styles.subHeading}>&nbsp;</Text>
                <Text style={styles.text}>{data.educationalInfo[2].insName}</Text>
                <Text style={styles.text}>{data.educationalInfo[2].degree}</Text>
                <Text style={styles.text}>{data.educationalInfo[2].score}</Text>
                <Text style={styles.text}>{data.educationalInfo[2].passingYear}</Text>
              </View>
            </View>
            <View style={styles.row} wrap={false}>
              <View style={styles.column}>
                <Text style={styles.heading}>Academic Information</Text>
                <Text style={styles.text}>Name</Text>
                <Text style={styles.text}>Uid</Text>
                <Text style={styles.text}>Email</Text>
                <Text style={styles.text}>Batch</Text>
                <Text style={styles.text}>CGPA</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.heading}>&nbsp;</Text>
                <Text style={styles.text}>{data.name}</Text>
                <Text style={styles.text}>{data.uid}</Text>
                <Text style={styles.text}>{data.emailID}</Text>
                <Text style={styles.text}>{data.batch}</Text>
                <Text style={styles.text}>{data.cgpa}</Text>
              </View>
            </View>
            <View style={styles.row} wrap={false}>
              <View style={styles.column}>
                <Text style={styles.heading}>Extra Curricular Information</Text>
                <Text style={styles.text}>Name</Text>
                <Text style={styles.text}>Uid</Text>
                <Text style={styles.text}>Email</Text>
                <Text style={styles.text}>Batch</Text>
                <Text style={styles.text}>CGPA</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.heading}>&nbsp;</Text>
                <Text style={styles.text}>{data.name}</Text>
                <Text style={styles.text}>{data.uid}</Text>
                <Text style={styles.text}>{data.emailID}</Text>
                <Text style={styles.text}>{data.batch}</Text>
                <Text style={styles.text}>{data.cgpa}</Text>
              </View>
            </View>
            <View style={styles.row} wrap={false}>
              <View style={styles.column}>
                <Text style={styles.heading}>Professional Information</Text>
                <Text style={styles.text}>Name</Text>
                <Text style={styles.text}>Uid</Text>
                <Text style={styles.text}>Email</Text>
                <Text style={styles.text}>Batch</Text>
                <Text style={styles.text}>CGPA</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.heading}>&nbsp;</Text>
                <Text style={styles.text}>{data.name}</Text>
                <Text style={styles.text}>{data.uid}</Text>
                <Text style={styles.text}>{data.emailID}</Text>
                <Text style={styles.text}>{data.batch}</Text>
                <Text style={styles.text}>{data.cgpa}</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );
}

const ProfileDownload = () => {
    const data = useLoaderData()
    const navigate = useNavigate()
    const container = styles.container + " flex flex-col gap-8 p-8";
    return (
      <div className={container}>
        {/* Make a grid table of 2 columns using tailwind, first column has property name of data object and second column will have the value */}
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