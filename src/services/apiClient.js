import axios from "axios";
import { toast } from "sonner";
import environment from "../environment";
import setupHttpInterceptor from "./httpInterceptor";

const apiClient = axios.create({
  baseURL: environment.apiGateway,
});

setupHttpInterceptor(apiClient);

export const handleResponse = async (request, showSuccess = true) => {
  try {
    const response = await request;
    const successMessage = response.data?.message || "Request completed successfully.";

    if (showSuccess) {
      toast.success(successMessage);
    }

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An error occurred while processing your request.";

    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export default apiClient;
