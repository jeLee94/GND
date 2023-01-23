import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import './Myslide.css';
import { on } from 'events';
// import styled from 'styled-components';

const Slide = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Autoplay]}
      pagination={{ clickable: true }}
      navigation
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      // autoplay={{ delay: 1000 }}
      loop={true}
    >
      <SwiperSlide className='slide'>Slide 1</SwiperSlide>
      <SwiperSlide className='slide'>Slide 2</SwiperSlide>
      <SwiperSlide className='slide'>Slide 3</SwiperSlide>
      <SwiperSlide className='slide'>Slide 4</SwiperSlide>
    </Swiper>
  );
};
export default Slide;
