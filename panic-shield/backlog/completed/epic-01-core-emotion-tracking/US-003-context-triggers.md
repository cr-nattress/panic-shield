# US-003: Context and Triggers

## Story
As a user, I want to add context to my emotion

## Acceptance Criteria
- GIVEN I've selected an emotion
- WHEN prompted "What triggered this?"
- THEN I see quick-tap chips: work, social, health, money, relationship
- AND can multi-select or skip
- **Performance**: ≤ 5 seconds additional time

## Tasks

### 1. UI Design
- [ ] Design trigger chip UI
- [ ] Create multi-select interaction pattern
- [ ] Design custom trigger input option
- [ ] Create trigger icons/visuals

### 2. Frontend Implementation
- [ ] Create TriggerSelector component
- [ ] Implement multi-select functionality
- [ ] Add custom trigger input
- [ ] Implement quick-tap chips
- [ ] Add recent triggers section

### 3. Data Layer
- [ ] Define trigger taxonomy
- [ ] Add triggers to log schema
- [ ] Create trigger frequency tracking
- [ ] Implement trigger-emotion correlations

### 4. Intelligence Features
- [ ] Auto-suggest relevant triggers based on time/location
- [ ] Learn user's common trigger patterns
- [ ] Create trigger prediction model
- [ ] Implement smart ordering of chips

### 5. Testing
- [ ] Test multi-select functionality
- [ ] Validate 5-second interaction time
- [ ] Test custom trigger input
- [ ] Verify skip doesn't lose data
- [ ] Test trigger correlation accuracy

## Definition of Done
- [ ] Trigger selection < 5 seconds
- [ ] Multi-select works smoothly
- [ ] Custom triggers supported
- [ ] Data properly associated with emotions
- [ ] Analytics tracking triggers
- [ ] Tests passing

## Priority: P1 (MVP - Phase 1)
## Estimated Effort: 3 story points
## Dependencies: US-001