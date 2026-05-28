import apiClient from './client.js';

export async function generateWorkflow(text) {
  const response = await apiClient.post('/api/workflow/generate', { text });
  const payload = response.data;

  if (payload?.success === false) {
    throw new Error(payload?.error?.message || 'Workflow generation failed.');
  }

  if (!payload?.data) {
    throw new Error('The workflow service returned an empty response.');
  }

  return payload.data;
}

export function getApiErrorMessage(error) {
  return (
    error?.response?.data?.error?.message ||
    error?.message ||
    'Something went wrong while generating the workflow.'
  );
}
