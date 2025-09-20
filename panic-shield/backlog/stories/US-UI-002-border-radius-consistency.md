# User Story: Border Radius Consistency

## Story
As a user, I want consistent corner rounding throughout the app so that the interface feels cohesive and professionally designed.

## Current State
- Panic page has inconsistent corner rounding
- Different border radius values across components
- No standardized system for rounded corners
- Visual inconsistency between cards and buttons

## Acceptance Criteria
- [ ] Establish border radius design tokens
- [ ] Cards use 12-16px border radius consistently
- [ ] Buttons use 8px border radius consistently
- [ ] Input fields use 6px border radius
- [ ] Modal dialogs use 16px border radius
- [ ] Small elements (badges, chips) use 4px border radius

## Technical Requirements
```css
/* Border Radius Tokens */
--radius-xs: 4px;   /* Badges, chips */
--radius-sm: 6px;   /* Input fields */
--radius-md: 8px;   /* Buttons */
--radius-lg: 12px;  /* Cards */
--radius-xl: 16px;  /* Modals, large cards */
--radius-2xl: 20px; /* Special emphasis */
--radius-full: 9999px; /* Circular elements */
```

## Implementation Tasks
- [ ] Create border radius design tokens
- [ ] Audit all components for border radius usage
- [ ] Update card components
- [ ] Update button components
- [ ] Update input components
- [ ] Update modal components
- [ ] Test visual consistency

## Testing
- Visual regression testing
- Component audit checklist
- Design review
- Cross-browser rendering

## Effort Estimate
**Size**: Small (1-2 days)