/**
 * Utility functions for formatting values throughout the app
 */

/**
 * Format price to Tunisian Dinar format
 * @param {number} price - The price to format
 * @returns {string} Formatted price (e.g., "120,00")
 */
export const formatPrice = (price) => {
  return price.toFixed(2).replace('.', ',');
};

/**
 * Format price with currency
 * @param {number} price - The price to format
 * @returns {string} Formatted price with currency (e.g., "120,00 DT")
 */
export const formatPriceWithCurrency = (price) => {
  return `${formatPrice(price)} DT`;
};

/**
 * Get category label in French
 * @param {string} categoryId - The category identifier
 * @returns {string} French category label
 */
export const getCategoryLabel = (categoryId) => {
  const labels = {
    maquillage: 'Maquillage',
    soins: 'Soins',
    parfums: 'Parfums',
    accessoires: 'Accessoires',
  };
  return labels[categoryId] || categoryId;
};

/**
 * Truncate text to specified length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength).trim()}...`;
};

/**
 * Generate a unique ID
 * @returns {string} Unique identifier
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Debounce function for search inputs
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Get stock status info
 * @param {number} stock - Stock quantity
 * @returns {object} Status object with class and text
 */
export const getStockStatus = (stock) => {
  if (stock === 0) {
    return { variant: 'outOfStock', text: 'Rupture de stock', available: false };
  }
  if (stock <= 5) {
    return { variant: 'lowStock', text: `Plus que ${stock} en stock`, available: true };
  }
  return { variant: 'inStock', text: 'En stock', available: true };
};

/**
 * Scroll to top of page smoothly
 */
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Check if device is mobile
 * @returns {boolean}
 */
export const isMobile = () => {
  return window.innerWidth < 768;
};
