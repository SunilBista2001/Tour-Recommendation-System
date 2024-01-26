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
  IndianRupeeIcon,
  LanguagesIcon,
  MapPin,
  Star,
  TimerIcon,
  Trash,
  UsersRound,
} from "lucide-react";
import PropTypes from "prop-types";
import CreateReviewModal from "../../components/createReviewModal/CreateReviewModal";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getTour } from "../../services/tour";
import Loader from "../../components/loader/Loader";
import { useState } from "react";
import DeleteModal from "../../components/modal/DeleteModal";

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

  const [editReviews, setEditReviews] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  const { data: tour, isLoading } = useQuery("tour", () =>
    getTour({ id: tourId })
  );

  if (isLoading) return <Loader />;

  return (
    <>
      {/* Delete Review Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={onCloseDeleteModal}
        cancelRef={null}
        title={"Review"}
        id={editReviews}
        content={"Are you sure you want to delete this review?"}
      />

      {/* Create and Update Review Modal */}
      <CreateReviewModal
        isOpen={isOpen}
        onClose={onClose}
        tourId={tourId}
        reviews={editReviews}
      />

      {/* Tour's Title */}
      <div className=" mt-36 max-w-7xl mx-auto space-y-2">
        <h1 className="text-2xl text-orange-500 font-bold">
          {tour?.data?.tour?.name?.charAt(0)?.toUpperCase() +
            tour?.data?.tour?.name?.slice(1)}
        </h1>
        <div className="flex items-center gap-x-2 text-gray-600 font-normal">
          <MapPin size={20} className="text-gray-400" />
          {tour?.data?.tour?.name?.charAt(0)?.toUpperCase() +
            tour?.data?.tour?.name?.slice(1) +
            ", " +
            tour?.data?.tour?.city +
            ", " +
            "Nepal"}
        </div>
      </div>
      <Image
        src={
          tour?.data?.tour?.coverImage
            ? import.meta.env.VITE_REACT_APP_BASE_URL +
              "/tours/" +
              tour?.data?.tour?.coverImage
            : BannerImg
        }
        alt="banner"
        className="w-full object-cover h-[70vh] brightness-95 my-8"
      />
      <div className="max-w-7xl mx-auto">
        {/* Tour Sub-Details with Icon */}
        <div className="flex items-center justify-around flex-wrap">
          <DetailCard
            title={"Duration"}
            value={`${tour?.data?.tour?.duration} Days`}
            Icon={TimerIcon}
          />
          <DetailCard
            title={"Tour Difficulty"}
            value={
              tour?.data?.tour?.difficulty?.charAt(0)?.toUpperCase() +
              tour?.data?.tour?.difficulty?.slice(1)
            }
            Icon={Gauge}
          />
          <DetailCard
            title={"Group Size"}
            value={`${tour?.data?.tour?.maxGroupSize} people`}
            Icon={UsersRound}
          />
          <DetailCard
            title={"Price"}
            value={`Rs. ${tour?.data?.tour?.price}/wk`}
            Icon={IndianRupeeIcon}
          />
          <DetailCard
            title={"Languages"}
            value={"English, Nepali, Hindi"}
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
            {tour?.data?.tour?.images?.map((img, idx) => (
              <Image
                key={idx}
                src={import.meta.env.VITE_REACT_APP_BASE_URL + "/tours/" + img}
                alt="banner"
                className="rounded-md hover:scale-105 duration-700 transition-all cursor-pointer"
              />
            ))}
          </div>
        </div>

        <Divider />

        {/* Tour's Description */}
        <div className="space-y-1 my-4">
          <h1 className="text-2xl text-orange-500 font-bold ">
            About this tour
          </h1>
          <p className="text-gray-600 font-medium">
            {tour?.data?.tour?.description}
          </p>
        </div>

        <Divider />

        {/* Reviews */}
        <div className="space-y-1 my-4">
          <h1 className="text-2xl text-orange-500 font-bold ">Reviews</h1>
          <div className="flex items-center gap-x-2 text-gray-600 font-normal">
            <MapPin size={20} className="text-gray-400" />
            {tour?.data?.tour?.name?.charAt(0)?.toUpperCase() +
              tour?.data?.tour?.name?.slice(1) +
              ", " +
              tour?.data?.tour?.city +
              ", " +
              "Nepal"}
          </div>
          <div className="w-full flex justify-center">
            <Card w="md">
              <CardBody className="flex flex-col items-center justify-center">
                <Star size={100} color="teal" fill="teal" />
                <Stack mt="4" spacing="1" className="text-center">
                  <Text color="teal" fontSize="2xl">
                    {`${tour?.data?.tour?.ratingsAverage?.toFixed(2)}/5`}
                  </Text>
                  <Heading size="md">{`(${tour?.data?.tour?.ratingsQuantity} Reviews)`}</Heading>
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
      </div>

      {/* Traveler's Reviews */}
      <div className="space-y-1 my-10">
        {tour?.data?.tour?.reviews?.length !== 0 && (
          <h1 className="text-2xl text-orange-500 font-bold text-center">
            What travelers are saying about this tour
          </h1>
        )}
        {tour?.data?.tour?.reviews?.length !== 0 ? (
          tour?.data?.tour?.reviews?.map((review, i) => (
            <div
              key={i}
              className={`w-full flex flex-col my-8 space-y-8 mx-auto  px-8 ${
                (i + 1) % 2 !== 0 ? "bg-gray-50" : " bg-white "
              }`}
            >
              <div className="flex gap-x-4 my-2 justify-between  ">
                <div className="flex gap-x-4">
                  <Avatar name={review?.user?.username} src={""} />

                  <div className="space-y-0">
                    <div className="min-w-full flex justify-between ">
                      <p className="font-medium mr-1">
                        {review?.user?.username}
                      </p>
                    </div>
                    <p className="flex">
                      {Array(5)
                        .fill("")
                        .map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            color={i + 1 <= review?.rating ? "teal" : "gray"}
                            fill={i + 1 <= review?.rating ? "teal" : "none"}
                          />
                        ))}
                    </p>
                    <p>{review?.review}</p>
                  </div>
                </div>

                {/* Show the Delete and Update Icon only if the respective user is logged in */}
                {user?.data?.user?.id === review?.user?.id && (
                  <div className="flex items-center gap-x-3">
                    <Trash
                      size={20}
                      className="text-gray-400 cursor-pointer"
                      color="red"
                      onClick={() => {
                        setEditReviews(review?._id);
                        onOpenDeleteModal();
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-2xl font-bold text-center text-orange-500 my-8">
            Be the first one to review this tour
          </h1>
        )}
      </div>
    </>
  );
};

DetailCard.propTypes = {
  Icon: PropTypes.any,
  title: PropTypes.any,
  value: PropTypes.any,
};

export default Tour;
