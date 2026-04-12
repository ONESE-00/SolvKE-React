const ACCESS_TOKEN_STORAGE_KEY = "accessToken";
const STATIC_ACCESS_TOKEN = "static-access-token-placeholder";

export const nonInterceptedRequests = [
  // "/auth/login",
  "/auth/register",
  "/auth/password-reset/initiate",
  "/auth/password-reset/complete",
  "/auth/refresh-token",
];

function getAccessToken() {
  if (typeof window === "undefined") {
    return STATIC_ACCESS_TOKEN;
  }

  return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) || STATIC_ACCESS_TOKEN;
}

function shouldSkipInterception(url = "") {
  return nonInterceptedRequests.some((requestUrl) => url.includes(requestUrl));
}

export function setupHttpInterceptor(apiClient) {
  apiClient.interceptors.request.use(
    (config) => {
      if (shouldSkipInterception(config.url)) {
        return config;
      }

      const accessToken = getAccessToken();

      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
        "X-Client-Channel": "web",
        Accept: "application/json",
      };

      return config;
    },
    (error) => Promise.reject(error),
  );
}

export default setupHttpInterceptor;
