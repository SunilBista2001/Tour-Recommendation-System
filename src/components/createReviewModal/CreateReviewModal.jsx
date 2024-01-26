import { Button, ButtonGroup, Textarea, useToast } from "@chakra-ui/react";
import Modal from "../modal/index";
import { useState } from "react";
import { Star } from "lucide-react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";
import { createReview } from "../../services/review";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const CreateReviewModal = ({ isOpen, onClose, tourId, reviews }) => {
  const toast = useToast();

  const user = useSelector((state) => state.user.user);
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(reviews?.rating || 0);

  let title = "Create Review";

  const { handleSubmit, register } = useForm({
    defaultValues: {
      review: reviews?.review,
      title: "Update Review",
    },
  });

  const { mutate, isLoading } = useMutation(createReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("tour");
      setRating(0);
      onClose();
    },
    onError: () => {
      user
        ? toast({
            title: "You already reviewed this tour",
            status: "error",
            isClosable: true,
          })
        : toast({
            title: "Please, login to create review!",
            status: "error",
            isClosable: true,
          });
      onClose();
    },
  });

  const handleStarClick = (value) => {
    setRating(value);
  };

  const onsubmit = (data) => {
    const formattedData = {
      rating,
      review: data.review,
    };
    mutate({ tourId, data: formattedData });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} isLoading={false}>
      <form onSubmit={handleSubmit(onsubmit)} className="space-y-2">
        <p className="flex w-full justify-center cursor-pointer">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <Star
                key={i}
                size={32}
                onClick={() => handleStarClick(i + 1)}
                color={i + 1 <= rating ? "teal" : "gray"}
                fill={i + 1 <= rating ? "teal" : "none"}
              />
            ))}
        </p>
        <Textarea
          placeholder="Share your experience with us"
          {...register("review", { required: true })}
        />

        <ButtonGroup size="sm" justifyContent={"right"}>
          <Button
            isLoading={isLoading}
            loadingText="Submitting..."
            rounded={"full"}
            className="w-full "
            colorScheme="teal"
            type="submit"
          >
            Submit
          </Button>
          <Button onClick={onClose} rounded={"full"} className="w-full ">
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </Modal>
  );
};

CreateReviewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tourId: PropTypes.string.isRequired,
  reviews: PropTypes.object,
};

export default CreateReviewModal;
