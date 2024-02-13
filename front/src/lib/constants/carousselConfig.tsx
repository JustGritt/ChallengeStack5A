import CarousselNextArrow from "@/components/Slider/Arrows/CarousselNextSlider";
import CarousselPreviousSlider from "@/components/Slider/Arrows/CarousselPreviousSlider";
import Slider, { Settings } from "react-slick";

export const calendarCarouselSettings: Settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  initialSlide: 0,
  nextArrow: <CarousselNextArrow />,
  prevArrow: <CarousselPreviousSlider />,
  responsive: [
    // {
    //   breakpoint: 1024,
    //   settings: {
    //     slidesToShow: 3,
    //     slidesToScroll: 3,
    //     infinite: true,
    //   },
    // },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const HOURS = ["10:00"];
