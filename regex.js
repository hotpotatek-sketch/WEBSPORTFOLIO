// Regex Validation Utilities
// Email and Password validation for the portfolio

const regexPatterns = {
  // Email validation: Standard email format
  // Matches: user@domain.com, name.surname@company.co.uk, etc.
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // Password validation: At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  // Matches: MyPass123!, Secure@Pass456, etc.
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

  // Username validation: Alphanumeric, underscore, hyphen (3-20 chars)
  username: /^[a-zA-Z0-9_-]{3,20}$/,

  // Phone number validation: International format or local
  // Matches: +63 123 456 7890, 09184208417, etc.
  phone: /^(\+\d{1,3}[-.\s]?)?\d{7,}$/,

  // URL validation
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
};

/**
 * Validates email address
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
function validateEmail(email) {
  return regexPatterns.email.test(email);
}

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {object} - Validation result with details
 */
function validatePassword(password) {
  const result = {
    isValid: regexPatterns.password.test(password),
    requirements: {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[@$!%*?&]/.test(password),
    },
  };
  return result;
}

/**
 * Gets password validation error message
 * @param {object} requirements - Password requirements object
 * @returns {string} - Error message
 */
function getPasswordError(requirements) {
  const errors = [];
  if (!requirements.length) errors.push("at least 8 characters");
  if (!requirements.uppercase) errors.push("one uppercase letter");
  if (!requirements.lowercase) errors.push("one lowercase letter");
  if (!requirements.number) errors.push("one number");
  if (!requirements.specialChar) errors.push("one special character (@$!%*?&)");

  return `Password must contain ${errors.join(", ")}.`;
}

/**
 * Validates username format
 * @param {string} username - Username to validate
 * @returns {boolean} - True if valid username format
 */
function validateUsername(username) {
  return regexPatterns.username.test(username);
}

/**
 * Validates phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid phone format
 */
function validatePhone(phone) {
  return regexPatterns.phone.test(phone);
}

/**
 * Validates URL
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid URL format
 */
function validateUrl(url) {
  return regexPatterns.url.test(url);
}

/**
 * Sanitizes input to prevent XSS attacks
 * @param {string} input - User input to sanitize
 * @returns {string} - Sanitized input
 */
function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    regexPatterns,
    validateEmail,
    validatePassword,
    getPasswordError,
    validateUsername,
    validatePhone,
    validateUrl,
    sanitizeInput,
  };
}
