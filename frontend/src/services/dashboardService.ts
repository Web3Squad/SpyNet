const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Fetches the aggregated data for the buyer's dashboard.
 * @param token - The user's JWT authentication token.
 */
export const getBuyerDashboardData = async (token: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/dashboard/buyer`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch buyer dashboard data.');
  }

  return response.json();
};

/**
 * Fetches the aggregated data for the creator's dashboard.
 * @param token - The user's JWT authentication token.
 */
export const getCreatorDashboardData = async (token: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/dashboard/creator`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch creator dashboard data.');
  }

  return response.json();
};