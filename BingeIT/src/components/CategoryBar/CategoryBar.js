import { useEffect, useState } from "react";
import axios from "axios";
import "./CategoryBar.css";
import { useVideo } from "../../context/video-context";
function CategoryBar() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/categories");
      setCategory(data.categories);
    })();
  }, []);
  const { videoDispatch } = useVideo();
  return (
    <div className="category-bar">
      {category.map((item) => {
        return (
          <div
            className="chips"
            key={item._id}
            onClick={() =>
              videoDispatch({
                type: "CHANGE_CATEGORY",
                payload: item.categoryName,
              })
            }
          >
            {item.categoryName}
          </div>
        );
      })}
    </div>
  );
}

export { CategoryBar };
