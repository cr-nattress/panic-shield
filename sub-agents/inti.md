Prompt to Generate Sub-Agent Development Backlog
Create a comprehensive backlog for developing 10 AI-enhanced sub-agents for automated software engineering best practices. Structure the backlog with epics for each agent and incremental user stories that build from MVP to full functionality.
Backlog Structure Requirements
markdown/sub-agent-backlog/
├── epics/
│   ├── EPIC-001-code-quality-agent.md
│   ├── EPIC-002-security-scanner-agent.md
│   ├── EPIC-003-test-coverage-agent.md
│   ├── EPIC-004-documentation-agent.md
│   ├── EPIC-005-performance-agent.md
│   ├── EPIC-006-dependency-health-agent.md
│   ├── EPIC-007-error-handling-agent.md
│   ├── EPIC-008-api-design-agent.md
│   ├── EPIC-009-database-schema-agent.md
│   └── EPIC-010-observability-agent.md
├── infrastructure-epics/
│   ├── EPIC-011-metrics-hub.md
│   ├── EPIC-012-learning-hub.md
│   ├── EPIC-013-research-hub.md
│   └── EPIC-014-orchestrator.md
├── stories/
│   ├── sprint-01-mvp/
│   ├── sprint-02-core-features/
│   ├── sprint-03-integrations/
│   └── sprint-04-advanced/
└── README.md
Epic Template
Each epic should follow this structure:
markdown# EPIC-XXX: [Agent Name]

## Overview
Brief description of the agent's purpose and value

## Success Criteria
- [ ] MVP version scanning and reporting
- [ ] Basic backlog item generation
- [ ] Integration with orchestrator
- [ ] Metrics collection
- [ ] Learning system integration
- [ ] Full feature set implemented

## User Stories
1. US-XXX-001: Create basic scanner
2. US-XXX-002: Add pattern detection
3. US-XXX-003: Generate backlog items
4. US-XXX-004: Add metrics collection
5. US-XXX-005: Integrate learning system
6. US-XXX-006: Add trend analysis
7. US-XXX-007: Implement auto-fixing
8. US-XXX-008: Add research integration
User Story Template
markdown# US-XXX-XXX: [Story Title]

**Epic**: EPIC-XXX
**Sprint**: X
**Points**: X
**Priority**: Critical/High/Medium/Low

## Description
As a developer, I want [feature] so that [benefit]

## Acceptance Criteria
- [ ] Specific measurable outcome 1
- [ ] Specific measurable outcome 2
- [ ] Test coverage >80%
- [ ] Documentation complete

## Technical Details
- Implementation approach
- Files to create/modify
- Dependencies required

## Definition of Done
- [ ] Code implemented and reviewed
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Integrated with existing system
Generate the Following Epic Structure:
EPIC-001: Code Quality Metrics Agent
Sprint 1 - MVP Stories (Week 1)
markdownUS-001-001: Basic Code Scanner
- Scan Python/JS files for functions
- Count lines of code per file
- Output basic JSON report
- 3 story points

US-001-002: Complexity Calculator
- Calculate cyclomatic complexity
- Flag functions over threshold (10)
- Simple console output
- 3 story points
Sprint 2 - Core Features (Week 2)
markdownUS-001-003: Duplication Detector
- Find exact duplicate code blocks
- Report duplication percentage
- 5 story points

US-001-004: Backlog Generation
- Create markdown files for issues found
- Basic task format only
- 3 story points
Sprint 3 - Integration (Week 3)
markdownUS-001-005: Code Smell Detection
- Long methods, large classes
- Dead code detection
- 5 story points

US-001-006: Metrics Storage
- Save metrics to JSON file
- Basic trend tracking
- 3 story points
Sprint 4 - Advanced (Week 4)
markdownUS-001-007: AI Context Integration
- Generate AI-friendly documentation
- Add "why" comments suggestions
- 8 story points

US-001-008: Learning System
- Track fixed issues
- Learn from patterns
- Suggest preventions
- 8 story points
EPIC-002: Security Scanner Agent
Sprint 1 - MVP Stories
markdownUS-002-001: Secret Scanner
- Regex for API keys, passwords
- Scan all text files
- Console warnings
- 3 story points

US-002-002: Basic Vulnerability Check
- Check for eval(), SQL concatenation
- Simple pattern matching
- 3 story points
Sprint 2 - Core Features
markdownUS-002-003: Dependency Vulnerability Scanner
- Check npm/pip for known CVEs
- Use public vulnerability databases
- 5 story points

US-002-004: Security Backlog Items
- Create HIGH priority tasks for vulnerabilities
- Include remediation steps
- 3 story points
Continue this pattern for all 10 agents...
Infrastructure Epics
EPIC-011: Metrics Hub
markdownSprint 1: Basic Metrics Collection
- File-based storage
- Daily snapshots
- Simple trending

Sprint 2: Dashboards
- HTML dashboard generation
- Trend visualization
- Health scores

