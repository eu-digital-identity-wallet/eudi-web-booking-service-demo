import { FetchError, IBookingStore } from "@/interfaces";
import { toast } from "react-toastify";

/**
 * The function `setLoadingAndError` sets the loading state and error message in a movies store.
 * @param set - The `set` parameter is a function that takes a state object of type
 * `Partial<IMoviesStore>` and updates the state with the provided values.
 * @param {boolean} isLoading - The `isLoading` parameter is a boolean value that indicates whether the
 * loading state is active or not. If `isLoading` is `true`, it means that the application is currently
 * loading data or performing an operation. If `isLoading` is `false`, it means that the loading state
 * has ended.
 * @param {FetchMoviesError | null} [error=null] - The `error` parameter in the `setLoadingAndError`
 * function is used to specify any error that occurred during the fetching of movies. It is of type
 * `FetchMoviesError | null`, which means it can either be an object of type `FetchMoviesError` or
 * `null`. If there
 */
export const setLoadingAndError = (
  set: (state: Partial<IBookingStore>) => void,
  isLoading: boolean,
  error: FetchError | null = null
) => {
  set({ isLoading, error });
};

/**
 * The handleError function sets an error message and displays it using toast.error.
 * @param set - The `set` parameter is a function that updates the state of the movies store with the
 * provided partial state.
 * @param {unknown} err - The `err` parameter in the `handleError` function is used to capture any
 * error that occurs during the execution of the function. It can be of type `unknown`, which means it
 * can be any type of value. The function then checks if the error is an instance of the `Error`
 */
export const handleError = (
  set: (state: Partial<IBookingStore>) => void,
  err: unknown
) => {
  let errorMessage = "Unknown error occurred";
  if (err instanceof Error) {
    errorMessage = err.message;
  } else if (typeof err === "string") {
    errorMessage = err;
  }
  setLoadingAndError(set, false, { message: errorMessage });
  toast.error(errorMessage);
};
