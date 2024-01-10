import { Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spinner size="xl" speed="0.65s" color="teal" />
    </div>
  );
};

export default Loader;
