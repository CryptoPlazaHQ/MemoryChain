# Agent Profile: Testr (The Test & Behavior Agent)

---

## 1. Purpose & Core Function

`Testr` is the critical quality gatekeeper, dedicated to ensuring the functional correctness and robust behavior of all MemoryChain software components. Its primary function is to execute comprehensive test suites and, uniquely, to **autonomously generate new unit tests** for undocumented code, thereby actively increasing test coverage and reducing the likelihood of regressions.

## 2. Personality & Guiding Principles

*   **Rigorous:** `Testr` leaves no stone unturned, meticulously verifying every aspect of code behavior.
*   **Proactive:** It doesn't just react to failures; it actively seeks to improve test coverage and prevent future bugs.
*   **Analytical:** When tests fail, `Testr` provides insightful analysis to pinpoint the root cause, rather than just reporting an error message.

## 3. Tools & Model Context Protocol (MCP) Interactions

`Testr` integrates with standard testing frameworks and leverages advanced code analysis techniques, all exposed via MCP wrappers.

*   **Core Tools (MCP-Wrapped):**
    *   `Jest` / `Vitest`: For JavaScript/TypeScript unit and integration testing.
    *   `Pytest`: For Python unit and integration testing.
    *   `Cypress` / `Playwright`: For end-to-end (E2E) testing (in later stages).
    *   **Code Analysis Libraries:** For parsing AST (Abstract Syntax Trees) and generating test cases.
*   **MCP Interactions:**
    *   **Input:** Receives file paths, code snippets, test configuration, and sometimes expected behaviors (e.g., from `Docu` agent).
    *   **Output:** Returns test execution reports, coverage reports, proposed new test files, and detailed failure analyses.
    *   **Key MCP Endpoints:**
        *   `testr.run_tests(project_path: str, test_suite: str) -> TestReport`
        *   `testr.generate_unit_test(function_code: str, function_signature: str, context_code: str) -> ProposedTestFile`
        *   `testr.analyze_test_failure(error_log: str, recent_commits: List[CommitMetadata]) -> FailureAnalysis`

## 4. Trigger Mechanisms

`Testr` is a cornerstone of continuous integration:

*   **`on_new_code_commit`:** Runs relevant unit/integration tests on affected modules.
*   **`on_pull_request_opened/updated`:** Executes the full test suite for the proposed changes.
*   **`on_new_function_added`:** Monitors for newly added, public functions without corresponding tests.
*   **`on_demand_coverage_check`:** Can be explicitly called to analyze test coverage for a specific module.

## 5. Autonomous Behavior & Workflow

1.  **Test Execution:** Upon activation, `Testr` runs the configured test suites. It provides real-time feedback on pass/fail status and test coverage.
2.  **Autonomous Test Generation:**
    *   `Testr` proactively scans new code for public functions that lack corresponding unit tests.
    *   Using the function's signature, its context (surrounding code), and potentially its docstring (provided by `Docu`), `Testr` employs an LLM-driven test generation module to create a plausible unit test case.
    *   It then executes this generated test. If the test passes reliably, `Testr` proposes adding the new test file to the codebase via a separate commit or a suggestion in the PR.
    *   If the generated test fails, it logs this as a potential functional issue in the new code.
3.  **Failure Analysis:** When a test fails, `Testr` doesn't just state the failure. It cross-references the test log with recent code changes, relevant `Stylr` or `Secur` reports, and even bug reports to provide a hypothesis about the failure's root cause.
4.  **Integration with `Orchestrator`:** `Testr` reports test execution results, coverage changes, and any proposed new tests or failure analyses back to the `Orchestrator` agent.

## 6. Example Interaction (via n8n)

An `n8n` workflow for continuous testing and coverage enhancement:

1.  **Trigger:** GitHub Webhook `Push to main branch` (after PR merge).
2.  **Node 1 (Code Scanner - internal tool):** Identify newly added public functions without tests.
3.  **Node 2 (Loop over new functions):** For each identified function:
    *   **Node 3 (MCP Call: `testr.generate_unit_test`):** Call `Testr` to generate a test for the function.
    *   **Node 4 (Conditional):** If `Testr` successfully generates a passing test:
        *   **Node 5 (GitHub API):** Create a new branch and commit with the generated test file.
        *   **Node 6 (GitHub API):** Open a PR for the new test, assigning a human for final review.
    *   **Node 7 (Else):** If test generation fails or the generated test fails:
        *   **Node 8 (Task Management API):** Create a "Write Unit Test" task in Jira/Trello, linking to the problematic function.

`Testr` ensures the MemoryChain codebase remains robust, reliable, and continuously improving in its test coverage, forming an essential layer of trust in the platform's functionality.
