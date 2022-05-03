import "./Homepage.css";
import { CategoryBar } from "../../components/CategoryBar/CategoryBar";
import { VideoDisplayVertical } from "../../components/VideoDisplay/VideoDisplayVertical";
const Homepage = () => {
  return (
    <>
      <CategoryBar />
      <VideoDisplayVertical />
    </>
  );
};
export { Homepage };
