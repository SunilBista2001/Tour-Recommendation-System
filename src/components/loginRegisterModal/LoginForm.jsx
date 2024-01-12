/* eslint-disable react/no-unescaped-entities */
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useMutation } from "react-query";
import { loginUser } from "../../services/auth";

const LoginForm = ({ handleFormType, onClose }) => {
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useMutation(loginUser, {
    onSuccess: () => {
      window.location.reload();
      onClose();
    },
  });

  const onsubmit = (data) => {
    mutate(data);
  };

  return (
    <>
      <form
        className="text-black space-y-4 px-4 py-2"
        onSubmit={handleSubmit(onsubmit)}
      >
        <Input
          size="md"
          variant="outline"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">Email is required</span>
        )}
        <InputGroup size="md">
          <Input
            isInvalid={errors.password}
            errorBorderColor="red"
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: true })}
          />

          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {errors.password && (
          <span className="text-red-500 text-sm">Password is required</span>
        )}

        <Button
          isLoading={isLoading}
          type="submit"
          loadingText="Login..."
          colorScheme="teal"
          variant="outline"
          rounded={"full"}
          className="w-full "
        >
          Login
        </Button>
      </form>

      <hr className="my-2" />
      <div className="text-gray-500 font-medium text-center ">
        Don't have an account?
        <p
          className="text-cyan-500 ml-1 font-medium cursor-pointer"
          onClick={() => handleFormType("register")}
        >
          Sign up
        </p>
      </div>
    </>
  );
};

LoginForm.propTypes = {
  isLoading: PropTypes.bool,
  handleFormType: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginForm;
