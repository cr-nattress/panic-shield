# [US-NEXT-XXX] Refactor ComponentName

## Summary
Brief description of what component is being refactored and why.

## Scope
**Files Modified:**
- [ ] `components/ComponentName.tsx` - Main refactor
- [ ] `components/subcomponents/ExtractedComponent.tsx` - New extraction
- [ ] `hooks/useComponentLogic.ts` - New hook
- [ ] `utils/componentUtils.ts` - New utilities

**Lines of Code:**
- Before: XXX LOC
- After: XXX LOC
- Reduction: XX%

## Before/After

### Visual Comparison
| Before | After |
|--------|-------|
| ![Before Screenshot](url) | ![After Screenshot](url) |

### Metrics Comparison
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Lines of Code | XXX | XXX | -XX% |
| Cyclomatic Complexity | XX | XX | -XX |
| JSX Nesting Depth | X | X | -X |
| Number of Hooks | X | X | -X |
| Test Coverage | XX% | XX% | +XX% |

## Test Evidence

### Test Results
```
✓ All existing tests passing
✓ New component tests added
✓ Visual regression tests pass
✓ Performance benchmarks stable
```

### Coverage Report
```
File                    | % Stmts | % Branch | % Funcs | % Lines |
------------------------|---------|----------|---------|---------|
ComponentName.tsx       |   95.0  |   92.0   |   94.0  |   95.0  |
ExtractedComponent.tsx  |   98.0  |   95.0   |   100   |   98.0  |
useComponentLogic.ts    |   100   |   100    |   100   |   100   |
```

## Risk Assessment

### Risks Identified
1. **Risk**: [Describe potential risk]
   - **Mitigation**: [How it's addressed]
   - **Testing**: [How it's tested]

2. **Risk**: [Another risk if applicable]
   - **Mitigation**: [How it's addressed]
   - **Testing**: [How it's tested]

### Backward Compatibility
- [ ] Props interface unchanged
- [ ] Public methods unchanged
- [ ] Export signature unchanged
- [ ] No breaking changes to consumers

## Rollback Plan

### If Issues Detected
1. **Immediate**: Revert this PR's merge commit
2. **Monitoring**: Watch error rates for 24 hours
3. **Hotfix**: If minor issues, fix forward in separate PR
4. **Communication**: Notify team in #panic-shield-dev

### Revert Command
```bash
git revert -m 1 <merge-commit-sha>
```

## Checklist

### Pre-Submission
- [ ] Self-reviewed code changes
- [ ] Ran full test suite locally
- [ ] Checked for console errors/warnings
- [ ] Verified no visual regressions
- [ ] Updated relevant documentation
- [ ] Followed naming conventions

### Acceptance Criteria (from US-NEXT-XXX)
- [ ] Component under 250 LOC
- [ ] Cyclomatic complexity under 12
- [ ] JSX nesting depth max 6 levels
- [ ] All tests passing
- [ ] No behavioral changes
- [ ] Props backward compatible

### Definition of Done
- [ ] Code review by 2 engineers
- [ ] Visual review by designer (if UI changes)
- [ ] QA verification in staging
- [ ] Performance metrics reviewed
- [ ] Documentation updated
- [ ] Merged to main branch

## Related Links
- User Story: [US-NEXT-XXX](../stories/US-NEXT-XXX-refactor-ComponentName.md)
- Epic: [EP-NEXT-Component-Refactor](../epics/EP-NEXT-Component-Refactor.md)
- Preview Deploy: [Link to preview]
- Storybook: [Link to component stories]

## Notes
Any additional context or decisions made during refactoring.

---
**Reviewers:** @reviewer1 @reviewer2