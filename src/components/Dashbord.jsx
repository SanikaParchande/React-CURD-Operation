import { useState } from 'react';
import './Style.css';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [selected, setSelected] = useState('add'); 
  const navigate = useNavigate();

  const handleAddClick = () => {
    setSelected('add');
    navigate('addstudent'); 
  };

  const handleViewClick = () => {
    setSelected('view');
    navigate('viewstudent'); 
  };

  return (
    <div className="dashboard-container">

      <div className="menu">
        <button
          className={selected === 'add' ? 'active' : ''}
          onClick={handleAddClick}
        >
          Add Student
        </button>

        <button
          className={selected === 'view' ? 'active' : ''}
          onClick={handleViewClick}
        >
          View Student
        </button>
      </div>

      <div className="outlet-container">
        <Outlet /> 
      </div>
    </div>
  );
}