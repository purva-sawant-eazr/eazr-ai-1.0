# Theme System Examples

Practical examples showing how to use the theme system in your components.

## Basic Examples

### Example 1: Simple Button Component

**Before (Hardcoded):**
```tsx
export const MyButton = () => (
  <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#028678] to-[#00A896] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg">
    Click Me
  </button>
);
```

**After (Using Theme):**
```tsx
import { buttonStyles } from '@/theme';

export const MyButton = () => (
  <button className={buttonStyles.primary}>
    Click Me
  </button>
);
```

---

### Example 2: Feature Card Component

**Before (Hardcoded):**
```tsx
export const FeatureCard = ({ title, description }) => (
  <div className="relative bg-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#028678]/30 transition-all duration-300 shadow-lg hover:shadow-2xl group">
    <span className="inline-flex items-center gap-2 bg-[#028678]/10 rounded-full px-5 py-2.5 border border-[#028678]/20 text-[#028678] text-sm font-medium">
      New
    </span>
    <h3 className="text-[#0E121B] text-2xl font-bold mt-4">{title}</h3>
    <p className="text-[#4B5563] mt-2">{description}</p>
  </div>
);
```

**After (Using Theme):**
```tsx
import { cardStyles, badgeStyles, textStyles } from '@/theme';

export const FeatureCard = ({ title, description }) => (
  <div className={cardStyles.feature}>
    <span className={badgeStyles.primary}>New</span>
    <h3 className={cn(textStyles.subheading, "mt-4")}>{title}</h3>
    <p className={cn("text-text-secondary", "mt-2")}>{description}</p>
  </div>
);
```

---

### Example 3: Form Input Component

**Before (Hardcoded):**
```tsx
export const FormInput = ({ error, ...props }) => (
  <div>
    <input
      className={`w-full border ${error ? 'border-2 border-[#FB3748]' : 'border-[#E5E7EB]'} text-[#0E121B] transition-colors outline-0 focus:!border-[#335cff] rounded-xl p-4`}
      {...props}
    />
    {error && (
      <span className="text-[#FB3748] text-sm mt-1 block">{error}</span>
    )}
  </div>
);
```

**After (Using Theme):**
```tsx
import { inputStyles, cn } from '@/theme';

export const FormInput = ({ error, ...props }) => (
  <div>
    <input
      className={cn(
        error ? inputStyles.error : inputStyles.text
      )}
      {...props}
    />
    {error && (
      <span className="text-status-error text-sm mt-1 block">{error}</span>
    )}
  </div>
);
```

---

## Advanced Examples

### Example 4: Hero Section with Gradient

**Before:**
```tsx
export const HeroSection = () => (
  <section className="bg-gradient-to-br from-[#F9FAFB] via-white to-[#F3F7F6] overflow-hidden py-20">
    <div className="max-w-7xl mx-auto px-6">
      <h1 className="text-6xl max-lg:text-5xl max-md:text-4xl max-sm:text-3xl font-bold text-[#0E121B]">
        <span className="bg-gradient-to-r from-[#028678] via-[#00A896] to-[#05665B] bg-clip-text text-transparent">
          Welcome to Eazr
        </span>
      </h1>
      <p className="text-[#4B5563] text-lg mt-6">
        The best platform for your needs
      </p>
      <div className="flex gap-4 mt-8">
        <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#028678] to-[#00A896] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg">
          Get Started
        </button>
        <button className="bg-white text-[#028678] border-2 border-[#028678] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#028678] hover:text-white transition-all duration-300">
          Learn More
        </button>
      </div>
    </div>
  </section>
);
```

**After:**
```tsx
import { backgroundStyles, layoutStyles, textStyles, buttonStyles, cn } from '@/theme';

