import environment from "../environment";
import apiClient, { handleResponse } from "./apiClient";


export const authenticationService = {
  //Login
  login(credentials,showSuccess = true) {
    return handleResponse(apiClient.post("/auth/login", credentials),showSuccess)
  },

  //Initiate Reset Password
  initiatePasswordReset(email){
    return handleResponse(apiClient.post("/auth/password-reset/initiate", { email }))
  },

  //Complete Password Reset
  completePasswordReset(payload, showSuccess = true) {
    return handleResponse(
      apiClient.post("/auth/password-reset/complete", payload),
      showSuccess,
    );
  },

  //Register
  register(payload, showSuccess = true) {
    return handleResponse(
      apiClient.post("/auth/register", payload),
      showSuccess,
    );
  },

  //Refresh Token
  refreshToken(payload, showSuccess = false) {
    return handleResponse(
      apiClient.post("/auth/refresh-token", payload),
      showSuccess,
    );
  },

  //Log Out
  logout(payload, showSuccess = false) {
    return handleResponse(
      apiClient.post("/auth/logout", payload),
      showSuccess,
    );
  },

  //Current User
  getCurrentUser(email, showSuccess = false) {
    return handleResponse(
      apiClient.get("/auth/me",   { params: { email } }),
      showSuccess,
    );
  },
};

export default authenticationService;
