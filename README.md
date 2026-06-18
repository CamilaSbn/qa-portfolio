# QA Portfolio — AI-Assisted Test Automation

Browser automation test suite built with Playwright and AI (Claude), starting from zero coding experience.

## Tools
- Playwright 1.60 · Node.js v26 · Claude

## Test Coverage
| File | Area | Tests |
|------|------|-------|
| login.test.js | Auth — recorded with codegen | 1 |
| refactored.test.js | Auth — helper functions | 4 |
| pom.test.js | Auth — Page Object Model | 4 |
| forms.test.js | Dropdowns, checkboxes | 4 |
| dynamic.test.js | JS alerts, dynamic loading | 4 |
| navigation.test.js | Page titles, elements, links | 4 |

## How to Run
\`\`\`bash
npx playwright test --headed
npx playwright show-report
\`\`\`
