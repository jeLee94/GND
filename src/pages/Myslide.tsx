import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "./Myslide.css";
import { on } from "events";
import reactnativebanner from "../util/img/reactnativethumbnail.png";
import reactbanner from "../util/img/react1.png";
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
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      // autoplay={{ delay: 1000 }}
      loop={true}
    >
      <SwiperSlide className="slide">
        <a href="http://localhost:3000/lecture/scZI19SE0_4">
          <img width={2000} src={reactnativebanner} />
        </a>
      </SwiperSlide>
      <SwiperSlide className="slide">
        <a href="http://localhost:3000/lecture/Qb8Oiy8i9IY">
          <img width={1000} height={500} src={reactbanner} />
        </a>
      </SwiperSlide>
      <SwiperSlide className="slide">Slide 3</SwiperSlide>
      <SwiperSlide className="slide">Slide 4</SwiperSlide>
    </Swiper>
  );
};
export default Slide;
