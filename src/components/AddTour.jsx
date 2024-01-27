import {
  Avatar,
  AvatarGroup,
  Button,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Modal from "../components/modal";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { createTour } from "../services/tour";

const AddTour = ({ isOpen, onClose }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const [coverImage, setCoverImage] = useState(null);
  const [images, setImages] = useState([]);
  const [buildImages, setBuildImages] = useState([]);

  const { mutate, isLoading } = useMutation(createTour, {
    onSuccess: () => {
      queryClient.invalidateQueries("tours");
      toast({
        title: "Tour added successfully.",
        status: "success",
        isClosable: true,
      });
      onClose();
    },

    onError: () => {
      toast({
        title: "There was an error while adding tour.",
        status: "error",
        isClosable: true,
      });
      onClose();
    },
  });

  const handleImages = (e) => {
    let file = e.target.files;
    for (let i = 0; i < file.length; i++) {
      const buildUrlImages = URL.createObjectURL(file[i]);

      images.push(file[i]);
      buildImages.push(buildUrlImages);
    }

    setImages(images);
    setBuildImages(buildImages);
  };

  const onsubmit = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("city", data.city);
    formData.append("difficulty", data.difficulty);
    formData.append("price", data.price);
    formData.append("duration", data.duration);
    formData.append("maxGroupSize", data.maxGroupSize);

    if (images) {
      images.forEach((img) => {
        formData.append("images", img);
      });
    }

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    mutate(formData);
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
        <FormLabel>Upload Tour Cover Image</FormLabel>
        <Input
          type="file"
          placeholder="Tour Image"
          name="coverImage"
          onChange={(e) => {
            setCoverImage(e.target.files[0]);
          }}
        />

        <FormLabel>Upload Tour Images (Max 3)</FormLabel>
        <Input
          multiple
          type="file"
          placeholder="Tour Images"
          name="images"
          onChange={handleImages}
        />
        {buildImages && (
          <AvatarGroup size="md" max={2}>
            {buildImages.map((img, idx) => (
              <Avatar key={idx} src={img} objectFit={"fill"} />
            ))}
          </AvatarGroup>
        )}

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
            loadingText="Adding Tour..."
            colorScheme="teal"
            variant={"solid"}
          >
            Add Tour
          </Button>
        </div>
      </form>
    </Modal>
  );
};

AddTour.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddTour;
