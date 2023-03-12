export const calculateAverageRating = (ratings) => {
  console.log(ratings);
  if (!ratings || ratings.length === 0) {
    return 0;
  }

  const total = ratings.reduce((acc, rating) => {
    const parsedRating = parseInt(rating);
    return isNaN(parsedRating) ? acc : acc + parsedRating;
  }, 0);

  return total / ratings.length;
};
