// A basic regex for URL validation.
// In a real-world scenario, we would to use a more complex regex
// or a library like `check-valid-url`.
export const UrlRegex =
  /^(https?:)(\/\/\/?)[\w\-_]+\.[\w\-_]+\.[\w\-_]+(\/[\w\-_#.]*)*$/i;
