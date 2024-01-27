/* eslint-disable react/no-unescaped-entities */
import { Image } from "@chakra-ui/react";
import Plane from "../../assets/img/plane_gif.gif";

const AboutUs = () => {
  return (
    <div className="mt-36 min-h-screen mx-auto max-w-7xl flex flex-col gap-x-8">
      <Image
        src={Plane}
        alt="plane"
        maxW={"sm"}
        maxH={"sm"}
        rotate={"90"}
        className="mx-auto"
        justifyContent={"center"}
        display={"flex"}
      />
      <p className="tracking-widest font-medium">
        Tripo is an innovative platform designed to assist travelers in
        selecting their destinations with comprehensive guidance. This
        user-friendly tool not only recommends places but also provides
        essential details such as estimated budget, duration of stay,
        predominant languages spoken, and more. Additionally, Tripo incorporates
        valuable features like real-time traveler reviews, enabling users to
        make informed decisions based on authentic experiences before embarking
        on their journeys. Explore the world confidently with Tripo's enhanced
        functionalities and traveler insights.
      </p>
    </div>
  );
};

export default AboutUs;
