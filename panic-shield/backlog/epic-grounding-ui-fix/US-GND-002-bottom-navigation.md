# US-GND-002: Restore Bottom Navigation

## User Story
**As a** user in the grounding exercise
**I want** to see and use the bottom navigation menu
**So that** I can navigate to other sections or exit the exercise if needed

## Priority: P0 (Critical)
## Story Points: 5
## Sprint: Current

## Problem
- Bottom navigation is completely missing from the grounding exercise screen
- Users are trapped in the exercise with no way to exit
- No visual indication of other available features
- Inconsistent navigation experience across the app

## Acceptance Criteria
- [ ] Bottom navigation is visible on grounding exercise screen
- [ ] Navigation does not overlap with content
- [ ] All navigation items are clickable and functional
- [ ] Active state correctly shows "Panic" tab
- [ ] Navigation remains fixed at bottom during scroll

## Technical Tasks
1. **Import and add BottomNav component**
   ```jsx
   import BottomNav from '@/components/BottomNav';

   return (
     <div className="grounding-container">
       {/* existing content */}
       <BottomNav activeTab="panic" />
     </div>
   );
   ```

2. **Fix positioning styles**
   ```css
   .bottom-nav {
     position: fixed;
     bottom: 0;
     left: 0;
     right: 0;
     height: 72px;
     background: rgba(255, 255, 255, 0.95);
     backdrop-filter: blur(10px);
     border-top: 1px solid rgba(255, 255, 255, 0.2);
     z-index: 1000;
   }
   ```

3. **Adjust main content padding**
   ```css
   .main-content {
     padding-bottom: 88px; /* 72px nav + 16px spacing */
   }
   ```

4. **Ensure safe area for iOS devices**
   ```css
   .bottom-nav {
     padding-bottom: env(safe-area-inset-bottom);
   }
   ```

## UI Issues Being Fixed
| Issue | Current State | Fixed State |
|-------|--------------|------------|
| Navigation visibility | Hidden | Always visible |
| Content overlap | N/A | 88px bottom padding |
| Exit capability | None | Full navigation |
| iOS safe area | Not handled | Proper insets |

## Testing Checklist
- [ ] Verify navigation visible on all screen sizes
- [ ] Test navigation links work correctly
- [ ] Confirm no content is hidden behind nav
- [ ] Test on iPhone with notch/home indicator
- [ ] Verify scroll behavior doesn't affect nav
- [ ] Test landscape orientation

## Files to Modify
- `/components/panic/GroundingExercise.tsx`
- `/components/BottomNav.tsx` (verify styles)
- Component parent container styles

## Definition of Done
- [ ] Navigation visible and functional
- [ ] No content overlap issues
- [ ] Works on all device types
- [ ] Consistent with other screens
- [ ] Code reviewed and approved