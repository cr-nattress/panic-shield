# US-008: Instant Panic Support

## Story
As a user in distress, I need instant panic support

## Acceptance Criteria
- GIVEN I'm panicking
- WHEN I tap the red "Panic Help" button (or shake phone)
- THEN immediately see "You're going to be okay"
- AND 4-7-8 breathing starts auto-pacing
- **Performance**: ≤ 1 second to first help, works offline

## Priority: P0 (HIGHEST - Life Safety)

## Tasks

### 1. Emergency UI Design
- [ ] Design panic button (high contrast, large target)
- [ ] Create calming color scheme for panic mode
- [ ] Design reassuring message display
- [ ] Create breathing visualization
- [ ] Design emergency exit/safe mode

### 2. Rapid Access Implementation
- [ ] Implement shake-to-activate gesture
- [ ] Add persistent panic button on all screens
- [ ] Create 1-tap activation
- [ ] Implement haptic feedback pattern
- [ ] Add voice activation option

### 3. Breathing Exercise Core
- [ ] Implement 4-7-8 breathing timer
- [ ] Create visual breathing guide
- [ ] Add haptic pulse for rhythm
- [ ] Implement audio cues (optional)
- [ ] Create adaptive pacing logic

### 4. Safety Features
- [ ] Add "I'm safe now" exit
- [ ] Implement emergency contact quick dial
- [ ] Add location sharing (opt-in)
- [ ] Create panic history logging
- [ ] Add crisis resource links

### 5. Performance Optimization
- [ ] Preload panic mode assets
- [ ] Optimize for instant launch (< 1s)
- [ ] Ensure offline functionality
- [ ] Minimize CPU/battery usage
- [ ] Test under stress conditions

### 6. Testing
- [ ] Test 1-second launch requirement
- [ ] Test shake sensitivity calibration
- [ ] Validate breathing pace accuracy
- [ ] Test in airplane mode
- [ ] User testing with anxiety sufferers
- [ ] Medical professional review

## Definition of Done
- [ ] Launches in < 1 second
- [ ] Works completely offline
- [ ] Breathing guide clinically accurate
- [ ] Accessibility compliant
- [ ] Medical expert approved
- [ ] Stress tested under panic conditions

## Estimated Effort: 13 story points
## Dependencies: None (Standalone safety feature)