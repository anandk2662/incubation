export function errorHandlerMiddleware(error, request, response, next) {
  console.error(error);

  if (response.headersSent) {
    next(error);
    return;
  }

  const status = Number(error.status) || 500;
  const message = error.message || 'Unexpected server error.';

  response.status(status).json({ message });
}
