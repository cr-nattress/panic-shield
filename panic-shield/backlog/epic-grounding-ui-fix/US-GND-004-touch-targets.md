# US-GND-004: Enhance Touch Target Sizes

## User Story
**As a** mobile user with shaky hands (due to panic)
**I want** large, easily tappable input areas
**So that** I can successfully interact even when distressed

## Priority: P1 (High)
## Story Points: 2
## Sprint: Current

## Problem
- Input fields are too small for reliable touch interaction
- No visual feedback on touch
- Difficult to tap when hands are shaking
- Buttons lack adequate hit areas
- Form frustrating to use during panic episodes

## Acceptance Criteria
- [ ] All touch targets minimum 44x44px (WCAG standard)
- [ ] Input fields at least 56px tall
- [ ] Buttons have 16px padding minimum
- [ ] Touch feedback visible on interaction
- [ ] Extra tap area around small elements

## Technical Tasks
1. **Increase input field height**
   ```css
   .grounding-input {
     min-height: 56px;
     padding: 16px 20px;
     font-size: 16px; /* Prevent zoom on iOS */
     touch-action: manipulation;
   }
   ```

2. **Enhance button touch areas**
   ```css
   .continue-button {
     min-height: 56px;
     padding: 16px 32px;
     font-size: 16px;
     font-weight: 600;
     position: relative;
   }
   
   /* Invisible touch area extension */
   .continue-button::before {
     content: '';
     position: absolute;
     top: -8px;
     left: -8px;
     right: -8px;
     bottom: -8px;
   }
   ```

3. **Add touch feedback**
   ```css
   .grounding-input:active,
   .continue-button:active {
     transform: scale(0.98);
     transition: transform 0.1s ease;
   }
   
   @media (hover: hover) {
     .grounding-input:hover {
       background: rgba(255, 255, 255, 0.1);
     }
   }
   ```

4. **Icon touch targets**
   ```css
   .icon-button {
     min-width: 44px;
     min-height: 44px;
     display: flex;
     align-items: center;
     justify-content: center;
     padding: 8px;
   }
   ```

## UI Issues Being Fixed
| Issue | Current State | Fixed State |
|-------|--------------|------------|
| Input height | ~40px | 56px |
| Button padding | 8px | 16px/32px |
| Touch feedback | None | Scale animation |
| Icon tap area | 24px | 44px |
| Font size | 14px | 16px (no zoom) |

## Testing Checklist
- [ ] Test with thumb on real device
- [ ] Verify no accidental taps
- [ ] Test with accessibility tools
- [ ] Check iOS zoom prevention
- [ ] Test with gloves/stylus
- [ ] Verify feedback animations

## Files to Modify
- `/components/panic/GroundingExercise.tsx`
- `/app/panic-mode.css`
- Button component styles

## Definition of Done
- [ ] All targets meet 44px minimum
- [ ] Touch feedback working
- [ ] No iOS auto-zoom
- [ ] Tested on real devices
- [ ] Accessibility audit passed