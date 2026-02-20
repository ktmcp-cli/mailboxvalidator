# MailboxValidator CLI - AI Agent Guide

## Purpose
This CLI provides access to MailboxValidator, an email validation service that verifies email addresses, detects disposable emails, and performs SMTP checks.

## Installation
```bash
npm install -g @ktmcp-cli/mailboxvalidator
```

## Configuration
```bash
mailboxvalidator configure --api-key YOUR_API_KEY
```

## Common Commands

### Full Email Validation
```bash
mailboxvalidator validate EMAIL_ADDRESS
mailboxvalidator validate EMAIL_ADDRESS --json
```

### Free Email Check
```bash
mailboxvalidator check:free EMAIL_ADDRESS
mailboxvalidator check:free EMAIL_ADDRESS --json
```

### Disposable Email Check
```bash
mailboxvalidator check:disposable EMAIL_ADDRESS
mailboxvalidator check:disposable EMAIL_ADDRESS --json
```

### View Configuration
```bash
mailboxvalidator config:show
```

## Output Formats
- Default: Human-readable formatted results with color coding
- `--json`: Raw JSON response from API

## Exit Codes
- 0: Success
- 1: Error (missing config, API error, network error)

## Common Use Cases
1. **Email Verification** - Validate email addresses in real-time
2. **List Cleaning** - Clean email marketing lists
3. **Fraud Prevention** - Block disposable/temporary emails
4. **User Registration** - Verify emails during signup
5. **CRM Integration** - Validate contact information
6. **Bounce Prevention** - Reduce email bounce rates

## Validation Results
The API returns information about:
- Email format validity
- Domain existence
- MX record status
- SMTP server check
- Free email provider detection
- Disposable email detection

## Error Handling
The CLI provides clear error messages for:
- Missing API key
- Invalid email format
- Network errors
- API rate limits
- Quota exceeded

## Best Practices
- Use `--json` for programmatic access
- Cache validation results to reduce API calls
- Implement rate limiting for bulk validation
- Handle API quota limits gracefully
- Validate before sending emails
