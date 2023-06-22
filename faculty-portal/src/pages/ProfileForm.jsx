import { useForm } from "react-hook-form";

export default function ProfileForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name:</label>
      <input {...register("firstName")} />

      <label>Middle Name:</label>
      <input {...register("middleName")} />

      <label>Last Name:</label>
      <input {...register("lastName")} />

      <label>Email:</label>
      <input {...register("email")} />

      <label>Mobile Number:</label>
      <input {...register("mobileNumber")} />

      <label>ID:</label>
      <input {...register("id")} />

      <label>Date of Birth:</label>
      <input {...register("dateOfBirth")} />

      <label>Blood Group:</label>
      <input {...register("bloodGroup")} />

      <label>Date of Joining:</label>
      <input {...register("dateOfJoining")} />

      <label>Address:</label>
      <input {...register("address")} />

      <label>Type:</label>
      <input {...register("type")} />

      <label>Qualification:</label>
      <input {...register("qualification")} />

      <label>Department:</label>
      <input {...register("department")} />

      <label>Designation:</label>
      <input {...register("designation")} />

      <label>Gender:</label>
      <input {...register("gender")} />

      <label>Specialization:</label>
      <input {...register("specialization[0]")} />

      <label>Class Incharge:</label>
      <input {...register("classIncharge")} />

      <label>Course Name:</label>
      <input {...register("courses[0].courseName")} />

      <label>Course Code:</label>
      <input {...register("courses[0].courseCode")} />

      <label>Enrollment Key:</label>
      <input {...register("courses[0].enrollmentKey")} />

      <label>Course Type:</label>
      <input {...register("courses[0].courseType")} />

      <label>Lecture Type:</label>
      <input {...register("courses[0].lecType")} />

      <label>Class:</label>
      <input {...register("courses[0].class")} />

      <label>Year:</label>
      <input {...register("courses[0].year")} />

      <label>Semester:</label>
      <input {...register("courses[0].semester")} />

      <label>Targeted Lectures:</label>
      <input {...register("courses[0].targetedLectures")} />

      <label>Completed Lectures:</label>
      <input {...register("courses[0].completedLectures")} />

      {/* Timetable Array */}
      <label>Timetable - Start Time:</label>
      <input {...register("courses[0].timetable[0].startTime")} />

      <label>Timetable - End Time:</label>
      <input {...register("courses[0].timetable[0].endTime")} />

      <label>Timetable - Day:</label>
      <input {...register("courses[0].timetable[0].day")} />

      <label>Timetable - Room Number:</label>
      <input {...register("courses[0].timetable[0].roomno")} />

      {/* Lecture Plan Array */}
      <label>Lecture Plan - Lecture Number:</label>
      <input {...register("courses[0].lecPlan[0].lecNumber")} />

      <label>Lecture Plan - Topic:</label>
      <input {...register("courses[0].lecPlan[0].topic")} />

      <label>Lecture Plan - Suggested Reading:</label>
      <input {...register("courses[0].lecPlan[0].suggestedReading")} />

      {/* ISE Plan Array */}
      <label>ISE Plan - ISE Number:</label>
      <input {...register("courses[0].isePlan[0].iseNumber")} />

      <label>ISE Plan - Date:</label>
      <input {...register("courses[0].isePlan[0].date")} />

      <label>ISE Plan - Topic:</label>
      <input {...register("courses[0].isePlan[0].topic")} />

      <label>ISE Plan - Modality:</label>
      <input {...register("courses[0].isePlan[0].modality")} />

      <label>ISE Plan - Marks:</label>
      <input {...register("courses[0].isePlan[0].marks")} />

      <label>ISE Plan - Weightage:</label>
      <input {...register("courses[0].isePlan[0].weightage")} />

      <label>Profile Picture - Data:</label>
      <input {...register("profilePicture.data")} />

      <label>Profile Picture - Content Type:</label>
      <input {...register("profilePicture.contentType")} />

      <label>LinkedIn Profile:</label>
      <input {...register("linkedinProfile")} />

      <label>Aadhar Card Number:</label>
      <input {...register("aadharCardNumber")} />

      <label>PAN Card Number:</label>
      <input {...register("panCardNumber")} />

      <input type="submit" />
    </form>
  );
}
