import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from '../pages/MainPage';
import DashboardPage from '../pages/DashboardPage';
import LecturePage from '../pages/LecturePage';
import LoginPage from '../pages/LoginPage';
import Header from '../components/header/Header';
import InsertData from '../util/img/data/insertData';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/lecture' element={<LecturePage />} />
        <Route path='/lecture:id' element={<LecturePage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/dashboard:id' element={<DashboardPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/data' element={<InsertData />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
