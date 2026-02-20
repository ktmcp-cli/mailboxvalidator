#!/usr/bin/env node

import('../src/index.js').then(module => {
  module.default();
}).catch(err => {
  console.error('Failed to start CLI:', err);
  process.exit(1);
});
