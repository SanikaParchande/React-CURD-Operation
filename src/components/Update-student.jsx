import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import './Style.css';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function UpdateStudent() {
  const { updateObj } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();
  const {register, handleSubmit, reset, formState: { errors }} = useForm();


useEffect(() => {
    if (updateObj) {
      try {
        const user = JSON.parse(decodeURIComponent(updateObj));
        setStudent(user);
        reset(user);
      } catch (error) {
        console.error('Error parsing student data:', error);
        toast.error('Error loading student data');
        navigate('/dashboard/viewstudent');
      }
    }
  }, [updateObj, reset, navigate]);

  const onUpdateFormSubmit = async (data) => {
    const toastId = toast.loading("Updating student...");
    try {
      const res = await axios.put(`http://localhost:5308/Student/update/${student._id}`, data);
      const resData = res.data;
      
      if (resData.status) {
        toast.success('Student updated successfully', { id: toastId });
        navigate('/dashboard/viewstudent');
      } else {
        toast.error(resData.message, { id: toastId });
      }
    } catch (err) {
      toast.error('Error updating student', { id: toastId });
      console.error(err);
    }
  };



  if (!student) {
    return (
      <div className="user-form">
        <div className="title">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="user-form">
        <div className="title">
          <h2>Update Student</h2>
        </div>
        <form onSubmit={handleSubmit(onUpdateFormSubmit)}>
        <div className="input-group">
          <div className="input-field">
            <label>First Name</label>
            <input 
              {...register("firstName", { required: "First Name is required" })} 
              type="text" 
              defaultValue={student?.firstName || ""}
            />
            {errors.firstName && <p className="error">{errors.firstName.message}</p>}
          </div>

          <div className="input-field">
            <label>Middle Name (Optional)</label>
            <input 
              {...register("middleName")} 
              type="text" 
              defaultValue={student?.middleName || ""}
            />
          </div>

          <div className="input-field">
            <label>Last Name</label>
            <input 
              {...register("lastName", { required: "Last Name is required" })} 
              type="text" 
              defaultValue={student?.lastName || ""}
            />
            {errors.lastName && <p className="error">{errors.lastName.message}</p>}
          </div>

          <div className="input-field">
            <label>Gender</label>
            <select {...register("gender", { required: "Gender is required" })} defaultValue={student?.gender || ""}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="error">{errors.gender.message}</p>}
          </div>

          <div className="input-field">
            <label>Department</label>
            <select {...register("department", { required: "Department is required" })} defaultValue={student?.department || ""}>
              <option value="">Select Department</option>
              <option value="CSE">CSE</option>
              <option value="ENTC">ENTC</option>
              <option value="Civil">Civil</option>
              <option value="Mech">Mech</option>
              <option value="EE">EE</option>
            </select>
            {errors.department && <p className="error">{errors.department.message}</p>}
          </div>

          <div className="input-field">
            <label>Email Address</label>
            <input 
              {...register("emailAddress", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })} 
              type="email" 
              defaultValue={student?.emailAddress || ""}
            />
            {errors.emailAddress && <p className="error">{errors.emailAddress.message}</p>}
          </div>

          <div className="input-field">
            <label>Mobile No</label>
            <input 
              {...register("mobileNo", { 
                required: "Mobile No is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Mobile number must be 10 digits"
                }
              })} 
              type="tel" 
              maxLength="10"
              defaultValue={student?.mobileNo || ""}
            />
            {errors.mobileNo && <p className="error">{errors.mobileNo.message}</p>}
          </div>
        </div>

        <div className="action-group">
          <button type="submit" className="btn-update">Update Student</button>
          <button type="button" onClick={() => navigate('/dashboard/viewstudent')} className="btn-cancel">Cancel</button>
        </div>
        </form>
      </div>
    </>
  );
}