import fs from 'fs';
import path from 'path';
import os from 'os';

const CONFIG_DIR = path.join(os.homedir(), '.ktmcp');
const CONFIG_FILE = path.join(CONFIG_DIR, 'mailboxvalidator.json');

export function ensureConfigDir() {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
}

export function loadConfig() {
  ensureConfigDir();

  if (fs.existsSync(CONFIG_FILE)) {
    const data = fs.readFileSync(CONFIG_FILE, 'utf8');
    return JSON.parse(data);
  }

  return {
    apiKey: process.env.MAILBOXVALIDATOR_API_KEY || '',
    baseUrl: process.env.MAILBOXVALIDATOR_BASE_URL || 'https://api.mailboxvalidator.com/v1'
  };
}

export function saveConfig(config) {
  ensureConfigDir();
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

export function getConfig(key) {
  const config = loadConfig();
  return config[key];
}

export function setConfig(key, value) {
  const config = loadConfig();
  config[key] = value;
  saveConfig(config);
}
