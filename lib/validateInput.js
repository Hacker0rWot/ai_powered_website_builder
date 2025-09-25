// lib/validateInput.js

export const validateInput = (input) => {
  const normalizedInput = input.trim().toLowerCase();

  // Define valid input patterns or keywords
  const validPatterns = [
    /create a website/i,
    /generate code for/i,
    /build a page for/i,
  ];

  // Check if input matches any valid pattern
  return validPatterns.some((pattern) => pattern.test(normalizedInput));
};
