/**
 * Reusable Tailwind CSS Class Names
 * This file contains common className patterns used throughout the application.
 * Use these pre-defined classes for consistency across components.
 */

/**
 * Button Styles
 * Common button variations
 */
export const buttonStyles = {
  // Primary CTA Button with gradient
  primary: 'inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg',

  // Secondary outline button
  secondary: 'bg-white text-brand-primary border-2 border-brand-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-brand-primary hover:text-white transition-all duration-300',

  // Small primary button
  primarySmall: 'inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300',

  // Icon button
  icon: 'group text-0 transition-colors hover:fill-brand-secondary',

  // Danger/Delete button
  danger: 'inline-flex items-center gap-2 bg-status-error text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-all duration-300',
} as const;

/**
 * Card Styles
 * Common card and container patterns
 */
export const cardStyles = {
  // Feature card with hover effect
  feature: 'relative bg-white rounded-2xl p-8 border-2 border-border-light hover:border-brand-primary/30 transition-all duration-300 shadow-lg hover:shadow-2xl group',

  // Simple white card
  simple: 'bg-white rounded-xl p-6 shadow-md border border-border-light',

  // Modal/Panel card
  modal: 'bg-white rounded-2xl p-5.5 shadow-[0_0_1.25rem_0_rgba(0,0,0,0.02)]',

  // Large section card
  section: 'bg-white rounded-3xl p-12 max-lg:p-8 max-md:p-6 shadow-xl',

  // Interactive card with hover
  interactive: 'bg-white rounded-xl p-6 border border-border-light hover:border-brand-primary hover:shadow-lg transition-all duration-300 cursor-pointer',
} as const;

/**
 * Badge Styles
 * Tag and badge variations
 */
export const badgeStyles = {
  // Primary brand badge
  primary: 'inline-flex items-center gap-2 bg-brand-primary/10 rounded-full px-5 py-2.5 border border-brand-primary/20 text-brand-primary text-sm font-medium',

  // Small badge
  small: 'inline-flex items-center gap-1 bg-brand-primary/10 rounded-full px-3 py-1 text-brand-primary text-xs font-medium',

  // Success badge
  success: 'inline-flex items-center gap-2 bg-status-success/10 rounded-full px-4 py-1.5 text-status-success text-sm font-medium',

  // Error badge
  error: 'inline-flex items-center gap-2 bg-status-error/10 rounded-full px-4 py-1.5 text-status-error text-sm font-medium',
} as const;

/**
 * Input/Form Field Styles
 * Form element patterns
 */
export const inputStyles = {
  // Standard text input
  text: 'w-full border border-stroke-soft-200 text-strong-950 transition-colors outline-0 focus:!border-blue-500 rounded-xl p-4',

  // Textarea
  textarea: 'w-full border border-stroke-soft-200 text-strong-950 transition-colors outline-0 focus:!border-blue-500 rounded-xl p-4 resize-none',

  // Input with error
  error: 'w-full border-2 border-status-error text-strong-950 transition-colors outline-0 rounded-xl p-4',

  // Select dropdown
  select: 'w-full border border-stroke-soft-200 text-strong-950 transition-colors outline-0 focus:!border-blue-500 rounded-xl p-4 bg-white cursor-pointer',
} as const;

/**
 * Background Styles
 * Section and container backgrounds
 */
export const backgroundStyles = {
  // Light gradient background
  lightGradient: 'bg-gradient-to-br from-background-light via-white to-background-lightTeal',

  // Brand gradient background
  brandGradient: 'bg-gradient-to-r from-brand-primary to-brand-secondary',

  // Dark brand gradient
  brandDark: 'bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-dark',

  // White background
  white: 'bg-white',

  // Light section
  light: 'bg-background-light',
} as const;

/**
 * Text Styles
 * Typography patterns
 */
export const textStyles = {
  // Hero heading
  hero: 'text-6xl max-lg:text-5xl max-md:text-4xl max-sm:text-3xl font-bold text-text-primary',

  // Section heading
  heading: 'text-4xl max-lg:text-3xl max-md:text-2xl font-bold text-text-primary',

  // Subheading
  subheading: 'text-2xl max-md:text-xl font-semibold text-text-primary',

  // Body text
  body: 'text-base text-text-secondary',

  // Small text
  small: 'text-sm text-text-tertiary',

  // Gradient text (brand colors)
  gradient: 'bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-dark bg-clip-text text-transparent',

  // Link text
  link: 'text-brand-primary hover:text-brand-secondary transition-colors duration-200 cursor-pointer',
} as const;

/**
 * Layout Styles
 * Container and layout patterns
 */
export const layoutStyles = {
  // Container with max width
  container: 'max-w-7xl mx-auto px-6 max-lg:px-4',

  // Wide container
  containerWide: 'max-w-screen-2xl mx-auto px-6 max-lg:px-4',

  // Flex center
  flexCenter: 'flex items-center justify-center',

  // Flex between
  flexBetween: 'flex items-center justify-between',

  // Grid 2 columns
  grid2: 'grid grid-cols-2 max-md:grid-cols-1 gap-6',

  // Grid 3 columns
  grid3: 'grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6',

  // Grid 4 columns
  grid4: 'grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6',
} as const;

/**
 * Transition/Animation Styles
 * Common animation patterns
 */
export const transitionStyles = {
  // Standard transition
  default: 'transition-all duration-300',

  // Fast transition
  fast: 'transition-all duration-150',

  // Slow transition
  slow: 'transition-all duration-500',

  // Scale on hover
  scaleHover: 'hover:scale-105 transition-transform duration-300',

  // Shadow on hover
  shadowHover: 'hover:shadow-xl transition-shadow duration-300',

  // Combined hover effect
  cardHover: 'hover:scale-105 hover:shadow-xl transition-all duration-300',
} as const;

/**
 * Border Radius Styles
 * Consistent rounded corners
 */
export const borderRadiusStyles = {
  full: 'rounded-full',
  '3xl': 'rounded-3xl',
  '2xl': 'rounded-2xl',
  xl: 'rounded-xl',
  lg: 'rounded-lg',
  md: 'rounded-md',
  sm: 'rounded-sm',
} as const;

/**
 * Shadow Styles
 * Consistent shadow levels
 */
export const shadowStyles = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  custom: 'shadow-[0_0_1.25rem_0_rgba(0,0,0,0.03)]',
} as const;

/**
 * Utility function to combine class names
 * @param classes - Array of class names to combine
 * @returns Combined class name string
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Export all styles as a single object for convenience
export const theme = {
  button: buttonStyles,
  card: cardStyles,
  badge: badgeStyles,
  input: inputStyles,
  background: backgroundStyles,
  text: textStyles,
  layout: layoutStyles,
  transition: transitionStyles,
  borderRadius: borderRadiusStyles,
  shadow: shadowStyles,
} as const;
