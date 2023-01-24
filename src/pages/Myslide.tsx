import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import './Myslide.css';
import catbanner from '../util/img/IMG_0790.jpg'
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
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
      autoplay={{ delay: 1000 }}
      loop={true}
    >
      <SwiperSlide className='slide'><img src={catbanner}/></SwiperSlide>
      <SwiperSlide className='slide'><img src={catbanner}/></SwiperSlide>
      <SwiperSlide className='slide'><img src={catbanner}/></SwiperSlide>
      <SwiperSlide className='slide'><img src={catbanner}/></SwiperSlide>
    </Swiper>
  );
};
export default Slide;
