import axios from "axios";

const API_BASE = process.env.SERVER_API_URL || "http://localhost:4000";
const REVIEWS_API = `${API_BASE}/api/reviews`;

const client = axios.create({
    withCredentials: true,
    baseURL: REVIEWS_API,
});

export const createReview = async (review) => {
    const response = await client.post("", review);
    return response.data;
};

export const deleteReview = async (reviewId) => {
    const response = await client.delete(`/${reviewId}`);
    return response.data;
};

export const updateReview = async (reviewId, review) => {
    const response = await client.put(`/${reviewId}`, review);
    return response.data;
}

export const findAllReviews = async () => {
    const response = await client.get("");
    return response.data;
};

export const findReviewById = async (reviewId) => {
    const response = await client.get(`/${reviewId}`);
    return response.data;
};
