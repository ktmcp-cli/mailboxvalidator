import axios from 'axios';
import { loadConfig } from './config.js';

export async function validateEmail(email, options = {}) {
  const config = loadConfig();

  if (!config.apiKey) {
    throw new Error('API key not configured. Run: mailboxvalidator configure');
  }

  const url = `${config.baseUrl}/validation/single`;

  try {
    const response = await axios.get(url, {
      params: {
        key: config.apiKey,
        email: email,
        format: options.format || 'json'
      }
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`API Error (${error.response.status}): ${error.response.data.error_message || error.response.statusText}`);
    }
    throw error;
  }
}

export async function validateEmailFree(email) {
  const config = loadConfig();

  if (!config.apiKey) {
    throw new Error('API key not configured. Run: mailboxvalidator configure');
  }

  const url = `${config.baseUrl}/email/free`;

  try {
    const response = await axios.get(url, {
      params: {
        key: config.apiKey,
        email: email,
        format: 'json'
      }
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`API Error (${error.response.status}): ${error.response.data.error_message || error.response.statusText}`);
    }
    throw error;
  }
}

export async function validateEmailDisposable(email) {
  const config = loadConfig();

  if (!config.apiKey) {
    throw new Error('API key not configured. Run: mailboxvalidator configure');
  }

  const url = `${config.baseUrl}/email/disposable`;

  try {
    const response = await axios.get(url, {
      params: {
        key: config.apiKey,
        email: email,
        format: 'json'
      }
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`API Error (${error.response.status}): ${error.response.data.error_message || error.response.statusText}`);
    }
    throw error;
  }
}
