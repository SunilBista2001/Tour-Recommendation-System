import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import SlideShow from "../../components/slideShow/SlideShow";
import { SearchIcon, ShieldPlus, StarIcon } from "lucide-react";
import RecommendTour from "../../components/recommendTour/RecommendTour";

const Home = () => {
  return (
    <div className="w-full flex justify-center flex-col">
      <SlideShow />

      {/* Search */}
      <div className="mx-10 mt-4 flex justify-center">
        <div className="w-1/2">
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              placeholder="Search Tour here...."
              className="w-1/2 "
            />
            <InputLeftElement>
              <SearchIcon />
            </InputLeftElement>
          </InputGroup>
        </div>
      </div>

      {/* Most Popular */}
      <div className="w-full justify-center flex my-4">
        <RecommendTour title={"Most Popular"} Icon={StarIcon} />
      </div>

      {/* Recent Added Tours */}
      <div className="w-full justify-center flex my-4">
        <RecommendTour title={"Recently Added Tour"} Icon={ShieldPlus} />
      </div>
    </div>
  );
};

export default Home;
