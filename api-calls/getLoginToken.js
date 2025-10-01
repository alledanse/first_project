import fetch from 'node-fetch';

export const getLoginToken = async (username, password) => {
  try {
    const response = await fetch('http://localhost:2221/api/login', {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
    });
    const data = response.json();
    return data.token;
  } catch (error) {
    console.error('Error fetching login token:', error);
    throw error;
  }
};
