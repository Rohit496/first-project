# Husky Pre-commit Hook Setup

This project is now configured with Husky pre-commit hooks that will prevent commits when there are JavaScript errors, formatting issues, or linting errors.

## What's Configured

### Tools Installed
- **Husky**: Git hooks manager
- **ESLint**: JavaScript linting
- **Prettier**: Code formatting
- **lint-staged**: Run linters on staged files

### Pre-commit Hook Behavior
When you try to commit code, the following checks will run automatically:

1. **ESLint**: Checks for JavaScript errors and code quality issues
2. **Prettier**: Formats code according to style guidelines
3. **Auto-fix**: Attempts to automatically fix fixable issues

### What Happens During Commit
- ✅ **If all checks pass**: Commit proceeds normally
- ❌ **If there are errors**: Commit is blocked and you'll see error messages

### Available Scripts
```bash
npm run lint          # Check for linting errors
npm run lint:fix      # Fix auto-fixable linting errors
npm run format        # Format code with Prettier
npm run format:check  # Check if code is properly formatted
```

### Example Error Prevention
The hook will prevent commits for issues like:
- Unused variables
- Missing semicolons
- Inconsistent quotes
- Wrong indentation
- Using `var` instead of `let/const`
- Using `==` instead of `===`
- Console.log statements (warnings)

### Configuration Files
- `.husky/pre-commit`: The pre-commit hook script
- `eslint.config.js`: ESLint configuration
- `.prettierrc`: Prettier configuration
- `.prettierignore`: Files to ignore for formatting
- `package.json`: Contains lint-staged configuration

This setup ensures code quality and consistency across the project!
