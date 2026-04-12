export async function handleAsync(operation, fallbackMessage) {
  try {
    return await operation();
  } catch (error) {
    throw normalizeError(error, fallbackMessage);
  }
}

function normalizeError(error, fallbackMessage) {
  if (error instanceof Error) {
    return error;
  }
  return new Error(fallbackMessage);
}