export const HeroSection = () => (
  <section className={cn(backgroundStyles.lightGradient, "overflow-hidden py-20")}>
    <div className={layoutStyles.container}>
      <h1 className={textStyles.hero}>
        <span className={textStyles.gradient}>
          Welcome to Eazr
        </span>
      </h1>
      <p className={cn(textStyles.body, "text-lg mt-6")}>
        The best platform for your needs
      </p>
      <div className="flex gap-4 mt-8">
        <button className={buttonStyles.primary}>
          Get Started
        </button>
        <button className={buttonStyles.secondary}>
          Learn More
        </button>
      </div>
    </div>
  </section>
);
```

---

### Example 5: Status Badge Component

**Before:**
```tsx
export const StatusBadge = ({ status }: { status: 'success' | 'error' | 'warning' }) => {
  const getStyles = () => {
    switch (status) {
      case 'success':
        return 'bg-[#009934]/10 text-[#009934] border-[#009934]/20';
      case 'error':
        return 'bg-[#FB3748]/10 text-[#FB3748] border-[#FB3748]/20';
      case 'warning':
        return 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20';
    }
  };

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium border ${getStyles()}`}>
      {status}
    </span>
  );
};
```

**After:**
```tsx
import { badgeStyles, cn } from '@/theme';

export const StatusBadge = ({ status }: { status: 'success' | 'error' | 'warning' }) => {
  const getStyles = () => {
    switch (status) {
      case 'success':
        return badgeStyles.success;
      case 'error':
        return badgeStyles.error;
      case 'warning':
        return 'inline-flex items-center gap-2 bg-status-warning/10 rounded-full px-4 py-1.5 text-status-warning text-sm font-medium';
    }
  };

  return (
    <span className={getStyles()}>
      {status}
    </span>
  );
};
```

---

### Example 6: Grid Layout Component

**Before:**
```tsx
export const FeatureGrid = ({ features }) => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl max-lg:text-3xl max-md:text-2xl font-bold text-[#0E121B] text-center mb-12">
        Our Features
      </h2>
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-[#E5E7EB] hover:border-[#028678] hover:shadow-lg transition-all duration-300 cursor-pointer">
            <h3 className="text-xl font-semibold text-[#0E121B]">{feature.title}</h3>
            <p className="text-[#6B7280] text-sm mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
```

**After:**
```tsx
import { layoutStyles, textStyles, cardStyles, cn } from '@/theme';

export const FeatureGrid = ({ features }) => (
  <section className="py-20 bg-white">
    <div className={layoutStyles.container}>
      <h2 className={cn(textStyles.heading, "text-center mb-12")}>
        Our Features
      </h2>
      <div className={layoutStyles.grid3}>
        {features.map((feature, index) => (
          <div key={index} className={cardStyles.interactive}>
            <h3 className={cn(textStyles.subheading, "text-xl")}>{feature.title}</h3>
            <p className={cn(textStyles.small, "mt-2")}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
```

---

### Example 7: Conditional Styling with Theme

**Before:**
```tsx
export const AlertBox = ({ type, message }: { type: 'info' | 'error' | 'success', message: string }) => {
  const getBgColor = () => {
    switch (type) {
      case 'info': return '#3B82F6';
      case 'error': return '#FB3748';
      case 'success': return '#009934';
    }
  };

  return (
    <div
      className="rounded-xl p-4 text-white"
      style={{ backgroundColor: getBgColor() }}
    >
      {message}
    </div>
  );
};
```

**After:**
```tsx
import { cn } from '@/theme';

export const AlertBox = ({ type, message }: { type: 'info' | 'error' | 'success', message: string }) => {
  const getClasses = () => {
    switch (type) {
      case 'info': return 'bg-status-info';
      case 'error': return 'bg-status-error';
      case 'success': return 'bg-status-success';
    }
  };

  return (
    <div className={cn("rounded-xl p-4 text-white", getClasses())}>
      {message}
    </div>
  );
};
```

---

## Using with Existing Components

### Example 8: Updating Sidebar Component

Let's say you have the Sidebar component at [components/Sidebar/index.tsx](../components/Sidebar/index.tsx):

**Current approach (example section):**
```tsx
<div className="text-[#4B5563] hover:text-[#028678] transition-colors">
  Menu Item
</div>
```

**Updated with theme:**
```tsx
import { cn } from '@/theme';

<div className={cn("text-text-secondary hover:text-brand-primary transition-colors")}>
  Menu Item
</div>
```

---

### Example 9: Dynamic Color with Opacity

**Before:**
```tsx
export const Overlay = ({ isVisible }: { isVisible: boolean }) => (
  <div
    className={`fixed inset-0 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    style={{ backgroundColor: 'rgba(2, 134, 120, 0.24)' }}
  />
);
```

**After:**
```tsx
import { colorUtils, cn } from '@/theme';

