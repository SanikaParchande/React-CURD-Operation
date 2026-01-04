

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Dashbord from './components/Dashbord'
import AddStudent from './components/AddStudent'
import ViewStudent from './components/ViewStudent'
import UpdateStudent from './components/Update-student'

function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' Component={Login}></Route>
        <Route path='/register' Component={Register}></Route>
        <Route path='/dashboard' Component={Dashbord}>
           <Route path='addStudent' Component={AddStudent}></Route>
           <Route path='viewStudent' Component={ViewStudent}></Route>
        </Route>
        <Route path='update-student/:updateObj' Component={UpdateStudent}/>
      </Routes>
    </>
  )
}

export default App
