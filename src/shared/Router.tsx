import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from '../pages/MainPage';
import DashboardPage from '../pages/DashboardPage';
import LecturePage from '../pages/LecturePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Header from '../components/header/Header';
import InsertData from '../util/data/insertData';
import SearchPage from '../pages/SearchPage';
import TopButton from '../components/button/topScrollButton';

const Router = () => {
  return (
    <BrowserRouter>
      <TopButton />
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/lecture' element={<LecturePage />} />
        <Route path='/lecture/:id' element={<LecturePage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/dashboard/:id' element={<DashboardPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/data' element={<InsertData />} />
        <Route path='/search' element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
