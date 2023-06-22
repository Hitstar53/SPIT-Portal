import { useForm } from "react-hook-form";

export default function ProfileForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Full Name:</label>
      <input {...register("fullName")} />

      <label>Designation:</label>
      <input {...register("designation")} />

      <label>Department:</label>
      <input {...register("department")} />

      <label>ID:</label>
      <input {...register("id")} />

      <label>Date of Birth:</label>
      <input {...register("dateOfBirth")} />

      <label>Date of Joining:</label>
      <input {...register("dateOfJoining")} />

      <label>Gender:</label>
      <input {...register("gender")} />

      <label>Blood Group:</label>
      <input {...register("bloodGroup")} />

      <label>Type:</label>
      <input {...register("type")} />

      <label>Email:</label>
      <input {...register("email")} />

      <label>Mobile Number:</label>
      <input {...register("mobileNumber")} />

      <label>Address:</label>
      <input {...register("address")} />

      <label>GitHub Profile:</label>
      <input {...register("gitHubProfile")} />

      <label>LinkedIn Profile:</label>
      <input {...register("linkedinProfile")} />

      <label>Qualification:</label>
      <input {...register("qualification")} />

      <label>Specialization:</label>
      <input {...register("specialization[0]")} />

      <label>Class Incharge:</label>
      <input {...register("classIncharge")} />

      <label>Aadhar Card Number:</label>
      <input {...register("aadharCardNumber")} />

      <label>PAN Card Number:</label>
      <input {...register("panCardNumber")} />

      <input type="submit" />
    </form>
  );
}
