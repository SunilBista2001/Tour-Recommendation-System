/* eslint-disable react/no-unescaped-entities */
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth";
import { useForm } from "react-hook-form";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useMutation(loginUser, {
    onSuccess: () => {
      navigate("/");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onsubmit = (data) => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    mutate(data);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4  bg-black/85 rounded-md w-1/4">
      <h2 className="text-white text-lg text-center ">
        Login To <span className="text-cyan-500 font-medium">Tripo</span>
      </h2>
      <form
        className="text-white space-y-3 px-4 py-2"
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

        <Button
          isLoading={isLoading}
          type="submit"
          loadingText="Login..."
          colorScheme="teal"
          variant="outline"
          className="w-full"
        >
          Login
        </Button>
      </form>
      <hr className="my-2" />
      <div className="text-white text-center ">
        Don't have an account?
        <Link to="/register" className="text-cyan-500 ml-1 font-normal">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
