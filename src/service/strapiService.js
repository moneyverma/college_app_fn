import { API_BASE_URL } from '@/app/config';
import axios from 'axios';


export const fetchColleges =  () => {
        const response = axios.get(`${API_BASE_URL}/api/colleges?populate=*`);
        return response;
};



export const fetchCourses =  () => {
    const response = axios.get(`${API_BASE_URL}/api/courses?populate=*`);
    return response;
};


export const fetchCollegeByCourses =  (value) => {
    const response = axios.get(`${API_BASE_URL}/api/colleges?populate=*&filters[courses][name][$eq]=${value}`);
    return response;
};