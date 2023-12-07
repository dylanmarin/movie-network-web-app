import axios from "axios";

const API_BASE = process.env.REACT_APP_SERVER_API_URL;
const PRODUCTION_COMPANIES_API = `${API_BASE}/api/companies`;

const request = axios.create({
    withCredentials: true,
    baseURL: PRODUCTION_COMPANIES_API,
});


export const getCompanyDetails = async (companyId) => {
    const response = await request.get(`/${companyId}/details`);
    return response.data;
}

export const getMoviesByCompany = async (companyId) => {
    const response = await request.get(`/${companyId}/movies`);
    return response.data;
}
