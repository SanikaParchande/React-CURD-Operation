import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Style.css';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function AddStudent() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5308/Student/get");
      if (res.data.status) {
        setStudents(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchStudents();
  }, []);

  const onSubmit = async (data) => {
    toast.loading('Adding student...', { id: 'toaster' });
    try {
      const res = await axios.post("http://localhost:5308/Student/add", data);
      const resData = res.data;

      if (resData.status) {
        toast.success(resData.message, { id: 'toaster' });
        reset();
        fetchStudents(); 
      } else {
        toast.error(resData.message, { id: 'toaster' });
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong', { id: 'toaster' });
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="title">
        <h2>Add Student</h2>
      </div>

      <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <div className="input-field">
            <label>First Name</label>
            <input {...register('firstName', { required: "First Name is required" })} type="text" />
            {errors.firstName && <p className="error">{errors.firstName.message}</p>}
          </div>

          <div className="input-field">
            <label>Middle Name (Optional)</label>
            <input {...register('middleName')} type="text" />
          </div>

          <div className="input-field">
            <label>Last Name</label>
            <input {...register('lastName', { required: "Last Name is required" })} type="text" />
            {errors.lastName && <p className="error">{errors.lastName.message}</p>}
          </div>

          <div className="input-field">
            <label>Gender</label>
            <select {...register('gender', { required: "Gender is required" })}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="error">{errors.gender.message}</p>}
          </div>

          <div className="input-field">
            <label>Department</label>
            <select {...register('department', { required: "Department is required" })}>
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
            <input {...register('emailAddress', { required: "Email is required" })} type="email" />
            {errors.emailAddress && <p className="error">{errors.emailAddress.message}</p>}
          </div>

          <div className="input-field">
            <label>Mobile No</label>
            <input {...register('mobileNo', { required: "Mobile No is required" })} type="number" />
            {errors.mobileNo && <p className="error">{errors.mobileNo.message}</p>}
          </div>
        </div>

        <div className="action-group">
          <button type="submit">Add Student</button>
          <button type="reset" onClick={() => reset()}>Cancel</button>
        </div>
      </form>
    </>
  );
}