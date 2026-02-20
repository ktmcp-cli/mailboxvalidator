import { Command } from 'commander';
import chalk from 'chalk';
import { loadConfig, setConfig, saveConfig } from './config.js';
import { validateEmail, validateEmailFree, validateEmailDisposable } from './api.js';

const program = new Command();

program
  .name('mailboxvalidator')
  .description('CLI for MailboxValidator email validation service')
  .version('1.0.0');

// Configure command
program
  .command('configure')
  .description('Configure API credentials and settings')
  .option('--api-key <key>', 'MailboxValidator API key')
  .option('--base-url <url>', 'API base URL')
  .action((options) => {
    if (options.apiKey) setConfig('apiKey', options.apiKey);
    if (options.baseUrl) setConfig('baseUrl', options.baseUrl);

    console.log(chalk.green('✓ Configuration saved'));
    console.log('\nCurrent configuration:');
    const config = loadConfig();
    console.log(JSON.stringify({
      baseUrl: config.baseUrl,
      apiKey: config.apiKey ? '***' + config.apiKey.slice(-4) : 'Not set'
    }, null, 2));
  });

// Validate command
program
  .command('validate <email>')
  .description('Validate an email address (full validation)')
  .option('--json', 'Output raw JSON response')
  .action(async (email, options) => {
    try {
      const result = await validateEmail(email);

      if (options.json) {
        console.log(JSON.stringify(result, null, 2));
      } else {
        console.log(chalk.blue('Email Validation Results:'));
        console.log(`  Email: ${result.email_address}`);
        console.log(`  Status: ${result.is_verified === 'True' ? chalk.green('Valid') : chalk.red('Invalid')}`);
        console.log(`  Domain: ${result.domain}`);
        console.log(`  Free Email: ${result.is_free}`);
        console.log(`  Disposable: ${result.is_disposable}`);
        console.log(`  SMTP Check: ${result.is_smtp}`);
        console.log(`  MX Record: ${result.mx_record}`);
      }
    } catch (error) {
      console.error(chalk.red('✗ Error:'), error.message);
      process.exit(1);
    }
  });

// Check if free email
program
  .command('check:free <email>')
  .description('Check if email is from a free provider')
  .option('--json', 'Output raw JSON response')
  .action(async (email, options) => {
    try {
      const result = await validateEmailFree(email);

      if (options.json) {
        console.log(JSON.stringify(result, null, 2));
      } else {
        const isFree = result.is_free === 'True';
        console.log(chalk.blue('Free Email Check:'));
        console.log(`  Email: ${result.email_address}`);
        console.log(`  Free Provider: ${isFree ? chalk.yellow('Yes') : chalk.green('No')}`);
      }
    } catch (error) {
      console.error(chalk.red('✗ Error:'), error.message);
      process.exit(1);
    }
  });

// Check if disposable email
program
  .command('check:disposable <email>')
  .description('Check if email is disposable/temporary')
  .option('--json', 'Output raw JSON response')
  .action(async (email, options) => {
    try {
      const result = await validateEmailDisposable(email);

      if (options.json) {
        console.log(JSON.stringify(result, null, 2));
      } else {
        const isDisposable = result.is_disposable === 'True';
        console.log(chalk.blue('Disposable Email Check:'));
        console.log(`  Email: ${result.email_address}`);
        console.log(`  Disposable: ${isDisposable ? chalk.red('Yes') : chalk.green('No')}`);
      }
    } catch (error) {
      console.error(chalk.red('✗ Error:'), error.message);
      process.exit(1);
    }
  });

// Config show command
program
  .command('config:show')
  .description('Show current configuration')
  .action(() => {
    const config = loadConfig();
    console.log(JSON.stringify({
      baseUrl: config.baseUrl,
      apiKey: config.apiKey ? '***' + config.apiKey.slice(-4) : 'Not set'
    }, null, 2));
  });

export default function() {
  program.parse();
}
