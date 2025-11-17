/**
 * Global Color Palette
 * This file contains all the commonly used colors across the application.
 * Import and use these colors instead of hardcoding hex values.
 */

export const colors = {
  // Brand Colors - Primary Teal/Green
  brand: {
    primary: '#028678',      // Main brand color - used for CTAs, text, borders
    secondary: '#00A896',    // Secondary brand color - gradients, accents
    dark: '#05665B',         // Dark teal - deep backgrounds, gradient endpoints
    light: '#F3F7F6',        // Light teal background
    overlay: 'rgba(2, 134, 120, 0.1)',  // 10% opacity overlay
  },

  // Text Colors
  text: {
    primary: '#0E121B',      // Main text color
    secondary: '#4B5563',    // Secondary text, subtitles
    tertiary: '#6B7280',     // Lighter text, placeholders, muted content
    disabled: '#9CA3AF',     // Disabled/placeholder text
  },

  // Background Colors
  background: {
    white: '#FFFFFF',        // Pure white backgrounds
    light: '#F9FAFB',        // Light background for sections
    lightTeal: '#F3F7F6',    // Light teal background
    gray: '#E5E7EB',         // Light gray background
  },

  // Border Colors
  border: {
    light: '#E5E7EB',        // Light borders, dividers
    medium: '#D1D5DB',       // Medium borders
    dark: '#9CA3AF',         // Dark borders
  },

  // Status Colors
  status: {
    error: '#FB3748',        // Error states, delete buttons
    errorAlt: '#E93544',     // Alternative error color
    success: '#009934',      // Success indicators, positive metrics
    warning: '#F59E0B',      // Warning states
    info: '#3B82F6',         // Information states
  },

  // Static Colors (don't change with theme)
  static: {
    white: '#FFFFFF',
    black: '#0E121B',
  },
} as const;

/**
 * Gradient Combinations
 * Common gradient patterns used throughout the app
 */
export const gradients = {
  // Brand gradients
  brandPrimary: `linear-gradient(to right, ${colors.brand.primary}, ${colors.brand.secondary})`,
  brandDark: `linear-gradient(to bottom right, ${colors.brand.primary}, ${colors.brand.secondary}, ${colors.brand.dark})`,

  // Light backgrounds
  lightBackground: `linear-gradient(to bottom right, ${colors.background.light}, ${colors.background.white}, ${colors.background.lightTeal})`,

  // Text gradients
  brandText: `linear-gradient(to right, ${colors.brand.primary}, ${colors.brand.secondary}, ${colors.brand.dark})`,
} as const;

/**
 * Color utility functions
 * Helper functions to work with colors
 */
export const colorUtils = {
  /**
   * Convert hex to rgba with opacity
   * @param hex - Hex color code
   * @param alpha - Opacity value (0-1)
   */
  hexToRgba: (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },

  /**
   * Get brand color with opacity
   * @param opacity - Opacity value (0-1)
   */
  brandWithOpacity: (opacity: number): string => {
    return colorUtils.hexToRgba(colors.brand.primary, opacity);
  },
} as const;

// Export individual color categories for convenience
export const { brand, text, background, border, status } = colors;
