import { useEffect, useState } from "react";
import axios from "axios";
import "./CategoryBar.css";
function CategoryBar() {
  const [category, setCategory] = useState([]);
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
          <div className="chips" key={item._id}>
            {item.categoryName}
          </div>
        );
      })}
    </div>
  );
}

export { CategoryBar };
