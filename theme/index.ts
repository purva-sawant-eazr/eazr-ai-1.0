/**
 * Theme Export Index
 * Central export file for all theme-related utilities
 *
 * Usage:
 * import { colors, theme, cn } from '@/theme';
 * import { brand, text } from '@/theme';
 */

// Export colors
export {
  colors,
  gradients,
  colorUtils,
  brand,
  text,
  background,
  border,
  status,
} from './colors';

// Export className utilities
export {
  buttonStyles,
  cardStyles,
  badgeStyles,
  inputStyles,
  backgroundStyles,
  textStyles,
  layoutStyles,
  transitionStyles,
  borderRadiusStyles,
  shadowStyles,
  theme,
  cn,
} from './classNames';

// Re-export everything as default
import { colors, gradients, colorUtils } from './colors';
import { theme, cn } from './classNames';

export default {
  colors,
  gradients,
  colorUtils,
  theme,
  cn,
};
