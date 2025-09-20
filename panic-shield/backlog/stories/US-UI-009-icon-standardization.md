# User Story: Icon System Standardization

## Story
As a user, I want consistent iconography throughout the app so that the interface feels cohesive and icons are easily recognizable across all features.

## Current State
- Mix of emoji and line icons
- Inconsistent icon styles
- Different icon sizes without system
- No standardized icon library

## Acceptance Criteria
- [ ] Single icon library adopted (Lucide React)
- [ ] Consistent icon sizes (16px, 20px, 24px, 32px)
- [ ] Replace all emojis with proper icons
- [ ] Consistent stroke width (2px)
- [ ] Icon color system established
- [ ] Accessibility labels for all icons

## Technical Requirements
```typescript
// Icon System
import { LucideIcon } from 'lucide-react';

// Icon Sizes
const iconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40
} as const;

// Icon Component Wrapper
interface IconProps {
  icon: LucideIcon;
  size?: keyof typeof iconSizes;
  color?: string;
  label: string; // Required for accessibility
}

const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 'md',
  color = 'currentColor',
  label
}) => (
  <IconComponent
    size={iconSizes[size]}
    color={color}
    aria-label={label}
    strokeWidth={2}
  />
);
```

## Implementation Tasks
- [ ] Audit all current icon usage
- [ ] Replace emojis with Lucide icons
- [ ] Create Icon wrapper component
- [ ] Standardize icon sizes
- [ ] Update all icon implementations
- [ ] Add accessibility labels
- [ ] Document icon usage guidelines

## Icon Replacements
- 😡 → Angry icon
- 😢 → Frown icon
- 😊 → Smile icon
- 😱 → AlertCircle icon
- 💚 → Heart icon
- 🏆 → Trophy icon
- 🔥 → Flame icon

## Testing
- Visual consistency review
- Icon recognition testing
- Accessibility audit
- Cross-browser rendering
- Dark mode compatibility
- Screen reader testing

## Effort Estimate
**Size**: Medium (2-3 days)