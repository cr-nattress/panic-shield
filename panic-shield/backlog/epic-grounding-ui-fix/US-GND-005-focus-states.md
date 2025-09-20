# US-GND-005: Add Focus and Interaction States

## User Story
**As a** user navigating with keyboard or assistive technology
**I want** clear visual feedback when interacting with elements
**So that** I know which element is active and my inputs are registered

## Priority: P2 (Medium)
## Story Points: 3
## Sprint: Next

## Problem
- No visible focus indicators on inputs
- Missing hover states
- No feedback when typing
- Unclear which field is active
- Poor keyboard navigation experience

## Acceptance Criteria
- [ ] Visible focus ring on all interactive elements
- [ ] Focus states meet WCAG contrast requirements
- [ ] Hover states for desktop users
- [ ] Active/typing feedback
- [ ] Smooth transitions between states

## Technical Tasks
1. **Add focus indicators**
   ```css
   .grounding-input:focus {
     outline: 2px solid rgba(255, 255, 255, 0.8);
     outline-offset: 2px;
     border-color: rgba(255, 255, 255, 0.8);
     background: rgba(255, 255, 255, 0.15);
     transform: translateY(-2px);
     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
   }
   
   .grounding-input:focus-visible {
     outline: 3px solid #FFD700;
     outline-offset: 2px;
   }
   ```

2. **Implement hover states**
   ```css
   @media (hover: hover) {
     .grounding-input:hover:not(:focus) {
       border-color: rgba(255, 255, 255, 0.5);
       background: rgba(255, 255, 255, 0.05);
     }
     
     .continue-button:hover {
       transform: translateY(-2px);
       box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
     }
   }
   ```

3. **Add typing feedback**
   ```css
   .grounding-input:not(:placeholder-shown) {
     background: rgba(255, 255, 255, 0.1);
     border-color: rgba(76, 175, 80, 0.6);
   }
   
   .grounding-input.has-value {
     font-weight: 500;
   }
   ```

4. **Transition animations**
   ```css
   .grounding-input,
   .continue-button {
     transition: all 0.3s ease;
     transition-property: transform, border-color, 
                        background-color, box-shadow;
   }
   ```

## UI Issues Being Fixed
| Issue | Current State | Fixed State |
|-------|--------------|------------|
| Focus indicator | None | 2px white outline |
| Keyboard focus | Invisible | Golden outline |
| Hover feedback | None | Subtle lift |
| Input feedback | None | Color change |
| Transitions | None | 0.3s smooth |

## Testing Checklist
- [ ] Tab through all elements
- [ ] Test with screen reader
- [ ] Verify focus trap works
- [ ] Test on touch devices (no hover)
- [ ] Check high contrast mode
- [ ] Validate color contrast

## Files to Modify
- `/components/panic/GroundingExercise.tsx`
- Focus styles CSS file

## Definition of Done
- [ ] All elements have focus states
- [ ] Keyboard navigation works
- [ ] States are clearly visible
- [ ] Transitions are smooth
- [ ] Accessibility testing passed