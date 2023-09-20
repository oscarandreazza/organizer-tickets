import { useMutation } from "@tanstack/react-query";
import axios from "axios";
const API_URL = "http://localhost:8989";

const userData = data => {
    return axios.post(API_URL + "/api/auth", data);
};

export function useAuth() {
    const mutation = useMutation(userData);
    return mutation;
}
