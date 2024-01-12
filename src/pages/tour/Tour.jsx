import {
  Avatar,
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import BannerImg from "../../assets/img/mount.webp";
import {
  Gauge,
  LanguagesIcon,
  MapPin,
  Star,
  TimerIcon,
  UsersRound,
} from "lucide-react";
import PropTypes from "prop-types";
import CreateReviewModal from "../../components/createReviewModal/CreateReviewModal";
import { useSelector } from "react-redux";

const Divider = () => {
  return <hr className="border-gray-200 my-5" />;
};

const DetailCard = ({ Icon, title, value }) => {
  return (
    <div className="flex items-center gap-x-4 my-5">
      <Icon size={46} className="border border-gray-200 p-2 rounded-md" />
      <div className="-space-y-1">
        <h3 className="font-semibold text-orange-400">{title}</h3>
        <p className="text-sm text-gray-500">{value}</p>
      </div>
    </div>
  );
};

const Tour = () => {
  const { tourId } = useParams();
  const user = useSelector((state) => state.user.user);

  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log("user", user);

  return (
    <>
      {/* Review Modal */}
      <CreateReviewModal isOpen={isOpen} onClose={onClose} tourId={tourId} />

      <div className=" mt-36 max-w-7xl mx-auto space-y-2">
        <h1 className="text-2xl text-orange-500 font-bold">
          Everest Base Camp Gokyo Heli Trek
        </h1>
        <div className="flex items-center gap-x-2 text-gray-600 font-normal">
          <MapPin size={20} className="text-gray-400" />
          Everest Base Camp, Kathmandu, Nepal
        </div>
      </div>
      <Image
        src={BannerImg}
        alt="banner"
        className="w-full object-cover h-[70vh] brightness-95 my-8"
      />
      <div className="max-w-7xl mx-auto">
        {/* Tour Sub-Details with Icon */}
        <div className="flex items-center justify-around flex-wrap">
          <DetailCard title={"Duration"} value={"17 Days"} Icon={TimerIcon} />
          <DetailCard title={"Tour Difficulty"} value={"Hard"} Icon={Gauge} />
          <DetailCard
            title={"Group Size"}
            value={"100 people"}
            Icon={UsersRound}
          />
          <DetailCard
            title={"Languages"}
            value={"Hindi, Nepali"}
            Icon={LanguagesIcon}
          />
        </div>

        <Divider />

        {/* Specific Tour Images */}
        <div className="space-y-4">
          <h1 className="text-2xl text-orange-500 font-bold">
            Some of the highlights of this trek:
          </h1>

          <div className="grid grid-cols-3 gap-x-10 my-6">
            <Image
              src={BannerImg}
              alt="banner"
              className="rounded-md hover:scale-105 duration-700 transition-all cursor-pointer"
            />
            <Image
              src={BannerImg}
              alt="banner"
              className="rounded-md hover:scale-105 duration-700 transition-all cursor-pointer"
            />
            <Image
              src={BannerImg}
              alt="banner"
              className="rounded-md hover:scale-105 duration-700 transition-all cursor-pointer"
            />
          </div>
        </div>

        <Divider />

        {/* Tour's Description */}
        <div className="space-y-1 my-4">
          <h1 className="text-2xl text-orange-500 font-bold ">
            About this tour
          </h1>
          <p className="text-gray-600 font-medium">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit quam
            non cum tempora harum ducimus cupiditate, pariatur delectus
            accusamus minus voluptatibus neque explicabo, saepe nobis.
          </p>
        </div>

        <Divider />

        {/* Reviews */}
        <div className="space-y-1 my-4">
          <h1 className="text-2xl text-orange-500 font-bold ">Reviews</h1>
          <div className="flex items-center gap-x-2 text-gray-600 font-normal">
            <MapPin size={20} className="text-gray-400" />
            Everest Base Camp, Kathmandu, Nepal
          </div>
          <div className="w-full flex justify-center">
            <Card w="md">
              <CardBody className="flex flex-col items-center justify-center">
                <Star size={100} color="teal" fill="teal" />
                <Stack mt="4" spacing="1" className="text-center">
                  <Text color="teal" fontSize="2xl">
                    4.5/5
                  </Text>
                  <Heading size="md">(14 Reviews)</Heading>
                </Stack>
              </CardBody>

              <Button
                variant="solid"
                colorScheme="blue"
                className="m-2"
                onClick={onOpen}
              >
                Write a review....
              </Button>
            </Card>
          </div>
        </div>

        {/* Traveler's Reviews */}
        <div className="space-y-1 my-10">
          <h1 className="text-2xl text-orange-500 font-bold text-center">
            What travelers are saying about this tour
          </h1>
          <div className="w-full flex flex-col my-8">
            <div className="flex gap-x-4  ">
              <Avatar name="Dan" src="" />
              <div className="space-y-0">
                <p className="font-medium">Sunil</p>
                <p className="flex">
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <Star key={i} size={20} color={"teal"} fill={"teal"} />
                    ))}
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt, doloribus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

DetailCard.propTypes = {
  Icon: PropTypes.any,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Tour;
