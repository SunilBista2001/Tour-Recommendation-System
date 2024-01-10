import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth";
import { useForm } from "react-hook-form";

const Signup = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useMutation(registerUser, {
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onsubmit = (data) => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    mutate(data);
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4  bg-black/85 rounded-md w-1/4">
      <h2 className="text-white text-lg text-center ">
        Signup To <span className="text-cyan-500 font-medium">Tripo</span>
      </h2>
      <form
        className="text-white space-y-3 px-4 py-2"
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
        >
          Sign Up
        </Button>
      </form>
      <hr className="my-2" />
      <div className="text-white text-center ">
        Already have an account?
        <Link to="/login" className="text-cyan-500 ml-1 font-normal">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
