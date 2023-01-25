import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import './Myslide.css';
import styled from 'styled-components';
import React from 'react';

const Slide = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Autoplay]}
      pagination={{ clickable: true }}
      navigation
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 3000 }}
      loop={true}
    >
      <SlideBanner className='slide'>
        <a href='http://localhost:3000/lecture/8YIwaO6Cojw'>
          <img src='banner_01.png' alt='slide banner' />
        </a>
      </SlideBanner>
      <SwiperSlide className='slide'>
        <a href='http://localhost:3000/lecture/NcI-WJSWdv8'>
          <img src='banner_02.png' alt='slide banner' />
        </a>
      </SwiperSlide>
      <SwiperSlide className='slide'>
        <a href='http://localhost:3000/lecture/2AMRTAFSh98'>
          <img src='banner_03.png' alt='slide banner' />
        </a>
      </SwiperSlide>
      <SwiperSlide className='slide'>
        <a href='http://localhost:3000/lecture/xkpcNolC270'>
          <img src='banner_04.png' alt='slide banner' />
        </a>
      </SwiperSlide>
      <SwiperSlide className='slide'>
        <a href='http://localhost:3000/lecture/4_WLS9Lj6n4'>
          <img src='banner_05.png' alt='slide banner' />
        </a>
      </SwiperSlide>
    </Swiper>
  );
};
export default Slide;

const SlideBanner = styled(SwiperSlide)``;