Sprint 3: Correlation Analysis
- Find patterns in metrics
- Identify cause/effect
- Predictive insights
EPIC-012: Learning Hub
markdownSprint 1: Error Logging
- Centralized error database
- JSON file storage
- Basic categorization

Sprint 2: Pattern Recognition
- Identify recurring issues
- Track solutions
- Success rate monitoring

Sprint 3: Prevention Rules
- Auto-generate rules
- Apply learned fixes
- Measure effectiveness
EPIC-013: Research Hub
markdownSprint 1: Library Research
- Check for newer versions
- Find alternatives
- Basic comparison

Sprint 2: External Research
- GitHub trending analysis
- Stack Overflow insights
- Technology radar

Sprint 3: Competitive Analysis
- Research competitor stacks
- Industry best practices
- Academic research integration
EPIC-014: Main Orchestrator
markdownSprint 1: Sequential Execution
- Run agents one by one
- Collect all results
- Generate summary

Sprint 2: Parallel Processing
- Concurrent agent execution
- Result aggregation
- Unified reporting

Sprint 3: Intelligent Orchestration
- Priority-based execution
- Resource management
- Adaptive scheduling
Development Phases
Phase 1: Foundation (Weeks 1-2)

All agents MVP version
Basic scanning and reporting
File-based storage
Console output

Phase 2: Integration (Weeks 3-4)

Orchestrator connects all agents
Shared configuration
Unified backlog generation
Basic metrics collection

Phase 3: Intelligence (Weeks 5-6)

Learning system integration
Pattern recognition
Trend analysis
Correlation detection

Phase 4: Automation (Weeks 7-8)

Auto-fixing capabilities
Prevention rules
Research integration
Predictive analytics

Story Point Distribution
Sprint Planning
markdownSprint 1 (MVP): 40 points
- Each agent: 2-4 points for basic scanner
- Focus: Get all agents running

Sprint 2 (Core): 50 points
- Each agent: 4-6 points for core features
- Focus: Essential functionality

Sprint 3 (Integration): 60 points
- Each agent: 5-8 points for integration
- Focus: Working together

Sprint 4 (Advanced): 80 points
- Each agent: 8-10 points for advanced features
- Focus: Intelligence and automation
Prioritization Strategy
Critical Path (Must Have - Sprint 1-2)

Basic scanning for all agents
Simple reporting
Orchestrator skeleton
File-based storage

Important (Should Have - Sprint 3)

Backlog generation
Metrics collection
Basic dashboards
Integration between agents

Advanced (Nice to Have - Sprint 4+)

Learning system
Auto-fixing
Research integration
Predictive analytics

Technical Constraints
Each Story Must:

Start with simplest possible implementation
Use only Python standard library initially
Add external dependencies incrementally
Include unit tests from start
Have clear file output format
Be runnable standalone before integration

Progressive Enhancement Path:
Step 1: Console output only
Step 2: JSON file output
Step 3: Markdown generation
Step 4: HTML dashboards
Step 5: Real-time monitoring
Sample Detailed User Story
markdown# US-001-001: Create Basic Code Quality Scanner

**Epic**: EPIC-001-Code-Quality-Agent
**Sprint**: 1
**Points**: 3
**Priority**: Critical

## Description
As a developer, I want a basic scanner that can analyze Python and JavaScript files to count lines and functions, so that I have a foundation for code quality metrics.

## Acceptance Criteria
- [ ] Scans all .py and .js files in given directory
- [ ] Counts total lines, code lines, comment lines
- [ ] Counts number of functions/methods
- [ ] Outputs results as JSON to console
- [ ] Handles errors gracefully
- [ ] Completes scan of 1000 files in <10 seconds

## Technical Details

### Implementation:
```python
# code_quality_scanner.py
class BasicScanner:
    def scan_file(self, filepath):
        # Count lines, functions
        # Return metrics dict
    
    def scan_directory(self, path):
        # Walk directory tree
        # Call scan_file for each
        # Aggregate results
    
    def output_json(self, results):
        # Print JSON to console
Files to Create:

/agents/code_quality/scanner.py
/agents/code_quality/test_scanner.py
/agents/code_quality/README.md

No External Dependencies (MVP)
Definition of Done

 Scanner runs via: python scanner.py /path/to/code
 Outputs valid JSON with metrics
 Unit tests pass with >80% coverage
 README documents usage
 Error handling for invalid paths
 Performance benchmark documented


## Success Metrics for Backlog

### Velocity Targets:
- Sprint 1: 40 points (MVP for all agents)
- Sprint 2: 50 points (Core features)
- Sprint 3: 60 points (Integration)
- Sprint 4: 80 points (Advanced features)

### Quality Gates:
- Each story must have tests
- Documentation required before closing
- Code review by at least one person
- Integration test before sprint end

### Progressive Functionality:
1. Sprint 1 End: All agents can scan and report
2. Sprint 2 End: All agents generate backlog items
3. Sprint 3 End: Orchestrator coordinates all agents
4. Sprint 4 End: Learning and automation active

Generate this complete backlog structure with all epics, stories, and technical details for building these sub-agents incrementally from simplest MVP to full-featured system.Retry