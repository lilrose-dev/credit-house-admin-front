import { Routes, Route } from 'react-router-dom';
import Bank from './pages/bank/bank'
import Dashboard from './pages/dashboard/dashboard';
import Company from './pages/company/company';
import Complex from './pages/complex/complex';
import Room from './pages/room/room';
import Menu from './pages/menu';

import './App.css';

function App() {
  return (
   <>
   <div className='container'>
    <Menu/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/bank' element={<Bank/>}/>
        <Route path='/company' element={<Company/>}/>
        <Route path='/complex' element={<Complex/>}/>
        <Route path='/room' element={<Room/>}/>
      </Routes>
   </div>
   </>
  );
}
export default App;
