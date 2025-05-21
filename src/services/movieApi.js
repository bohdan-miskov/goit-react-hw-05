import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTc5ODNjNTg3NmE0NzNhNWEyZGM0ZWM0YTkwZGU4ZCIsIm5iZiI6MTc0NzcyMzIzOC43NTIsInN1YiI6IjY4MmMyM2U2YzVhNWJiNTA1NDBiZGQyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-d3RghE-whVp9Z8Gtu1CCJvi08Oj3VOlqRdDJVosQeo",
  },
};

export async function getTrendingToday() {
  const response = await axios.get("/trending/movie/day", options);
  return response.data.results;
}
export async function getMoviesByQuery(query) {
  const response = await axios.get("/search/movie", {
    ...options,
    params: { query },
  });
  return response.data.results;
}
export async function getMovieById(id) {
  const response = await axios.get(`/movie/${id}`, options);
  return response.data;
}
export async function getMovieCastById(id) {
  const response = await axios.get(`/movie/${id}/credits`, options);
  return response.data.cast;
}
export async function getMovieReviewsById(id) {
  const response = await axios.get(`/movie/${id}/reviews`, options);
  return response.data.results;
}
