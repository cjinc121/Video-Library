export const categoryFilter = (categoryType, videos) => {
  if (categoryType === "All") return videos;
  return videos.filter((video) => video.category === categoryType);
};
export const searchFilter = (input, videos) => {
  if (input === "") return videos;
  return videos.filter((video) =>
    video.title.toUpperCase().includes(input.toUpperCase())
  );
};
