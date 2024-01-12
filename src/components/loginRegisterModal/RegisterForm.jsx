/* eslint-disable react/no-unescaped-entities */
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useMutation } from "react-query";
import { registerUser } from "../../services/auth";

const RegisterForm = ({ handleFormType }) => {
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { mutate, isLoading } = useMutation(registerUser, {
    onSuccess: () => {
      handleFormType("login");
    },
  });

  const onsubmit = (data) => {
    mutate(data);
  };

  return (
    <>
      <form
        className="text-black space-y-3 px-4 py-2"
        onSubmit={handleSubmit(onsubmit)}
      >
        <Input
          size="md"
          variant="outline"
          placeholder="Enter Username"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <span className="text-red-500 text-sm">Username is required</span>
        )}
        <Input
          size="md"
          variant="outline"
          placeholder="Enter Email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">Email is required</span>
        )}
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
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

        <Input
          size="md"
          variant="outline"
          type="password"
          isInvalid={errors?.passwordConfirm}
          errorBorderColor="crimson"
          placeholder="Confirm your password"
          {...register("passwordConfirm", {
            required: true,
            validate: (value) => value === watch("password"),
          })}
        />
        {errors.passwordConfirm && (
          <span className="text-red-500 text-sm">
            Confirm password does not match with password
          </span>
        )}

        <Button
          isLoading={isLoading}
          loadingText="Registering..."
          colorScheme="teal"
          variant="outline"
          className="w-full"
          type="submit"
          rounded={"full"}
        >
          Sign Up
        </Button>
      </form>

      <hr className="my-2" />
      <div className="text-gray-500 font-medium text-center ">
        Already have an account?
        <p
          className="text-cyan-500 ml-1 font-medium cursor-pointer"
          onClick={() => handleFormType("login")}
        >
          Log In
        </p>
      </div>
    </>
  );
};

RegisterForm.propTypes = {
  isLoading: PropTypes.bool,
  handleFormType: PropTypes.func.isRequired,
};

export default RegisterForm;
