import { useEffect, useState } from "react";
import axios from "axios";
import "./CategoryBar.css";
import { useDispatch } from "react-redux";
import { changeCategory } from "../../features/video/videoSlice";
function CategoryBar() {
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/categories");
      setCategory(data.categories);
    })();
  }, []);
  return (
    <div className="category-bar">
      {category.map((item) => {
        return (
          <div
            className="chips"
            key={item._id}
            onClick={() => {
              dispatch(changeCategory(item.categoryName));
            }}
          >
            {item.categoryName}
          </div>
        );
      })}
    </div>
  );
}

export { CategoryBar };
