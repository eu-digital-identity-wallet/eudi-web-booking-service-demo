/**
 * Makes an HTTP request and returns the response as a Promise of type T.
 *
 * This function creates an HTTP request using the provided `path` and `config`,
 * then sends the request using the `fetch` API. If the response is not successful,
 * it throws an error with the status text or response error message. If the response
 * is successful, it attempts to parse the response JSON and returns it. If parsing fails,
 * it returns an empty object.
 *
 * @template T - The expected type of the response data.
 * @param {string} path - The URL path for the HTTP request.
 * @param {RequestInit} config - Configuration options for the HTTP request.
 *
 * @returns {Promise<T>} - A Promise that resolves to the response data of type T.
 *
 * @throws {Error} - Throws an error if the HTTP response is not successful.
 */
async function http<T>(path: string, config: RequestInit): Promise<T> {
  const request = new Request(path, config);
  const response = await fetch(request);

  if (!response.ok) {
    const errorText = await response.json();
    throw new Error(JSON.stringify(response.statusText || errorText));
  }

  // Attempt to parse JSON response, return an empty object if parsing fails
  return response.json().catch(() => ({}));
}

/**
 * Sends a GET request to the specified path.
 *
 * This function sends a GET request to the provided `path` with optional configuration.
 * It uses the `http` function to handle the request and return the response.
 *
 * @template T - The expected type of the response data.
 * @param {string} path - The URL path for the GET request.
 * @param {RequestInit} [config] - Optional configuration options for the GET request.
 *
 * @returns {Promise<T>} - A Promise that resolves to the response data of type T.
 */
export async function get<T>(path: string, config?: RequestInit): Promise<T> {
  const init = { method: "get", ...config };
  return await http<T>(`${path}`, init);
}

/**
 * Sends a POST request to the specified path with a request body.
 *
 * This function sends a POST request to the provided `path` with the given `body` and optional
 * configuration. The `body` is serialized as JSON before being sent. It uses the `http` function
 * to handle the request and return the response.
 *
 * @template T - The type of the request body.
 * @template U - The expected type of the response data.
 * @param {string} path - The URL path for the POST request.
 * @param {T} body - The request body to be sent with the POST request.
 * @param {RequestInit} [config] - Optional configuration options for the POST request.
 *
 * @returns {Promise<U>} - A Promise that resolves to the response data of type U.
 */
export async function post<T, U>(
  path: string,
  body: T,
  config?: RequestInit
): Promise<U> {
  const init = { method: "post", body: JSON.stringify(body), ...config };
  return await http<U>(`${path}`, init);
}

/**
 * Object containing methods for making HTTP requests.
 *
 * This object provides convenience methods for making HTTP requests using the `http` function.
 * It includes methods for GET, POST, PUT, and DELETE requests.
 *
 * @type {{
 *   post: <T, U>(path: string, body: T, config?: RequestInit) => Promise<U>;
 *   put: <T, U>(path: string, body: T, config?: RequestInit) => Promise<U>;
 *   get: <T>(path: string, config?: RequestInit) => Promise<T>;
 *   del: <T>(path: string, config?: RequestInit) => Promise<T>;
 * }}
 */
export const apiFetch = {
  post,
  get,
};
