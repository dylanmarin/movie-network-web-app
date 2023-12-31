import axios from "axios";

const API_BASE = process.env.REACT_APP_SERVER_API_URL;
const FOLLOWS_API = `${API_BASE}/api/users`;

const client = axios.create({
    withCredentials: true,
    baseURL: FOLLOWS_API,
});

export const userFollowsUser = async (followed) => {
    const response = await client.post(`/${followed}/follows`);
    return response.data;
};

export const userUnfollowsUser = async (followed) => {
    const response = await client.delete(`/${followed}/follows`);
    return response.data;
};

export const findFollowersOfUser = async (followed) => {
    const response = await client.get(`/${followed}/followers`);
    return response.data;
};

export const findFollowedUsersByUser = async (follower) => {
    const response = await client.get(`/${follower}/following`);
    return response.data;
};
