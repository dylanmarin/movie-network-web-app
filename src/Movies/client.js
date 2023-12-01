import axios from "axios";

const API_BASE = process.env.SERVER_API_URL || "http://localhost:4000";
const MOVIES_API = `${API_BASE}/api/movies`;

const request = axios.create({
    withCredentials: true,
    baseURL: MOVIES_API,
});
export const getMovieDetails = async (movieId) => {
    const response = await request.get(`/${movieId}/details`);
    return response.data;
}

export const getMovieCredits = async (movieId) => {
    const response = await request.get(`/${movieId}/credits`);
    return response.data;
}

export const getMovieRecommendations = async (movieId) => {
    const response = await request.get(`/${movieId}/recommendations`);
    return response.data;
}

export const getPopularMovies = async (timeRange) => {
    const response = await request.get(`/popular/${timeRange}`);
    return response.data;
}

export const searchMovies = async (searchTerm) => {
    const response = await request.get(`/search/${searchTerm}`);
    return response.data;
}
