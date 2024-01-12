import CinematicVideo from "../../../assets/vid/cinematic.mp4";
import "./slideShow.css";

const SlideShow = () => {
  return (
    <div className="relative">
      <video
        autoPlay
        loop
        muted
        controls={false}
        className="w-full h-screen object-cover brightness-50"
      >
        <source src={CinematicVideo} type="video/mp4" />
      </video>
      <div className="flex flex-col gap-2 text-white absolute top-1/2  w-full text-center">
        <h1 className="text-6xl tracking-wide font-bold ">
          Tours and Trek Packages in Nepal
        </h1>
        <p className="text-xl">Choose your next adventure in Nepal with us.</p>
      </div>
    </div>
  );
};

export default SlideShow;
