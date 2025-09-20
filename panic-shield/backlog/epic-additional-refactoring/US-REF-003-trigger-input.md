# US-REF-003: Refactor TriggerInput Component

## User Story
**As a** developer working on the emotion tracking system
**I want** to refactor the TriggerInput component
**So that** autocomplete, validation, and UI are properly separated

## Priority: P0 (Critical)
## Story Points: 6
## Current LOC: 473 → Target: <250

## Problem Analysis
- **Current Issues**:
  - 473 lines mixing UI, logic, and data
  - Autocomplete algorithm embedded in component
  - Validation rules inline with rendering
  - Suggestion filtering in render method
  - Complex state management for multiple features
  - No separation between input and suggestions

## Acceptance Criteria
- [ ] Component reduced to under 250 LOC
- [ ] Autocomplete logic in separate hook
- [ ] Validation extracted to utilities
- [ ] Suggestions as separate component
- [ ] Algorithm moved to service layer
- [ ] Improved typing performance
- [ ] All features preserved

## Refactoring Tasks

### 1. Extract Autocomplete Hook
```typescript
// New file: hooks/useAutocomplete.ts
export function useAutocomplete({
  items,
  searchTerm,
  maxSuggestions = 5
}: AutocompleteOptions) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const filteredSuggestions = useMemo(() => {
    if (!searchTerm) return [];
    return fuzzySearch(items, searchTerm)
      .slice(0, maxSuggestions);
  }, [items, searchTerm, maxSuggestions]);
  
  const selectSuggestion = useCallback((index: number) => {
    if (index >= 0 && index < filteredSuggestions.length) {
      return filteredSuggestions[index];
    }
    return null;
  }, [filteredSuggestions]);
  
  const handleKeyboard = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        setSelectedIndex(prev => 
          Math.min(prev + 1, filteredSuggestions.length - 1)
        );
        break;
      case 'ArrowUp':
        setSelectedIndex(prev => Math.max(prev - 1, -1));
        break;
    }
  }, [filteredSuggestions.length]);
  
  return {
    suggestions: filteredSuggestions,
    selectedIndex,
    selectSuggestion,
    handleKeyboard
  };
}
```

### 2. Create Validation Service
```typescript
// New file: services/triggerValidation.ts
export class TriggerValidator {
  private rules: ValidationRule[] = [
    {
      name: 'minLength',
      validate: (value: string) => value.length >= 2,
      message: 'Trigger must be at least 2 characters'
    },
    {
      name: 'maxLength',
      validate: (value: string) => value.length <= 100,
      message: 'Trigger must be less than 100 characters'
    },
    {
      name: 'noSpecialChars',
      validate: (value: string) => /^[a-zA-Z0-9\s]+$/.test(value),
      message: 'Only letters, numbers, and spaces allowed'
    }
  ];
  
  validate(value: string): ValidationResult {
    const errors: string[] = [];
    
    for (const rule of this.rules) {
      if (!rule.validate(value)) {
        errors.push(rule.message);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
```

### 3. Extract Suggestions Component
```typescript
// New file: components/triggers/SuggestionsList.tsx
interface SuggestionsListProps {
  suggestions: string[];
  selectedIndex: number;
  onSelect: (suggestion: string) => void;
  visible: boolean;
}

export function SuggestionsList({
  suggestions,
  selectedIndex,
  onSelect,
  visible
}: SuggestionsListProps) {
  if (!visible || suggestions.length === 0) return null;
  
  return (
    <ul className="suggestions-list">
      {suggestions.map((suggestion, index) => (
        <li
          key={suggestion}
          className={index === selectedIndex ? 'selected' : ''}
          onClick={() => onSelect(suggestion)}
          role="option"
          aria-selected={index === selectedIndex}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
}
```

### 4. Create Fuzzy Search Utility
```typescript
// New file: utils/fuzzySearch.ts
export function fuzzySearch(items: string[], query: string): string[] {
  const lowerQuery = query.toLowerCase();
  
  return items
    .map(item => ({
      item,
      score: calculateScore(item.toLowerCase(), lowerQuery)
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}

function calculateScore(item: string, query: string): number {
  if (item === query) return 100;
  if (item.startsWith(query)) return 90;
  if (item.includes(query)) return 70;
  
  // Fuzzy matching logic
  let score = 0;
  let queryIndex = 0;
  
  for (let i = 0; i < item.length && queryIndex < query.length; i++) {
    if (item[i] === query[queryIndex]) {
      score += 10;
      queryIndex++;
    }
  }
  
  return queryIndex === query.length ? score : 0;
}
```

### 5. Refactored Main Component
```typescript
// Refactored: components/triggers/TriggerInput.tsx
export function TriggerInput({
  onAddTrigger,
  existingTriggers = [],
  placeholder = "What triggered this emotion?"
}: TriggerInputProps) {
  const [value, setValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const validator = useMemo(() => new TriggerValidator(), []);
  const validation = useMemo(() => validator.validate(value), [value, validator]);
  
  const {
    suggestions,
    selectedIndex,
    selectSuggestion,
    handleKeyboard
  } = useAutocomplete({
    items: COMMON_TRIGGERS,
    searchTerm: value,
    maxSuggestions: 5
  });
  
  const handleSubmit = useCallback(() => {
    if (validation.isValid && value.trim()) {
      onAddTrigger(value.trim());
      setValue('');
      setShowSuggestions(false);
    }
  }, [value, validation.isValid, onAddTrigger]);
  
  const handleSelect = useCallback((suggestion: string) => {
    setValue(suggestion);
    setShowSuggestions(false);
  }, []);
  
  return (
    <div className="trigger-input">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        onKeyDown={handleKeyboard}
        placeholder={placeholder}
        aria-label="Trigger input"
        aria-invalid={!validation.isValid}
      />
      
      {!validation.isValid && (
        <ValidationErrors errors={validation.errors} />
      )}
      
      <SuggestionsList
        suggestions={suggestions}
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
        visible={showSuggestions}
      />
      
      <button
        onClick={handleSubmit}
        disabled={!validation.isValid}
        aria-label="Add trigger"
      >
        Add
      </button>
    </div>
  );
}
```

## Files to Create/Modify
- [ ] Create `hooks/useAutocomplete.ts`
- [ ] Create `services/triggerValidation.ts`
- [ ] Create `components/triggers/SuggestionsList.tsx`
- [ ] Create `components/triggers/ValidationErrors.tsx`
- [ ] Create `utils/fuzzySearch.ts`
- [ ] Refactor `components/triggers/TriggerInput.tsx`
- [ ] Create comprehensive tests

## Testing Requirements
- [ ] Unit tests for fuzzy search algorithm
- [ ] Unit tests for validation service
- [ ] Hook tests for useAutocomplete
- [ ] Component tests for SuggestionsList
- [ ] Integration tests for TriggerInput
- [ ] Keyboard navigation tests
- [ ] Performance tests for large suggestion lists

## Definition of Done
- [ ] Component under 250 LOC
- [ ] All features working
- [ ] Improved typing performance
- [ ] Tests passing with >80% coverage
- [ ] Accessibility maintained
- [ ] Documentation updated