export const Overlay = ({ isVisible }: { isVisible: boolean }) => (
  <div
    className={cn(
      "fixed inset-0 transition-opacity",
      isVisible ? 'opacity-100' : 'opacity-0'
    )}
    style={{ backgroundColor: colorUtils.brandWithOpacity(0.24) }}
  />
);
```

---

### Example 10: Complete Modal Component

**Before:**
```tsx
export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl p-5.5 shadow-[0_0_1.25rem_0_rgba(0,0,0,0.02)] max-w-2xl w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6B7280] hover:text-[#0E121B] transition-colors"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
```

**After:**
```tsx
import { cardStyles, layoutStyles, cn } from '@/theme';

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={cn("fixed inset-0 z-50", layoutStyles.flexCenter)}>
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className={cn(cardStyles.modal, "max-w-2xl w-full mx-4 relative")}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
```

---

## Testing Examples

### Example 11: Storybook Integration

```tsx
// Button.stories.tsx
import { buttonStyles } from '@/theme';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;

export const Primary: StoryObj = {
  render: () => (
    <button className={buttonStyles.primary}>
      Primary Button
    </button>
  ),
};

export const Secondary: StoryObj = {
  render: () => (
    <button className={buttonStyles.secondary}>
      Secondary Button
    </button>
  ),
};
```

---

## Best Practices Demonstrated

1. **Import only what you need**: Import specific styles rather than the entire theme object
2. **Use the cn utility**: Combine classes with conditions cleanly
3. **Prefer Tailwind classes**: Use `bg-brand-primary` instead of inline styles when possible
4. **Keep it semantic**: Use meaningful class combinations that explain intent
5. **Maintain flexibility**: Theme doesn't prevent custom styling when needed
6. **Type safety**: Leverage TypeScript for autocomplete and error checking

---

## Migration Checklist

When migrating a component to use the theme system:

- [ ] Replace hardcoded hex colors with theme colors
- [ ] Use pre-defined styles for common patterns (buttons, cards, etc.)
- [ ] Replace inline styles with Tailwind classes where possible
- [ ] Use `cn()` utility for conditional classes
- [ ] Test the component to ensure no visual changes
- [ ] Check responsive behavior is maintained
- [ ] Verify dark mode support if applicable

---

## Common Patterns

### Pattern: Hover States
```tsx
// Before
className="text-[#4B5563] hover:text-[#028678]"

// After
className="text-text-secondary hover:text-brand-primary"
```

### Pattern: Borders
```tsx
// Before
className="border border-[#E5E7EB] hover:border-[#028678]/30"

// After
className="border border-border-light hover:border-brand-primary/30"
```

### Pattern: Gradients
```tsx
// Before
className="bg-gradient-to-r from-[#028678] to-[#00A896]"

// After
className="bg-gradient-to-r from-brand-primary to-brand-secondary"
```

### Pattern: Text with Multiple Styles
```tsx
// Before
<h2 className="text-4xl max-lg:text-3xl max-md:text-2xl font-bold text-[#0E121B]">
  Heading
</h2>

// After
import { textStyles } from '@/theme';
<h2 className={textStyles.heading}>
  Heading
</h2>
```

---

These examples should help you get started with the theme system. Remember, the goal is consistency and maintainability while keeping your code clean and DRY!
