import React, { useState } from 'react'
import CustTable from '../../UI/CustTable'
import Search from './Search'
import Filter from './Filter'
import ServerUrl from '../../../constants'
import styles from './FilterLayout.module.css'

const rows = [
  {
    uid: 2021300108,
    studentname: "Hatim Sawai",
    email: "hatim.sawai@spit.ac.in",
    Organization: "JP Morgan",
    ctc: "10.5",
    type: "placement",
  },
  {
    uid: 2021300109,
    studentname: "Kaif Sayyed",
    email: "kaif.sayyed@spit.ac.in",
    Organization: "Barclays",
    ctc: "12.5",
    type: "placement",
  },
]

const filters = [
  {
    id: "organization",
    label: "Organization",
  },
  {
    id: "ctc",
    label: "C.T.C.",
  },
]

const options = [
  {
    name: "All",
    value: "All",
  },
  {
    name: "Internship",
    value: "Internship",
  },
  {
    name: "Placement",
    value: "Placement",
  }
]

const headCells = [
  {
    id: "uid",
    numeric: true,
    label: "UID",
  },
  {
    id: "studentname",
    numeric: false,
    label: "Student Name",
  },
  {
    id: "email",
    numeric: false,
    label: "Email",
  },
  {
    id: "Organization",
    numeric: false,
    label: "Organization",
  },
  {
    id: "ctc",
    numeric: true,
    label: "CTC (LPA)",
  },
];

const SearchFilters = (data,filterData) => {
  if (filterData.type === "All") {
    if (filterData.organization && filterData.ctc) {
      console.log(data);
      const rowData = data.students.map((student, index) => ({
        uid: student.uid,
        studentname: student.name,
        email: student.emailID,
        Organization: filterData.organization,
        ctc: filterData.ctc,
        type: "placement",
      }));
      return rowData;
    } else if (filterData.organization) {
      console.log(data);
      const rowData = data.students.map((student, index) => ({
        uid: student.uid,
        studentname: student.name,
        email: student.emailID,
        Organization: filterData.organization,
        ctc: data.placementEmails[index].ctc,
        type: "placement",
      }));
      return rowData;
    } else if (filterData.ctc) {
      console.log(data);
      const rowData = data.students.map((student, index) => ({
        uid: student.uid,
        studentname: student.name,
        email: student.emailID,
        Organization: data.placementEmails[index].companyName,
        ctc: filterData.ctc,
        type: "placement",
      }));
      return rowData;
    } else {
      console.log(data);
      const rowData = data.students.map((student, index) => ({
        email: student.emailID,
        uid: student.uid,
        studentname: student.name,
        Organization: data.placementEmails[index].companyName,
        ctc: data.placementEmails[index].ctc,
        type: "placement",
      }));
      return rowData;
    }
  }
  else if (filterData.type === "Placement") {
    if (filterData.organization && filterData.ctc) {
      const rowData = data.map((student, index) => ({
        uid: student.uid,
        studentname: student.name,
        email: student.emailID,
        Organization: filterData.organization,
        ctc: filterData.ctc,
        type: "placement",
      }));
      return rowData;
    } else if (filterData.organization) {
      const rowData = data.students.map((student, index) => ({
        uid: student.uid,
        studentname: student.name,
        email: student.emailID,
        Organization: filterData.organization,
        ctc: data.placementEmails[index].ctc,
        type: "placement",
      }));
      return rowData;
    } else if (filterData.ctc) {
      const rowData = data.students.map((student, index) => ({
        uid: student.uid,
        studentname: student.name,
        email: student.emailID,
        Organization: data.placementEmails[index].companyName,
        ctc: filterData.ctc,
        type: "placement",
      }));
      return rowData;
    } else {
      const rowData = data.students.map((student, index) => ({
        email: student.emailID,
        uid: student.uid,
        studentname: student.name,
        Organization: data.placementEmails[index].companyName,
        ctc: data.placementEmails[index].ctc,
        type: "placement",
      }));
      return rowData;
    }
  } else if (filterData.type === "Internship") {
    if (filterData.organization) {
      const rowData = data.map((student, index) => ({
        uid: student.uid,
        studentname: student.name,
        email: student.emailID,
        Organization: filterData.organization,
        ctc: "-",
        type: "internship",
      }));
      return rowData;
    } else {
      const rowData = data.map((student, index) => ({
        uid: student.uid,
        studentname: student.name,
        email: student.emailID,
        Organization: student.internship.map(({organization}) => organization).join(", "),
        ctc: "-",
        type: "internship",
      }));
      return rowData;
    }
  }
}


const Professional = () => {
  const container = styles.container + " flex flex-col gap-8 p-8";
  const [newRows, setNewRows] = useState([]);
  const [newFilters, setNewFilters] = useState(filters);
  const onSearchSubmit = (data) => {
    console.log(data);
    setNewFilters(filters);
  }
  const onFilterSubmit = (filterData) => {
    console.log(filterData);
    setNewFilters(filters);
    const setProfessional = async () => {
      const response = await fetch(
        `${ServerUrl}/api/faculty/getProfessionalInfo`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: filterData.type,
            organization: filterData.organization,
            ctc: filterData.ctc,
          }),
        }
      );
      if (!response.ok) {
        console.log("Something went wrong, please try again later");
      }
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setNewRows(SearchFilters(data,filterData));
      }
    }
    setProfessional();  
  }
  return (
    <div className={container}>
      <div className="flex justify-between items-center text-4xl font-semibold">
        <p>Professional Student Search</p>
        <Search
          onSubmit={onSearchSubmit}
        />
      </div>
      <Filter
        options={options}
        filters={filters}
        onSubmit={onFilterSubmit}
      />
      <div className="mt-6">
        <CustTable rows={newRows} headCells={headCells} />
      </div>
    </div>
  );
}

export default Professional