import { Button, Input, Select, Textarea, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import propTypes from "prop-types";
import Modal from "./modal";
import { useMutation, useQueryClient } from "react-query";
import { updateTour } from "../services/tour";

const EditTourModal = ({ isOpen, onClose, currentTourData }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: currentTourData.name,
      description: currentTourData.description,
      city: currentTourData.city,
      difficulty: currentTourData.difficulty,
      price: currentTourData.price,
      duration: currentTourData.duration,
      maxGroupSize: currentTourData.maxGroupSize,
    },
  });

  const { mutate, isLoading } = useMutation(updateTour, {
    onSuccess: () => {
      queryClient.invalidateQueries("tours");
      toast({
        title: "Tour updated successfully.",
        status: "success",
        isClosable: true,
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "An error occurred while updating tour.",
        status: "error",
        isClosable: true,
      });
    },
  });

  const onsubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("city", data.city);
    formData.append("difficulty", data.difficulty);
    formData.append("price", data.price);
    formData.append("duration", data.duration);
    formData.append("maxGroupSize", data.maxGroupSize);
    mutate({ id: currentTourData._id, data: formData });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p className="py-1 font-medium">
        Add Tour to <span className="text-teal-500">Tripo</span>
      </p>
      <form className="space-y-3" onSubmit={handleSubmit(onsubmit)}>
        <Input
          placeholder="Tour Name"
          {...register("name", {
            required: true,
          })}
        />

        <Textarea
          placeholder="Tour Description"
          {...register("description", {
            required: true,
          })}
        />
        <div className="flex gap-x-2">
          <Input
            placeholder="City"
            {...register("city", {
              required: true,
            })}
          />

          <Select
            placeholder={"Choose Difficulty"}
            {...register("difficulty", {
              required: true,
            })}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Difficult">Difficult</option>
          </Select>
        </div>
        <div className="flex gap-x-3">
          <Input
            placeholder="Price"
            {...register("price", {
              required: true,
            })}
          />
          <Input
            placeholder="Duration"
            {...register("duration", {
              required: true,
            })}
          />
          <Input
            placeholder="Group Size"
            {...register("maxGroupSize", {
              required: true,
            })}
          />
        </div>

        <div className="flex justify-end gap-x-2 mt-4">
          <Button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            type="submit"
            loadingText="Updating Tour..."
            colorScheme="teal"
            variant={"solid"}
          >
            Update Tour
          </Button>
        </div>
      </form>
    </Modal>
  );
};

EditTourModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  currentTourData: propTypes.object.isRequired,
};

export default EditTourModal;
