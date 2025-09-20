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

## Git Commit Guidelines

### Commit After Completion
**IMPORTANT**: Create a commit immediately after completing this user story.

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

Fixes: <story-id>
```

### Example Commit
```bash
git add -A
git commit -m "style(ui): improve UI consistency and accessibility

- Increased placeholder opacity from 0.2 to 0.7
- Fixed text contrast to meet WCAG AA standards (4.5:1)
- Added text shadows for better legibility
- Improved icon visibility with drop shadows

Fixes: US-UI-009-icon-standardization"
```

### Commit Types
- `feat`: New feature
- `fix`: Bug fix or improvement
- `refactor`: Code refactoring
- `style`: CSS/styling changes
- `docs`: Documentation only
- `test`: Test additions/changes
- `perf`: Performance improvements

### Pre-Commit Checklist
- [ ] All tests passing
- [ ] Lint checks passed
- [ ] Visual regression captured
- [ ] Story acceptance criteria met
- [ ] Code reviewed (if applicable)

### Push Guidelines
1. Commit locally first
2. Run tests: `npm test`
3. Push to feature branch: `git push origin feature/<story-id>`
4. Create PR if ready for review
