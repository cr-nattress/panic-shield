# US-002: Emotion Refinement

## Story
As a user, I want to refine my emotion selection

## Acceptance Criteria
- GIVEN I selected a core emotion
- WHEN I want more precision
- THEN I see related sub-emotions in that color family
- AND can tap to select or skip for speed
- **UX**: Progressive disclosure, optional depth

## Tasks

### 1. Design Tasks
- [ ] Design sub-emotion selection UI
- [ ] Create color variations for sub-emotions
- [ ] Design skip/continue flow
- [ ] Create educational tooltips for emotions

### 2. Frontend Implementation
- [ ] Create SubEmotionSelector component
- [ ] Implement emotion hierarchy navigation
- [ ] Add skip functionality
- [ ] Implement progressive disclosure animation
- [ ] Add emotion definitions/descriptions

### 3. Data Management
- [ ] Define sub-emotion mappings
- [ ] Create emotion taxonomy structure
- [ ] Implement selection state management
- [ ] Add sub-emotion to log schema

### 4. User Experience
- [ ] Add onboarding for feature discovery
- [ ] Implement smart suggestions based on history
- [ ] Create quick-skip gesture
- [ ] Add recent selections for quick access

### 5. Testing
- [ ] Test emotion hierarchy navigation
- [ ] Validate skip flow doesn't break logging
- [ ] Test color accessibility
- [ ] Performance testing with full emotion tree
- [ ] A/B test refinement vs. simple selection

## Definition of Done
- [ ] Sub-emotions properly mapped to cores
- [ ] Skip flow maintains < 30s target
- [ ] Feature is truly optional
- [ ] All emotion descriptions accurate
- [ ] Tests passing
- [ ] Documentation complete

## Priority: P1 (MVP - Phase 1)
## Estimated Effort: 3 story points
## Dependencies: US-001