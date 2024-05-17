import { UrlTextFieldErrorMessages } from "@/components/url-textfield";

export const urlInputTip =
  "Insert data url. Returning data MUST be a JSON array where each element is a key/value pair.";
export const invalidUrlMessage = "Please enter a valid URL.";
export const noDataFoundMessage =
  "No data found for the given URL. Returning data MUST be a JSON array where each element is a key/value pair.";

export const errorMessages: UrlTextFieldErrorMessages = {
  default: invalidUrlMessage,
  responseError: noDataFoundMessage,
};
