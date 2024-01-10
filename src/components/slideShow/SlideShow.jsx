import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import BG1 from "../../assets/img/mount.webp";
import BG2 from "../../assets/img/mountain.jpg";
import "./slideShow.css";

const images = [
  {
    src: BG1,
    name: "slide1",
  },
  {
    src: BG2,
    name: "slide2",
  },
];

const SlideShow = () => {
  return (
    <Slide
      arrows={false}
      autoplay
      duration={2000}
      indicators
      transitionDuration={600}
    >
      {images.map((img, idx) => (
        <div key={idx} className="each-slide-effect">
          <div style={{ backgroundImage: `url(${img.src})` }}>
            <span>{img.name}</span>
          </div>
        </div>
      ))}
    </Slide>
  );
};

export default SlideShow;
