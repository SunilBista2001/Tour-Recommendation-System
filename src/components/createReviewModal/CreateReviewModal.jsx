import { Button, ButtonGroup, Textarea } from "@chakra-ui/react";
import Modal from "../modal/index";
import { useState } from "react";
import { Star } from "lucide-react";
import PropTypes from "prop-types";

const CreateReviewModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    console.log(rating, review);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Review"
      isLoading={false}
    >
      <form className="space-y-2">
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
          onChange={(e) => setReview(e.target.value)}
          value={review}
        />

        <ButtonGroup size="sm" className="flex justify-end">
          <Button
            loadingText="Submitting..."
            rounded={"full"}
            className="w-full "
            colorScheme="teal"
            onClick={handleSubmit}
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
};

export default CreateReviewModal;
