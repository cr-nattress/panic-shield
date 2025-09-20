# US-001: Quick Emotion Log (30 seconds)

## Story
As a user, I want to log my emotion in under 30 seconds

## Acceptance Criteria
- GIVEN I'm on the home screen
- WHEN I tap the prominent "How are you?" button
- THEN I see 6 core emotion tiles with colors
- AND I can select one with a single tap
- AND drag/swipe to set intensity (1-3)
- **Performance**: Time to first tap ≤ 30s, one-thumb operation

## Tasks

### 1. UI/UX Design Tasks
- [ ] Design emotion selection screen with 6 core emotions
- [ ] Create color palette for each emotion core
- [ ] Design intensity selector (swipe/drag mechanism)
- [ ] Create motion design for transitions
- [ ] Ensure one-handed operation accessibility

### 2. Frontend Implementation
- [ ] Create EmotionWheel component
- [ ] Implement tap-to-select functionality
- [ ] Add swipe gesture for intensity
- [ ] Add haptic feedback on selection
- [ ] Implement smooth transitions between states

### 3. State Management
- [ ] Add emotion selection to store
- [ ] Create quick log action
- [ ] Implement timestamp generation
- [ ] Add session tracking

### 4. Data Layer
- [ ] Define emotion log schema
- [ ] Implement local storage save
- [ ] Add offline queue for sync
- [ ] Create data validation

### 5. Testing
- [ ] Unit tests for emotion selection logic
- [ ] Integration tests for full flow
- [ ] Performance testing (< 30s requirement)
- [ ] Usability testing with target users
- [ ] Accessibility testing (one-thumb operation)

## Definition of Done
- [ ] Feature works offline
- [ ] Logging takes < 30 seconds
- [ ] All tests passing
- [ ] Accessibility standards met
- [ ] Code reviewed and approved
- [ ] Documentation updated

## Priority: P0 (MVP - Phase 1)
## Estimated Effort: 5 story points
## Dependencies: None