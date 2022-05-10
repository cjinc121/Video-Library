import { useEffect } from "react";
import { CategoryBar } from "../../components/CategoryBar/CategoryBar";
import { VideoDisplayVertical } from "../../components/VideoDisplay/VideoDisplayVertical";
const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <CategoryBar />
      <VideoDisplayVertical />
    </>
  );
};
export { Homepage };
