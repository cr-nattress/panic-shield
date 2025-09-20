# US-GND-006: Implement Progress Indicators

## User Story
**As a** user going through the grounding exercise
**I want** to see my progress through the 5-4-3-2-1 technique
**So that** I know how many steps remain and feel motivated to complete

## Priority: P2 (Medium)
## Story Points: 3
## Sprint: Next

## Problem
- No indication of current step (5 see, 4 hear, 3 touch, 2 smell, 1 taste)
- Users don't know how many steps remain
- No sense of accomplishment as they progress
- Missing visual feedback for completed sections

## Acceptance Criteria
- [ ] Progress dots show 5 steps clearly
- [ ] Current step is highlighted
- [ ] Completed steps show different state
- [ ] Step transitions are animated
- [ ] Progress persists if user navigates away

## Technical Tasks
1. **Create progress component**
   ```jsx
   const ProgressIndicator = ({ currentStep, totalSteps }) => (
     <div className="progress-container">
       <div className="progress-dots">
         {[...Array(totalSteps)].map((_, i) => (
           <div
             key={i}
             className={`progress-dot ${
               i < currentStep ? 'completed' :
               i === currentStep ? 'active' : ''
             }`}
           />
         ))}
       </div>
       <p className="progress-label">
         Step {currentStep + 1} of {totalSteps}
       </p>
     </div>
   );
   ```

2. **Style progress indicators**
   ```css
   .progress-dots {
     display: flex;
     justify-content: center;
     gap: 8px;
     margin: 20px 0;
   }
   
   .progress-dot {
     width: 8px;
     height: 8px;
     border-radius: 50%;
     background: rgba(255, 255, 255, 0.3);
     transition: all 0.3s ease;
   }
   
   .progress-dot.active {
     background: white;
     transform: scale(1.3);
     box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
   }
   
   .progress-dot.completed {
     background: rgba(76, 175, 80, 0.8);
   }
   ```

3. **Add step labels**
   ```css
   .step-header {
     display: flex;
     align-items: center;
     gap: 12px;
     margin-bottom: 16px;
   }
   
   .step-number {
     background: rgba(255, 255, 255, 0.2);
     border-radius: 50%;
     width: 32px;
     height: 32px;
     display: flex;
     align-items: center;
     justify-content: center;
     font-weight: bold;
   }
   ```

4. **Animate transitions**
   ```css
   @keyframes pulse {
     0%, 100% { transform: scale(1); }
     50% { transform: scale(1.1); }
   }
   
   .progress-dot.active {
     animation: pulse 2s infinite;
   }
   ```

## UI Issues Being Fixed
| Issue | Current State | Fixed State |
|-------|--------------|------------|
| Progress visibility | None | 5 clear dots |
| Current position | Unknown | Highlighted dot |
| Steps remaining | Unknown | Visual count |
| Completion feedback | None | Green dots |
| Step context | Missing | Labels added |

## Testing Checklist
- [ ] Progress updates correctly
- [ ] Animations are smooth
- [ ] State persists on refresh
- [ ] Works with keyboard navigation
- [ ] Clear on all screen sizes

## Files to Modify
- `/components/panic/GroundingExercise.tsx`
- Create new ProgressIndicator component

## Definition of Done
- [ ] Progress indicator implemented
- [ ] All states visually distinct
- [ ] Animations working
- [ ] Component reusable
- [ ] Tests written and passing