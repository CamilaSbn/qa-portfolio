# QA Automation Portfolio — Camila Sabán

Browser and API test automation suite built with Playwright, Postman, and AI-assisted tooling (Claude + GitHub Copilot). This portfolio demonstrates practical QA engineering skills across UI automation, REST API testing, data-driven patterns, and visual regression — applied to real web applications.

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| Playwright 1.60 | UI & API test automation |
| Node.js v26 | Runtime |
| Postman | REST API collection testing |
| Claude / GitHub Copilot | AI-assisted script generation & debugging |
| GitHub Actions | CI pipeline |

---

## 📁 Test Suites

### UI Automation (Playwright)

| File | Area | Pattern | Tests |
|---|---|---|---|
| `login.test.js` | Authentication | Recorded with Codegen | 1 |
| `refactored.test.js` | Authentication | Helper functions | 4 |
| `pom.test.js` | Authentication | Page Object Model | 4 |
| `forms.test.js` | Forms | Dropdowns & checkboxes | 4 |
| `dynamic.test.js` | Dynamic UI | JS alerts & async loading | 4 |
| `navigation.test.js` | Navigation | Page titles, elements, links | 4 |
| `data-driven.test.js` | Data-driven | Parameterized JSON inputs | — |
| `visual.test.js` | Visual regression | Screenshot diffing | — |

### API Testing

| File | Tool | Methods Covered |
|---|---|---|
| `api.test.js` | Playwright APIRequestContext | GET, POST, PUT, DELETE |
| `jsonplaceholder-collection.json` | Postman | GET, POST, DELETE |

**What's validated in API tests:**
- Status codes and response structure
- Required fields and correct data types
- Error handling (e.g. 404 for non-existent resources)
- Response time / performance thresholds
- Request/response body matching

---

## 🤖 AI-Augmented Workflow

This portfolio was built using AI-assisted QA practices:

- **Test case design** — used prompt engineering with Claude to generate test scenarios and edge cases
- **Script generation & debugging** — leveraged GitHub Copilot to accelerate Playwright script writing and troubleshoot failures
- **Postman scripts** — AI-generated test scripts for the REST collection, covering assertions and performance checks
- **Defect analysis** — used Claude to support root cause investigation and improve defect documentation quality

---

## 📂 Data-Driven Testing

Tests in `data-driven.test.js` use parameterized JSON input files from the `/test-data` folder, enabling scenario expansion without modifying test code. This pattern keeps tests maintainable and scalable as coverage grows.

---

## ▶️ How to Run

```bash
# Install dependencies
npm install

# Run all tests (headless)
npx playwright test

# Run with browser visible
npx playwright test --headed

# View HTML report
npx playwright show-report
```

**To run the Postman collection:**
Import `jsonplaceholder-collection.json` into Postman and run via the Collection Runner.

---

## ⚙️ CI/CD

Tests run automatically on push via GitHub Actions. See `.github/workflows/` for the pipeline configuration.

---

## 👩‍💻 About

I'm a QA Analyst with 4+ years of experience in functional, API, regression, exploratory, and mobile testing. This portfolio reflects my ongoing growth into test automation and AI-augmented QA practices.

📫 [LinkedIn](https://www.linkedin.com/in/your-linkedin-here) 
   [GitHub](https://github.com/CamilaSbn)
