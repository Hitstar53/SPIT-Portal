import { useForm } from "react-hook-form";
import "../styles/ProfileForm.css";
import { useEffect,useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, redirect } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProfileForm() {
  const [redirect,setRedirect]=useState(false)
  const {user,setUser}=useContext(UserContext)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues:{
      fullName:user.fullName,
      designation:user.designation,
      department:user.department,
      id:user.id,
      dateOfBirth:user.dateOfBirth,
      dateOfJoining:user.dateOfJoining,
      gender:user.gender,
      bloodGroup:user.bloodGroup,
      type:user.type,
      email:user.email,
      mobileNumber:user.mobileNumber,
      address:user.address,
      gitHubProfile:user.gitHubProfile,
      linkedinProfile:user.linkedinProfile,
      qualification:user.qualification,
      specialization:user.specialization,
      classIncharge:user.classIncharge,
      aadharCardNumber:user.aadharCardNumber,
      panCardNumber:user.panCardNumber
    }
  });
  const onSubmit = (data) => {
    console.log("data to be submitted",data);
    fetch(`http://localhost:5000/api/faculty/update`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(data=>setUser(data))
    .then(setRedirect(true))
    .then(toast.success('Profile Updated Successfully', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      }))
  }

  if(redirect) return <Navigate to="/profile" />

  // useEffect(() => {
    // fetch(`http://localhost:5000/api/faculty/get`,{

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <>
      <h1 className="profile-heading">Edit Profile</h1>
      <div className="profile-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="section-form">
            <h1>Indentity</h1>
            <div className="section-data">
              <div className="input-box">
                <label>
                  Full Name:
                  <input {...register("fullName")} />
                </label>
              </div>

              <div className="input-box">
                <label>
                  Designation:
                  <input {...register("designation")} />
                </label>
              </div>

              <div className="input-box">
                <label>
                  Department:
                  <input {...register("department")} />
                </label>
              </div>

              <div className="input-box">
                <label>
                  ID:
                  <input {...register("id")} />
                </label>
              </div>
            </div>
          </div>
          <div className="section-form">
            <h1>Personal</h1>
            <div className="section-data">
              <div className="input-box">
                <label>
                  Date of Birth:
                  <input {...register("dateOfBirth")} />
                </label>
              </div>

              <div className="input-box">
                <label>
                  Date of Joining:
                  <input {...register("dateOfJoining")} />
                </label>
              </div>

              <div className="input-box">
                <label>
                  Gender:
                  <input {...register("gender")} />
                </label>
              </div>

              <div className="input-box">
                <label>
                  Blood Group:
                  <input {...register("bloodGroup")} />
                </label>
              </div>

              <div className="input-box">
                <label>
                  Type:
                  <input {...register("type")} />
                </label>
              </div>
            </div>
          </div>
          <div className="section-form">
            <h1>Contacts</h1>
            <div className="section-data">
              <div className="input-box">
                <label>
                  Email:
                  <input disabled {...register("email")} />
                </label>
              </div>

              <div className="input-box">
                <label>
                  Mobile Number:
                  <input {...register("mobileNumber")} />
                </label>
              </div>

              <div className="input-box">
                <label>
                  Address:
                  <input {...register("address")} />
                </label>
              </div>

              <div className="input-box">
                <label>
                  GitHub Profile:
                  <input {...register("gitHubProfile")} />
                </label>
              </div>

              <div className="input-box">
                <label>
                  LinkedIn Profile:
                  <input {...register("linkedinProfile")} />
                </label>
              </div>
            </div>
          </div>
          <div className="section-form">
            <h1>Academics</h1>
            <div className="section-data">
              <div className="input-box">
                <label>
                  Qualification:
                  <input {...register("qualification")} />
                </label>
              </div>

              <div className="input-box">
                <label>
                  Specialization:
                  <input {...register("specialization[0]")} />
                </label>
              </div>

              <div className="input-box">
                <label>
                  Class Incharge:
                  <input {...register("classIncharge")} />
                </label>
              </div>
            </div>
          </div>
          <div className="section-form">
            <h1>Documents</h1>
            <div className="section-data">
              <div className="input-box">
                <label>
                  Aadhar Card Number:
                  <input {...register("aadharCardNumber")} />
                </label>
              </div>

              <div className="input-box">
                <label>
                  PAN Card Number:
                  <input {...register("panCardNumber")} />
                </label>
              </div>
            </div>
          </div>
          <div className="btn-div">
            <input type="submit" className="profile-submit"/>
          </div>
        </form>
      </div>
    </>
  );
}
