import apiClient from './client.js';

export async function generateWorkflow(text) {
  const response = await apiClient.post('/api/workflow/generate', { text });
  return response.data?.data;
}

export function getApiErrorMessage(error) {
  return (
    error?.response?.data?.error?.message ||
    error?.message ||
    'Something went wrong while generating the workflow.'
  );
}
