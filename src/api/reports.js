/**
 * API utility for report persistence and retrieval.
 * This enables the 'Permanent Link Formation' task.
 */

const isDev = import.meta.env.DEV;
const BASE_URL = isDev ? 'http://localhost:3001/api/reports' : '/api/reports';

/**
 * Saves report data to the backend and returns a unique ID.
 */
export async function saveReport({ reportData, ideaText }) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reportData, ideaText }),
    });

    if (!response.ok) {
      throw new Error('Failed to save report to server');
    }

    const { id } = await response.json();
    return id;
  } catch (error) {
    console.error('Report Save Failure:', error);
    // In dev, if backend is down, we might want a fallback, 
    // but for permanent links, it's better to fail or use localStorage as a secondary.
    // For now, we'll just throw so the UI can handle the error.
    throw error;
  }
}

/**
 * Retrieves report data from the backend by ID.
 */
export async function getReportById(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch report from server');
    }

    return await response.json();
  } catch (error) {
    console.error('Report Retrieval Failure:', error);
    throw error;
  }
}
