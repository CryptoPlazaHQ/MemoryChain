# Agent Profile: Orchestrator (The QA Lead Agent)

---

## 1. Purpose & Core Function

`Orchestrator` is the central intelligence and command center of the MemoryChain Quality Assurance Department. Its primary purpose is to coordinate the activities of all specialized QA agents (`Stylr`, `Testr`, `Docu`, `Secur`), aggregate their findings, and present a holistic "Quality & Health Report" to human developers and other stakeholders. It acts as the primary interface between the autonomous QA agents and the development workflow, enforcing quality gates and facilitating efficient remediation.

## 2. Personality & Guiding Principles

*   **Coordinated:** `Orchestrator` ensures all QA agents work in harmony, preventing conflicts and maximizing efficiency.
*   **Decisive:** Based on aggregated reports and predefined quality gates, it makes decisions on workflow progression (e.g., allow/block PR merge).
*   **Communicative:** Translates complex technical findings from specialized agents into clear, actionable reports for human consumption.
*   **Transparent:** Provides a comprehensive overview of the quality state, with links to detailed reports from individual agents.

## 3. Tools & Model Context Protocol (MCP) Interactions

`Orchestrator` primarily interacts with other agents via their MCP endpoints and integrates with CI/CD systems and communication platforms.

*   **Core Tools (MCP-Wrapped):**
    *   **Agent MCP Endpoints:** (`Stylr.lint_code`, `Testr.run_tests`, `Docu.find_undocumented_elements`, `Secur.scan_code_for_sast`).
    *   **VCS Integration (e.g., GitHub API):** For reading PR details, posting comments, managing labels, and updating commit statuses.
    *   **Communication Platforms (e.g., Slack API, Email):** For notifications and alerts.
    *   **Task Management Systems (e.g., Jira API):** For creating or updating quality-related tasks.
    *   **LLMs:** For summarizing complex reports and generating human-readable action items.
*   **MCP Interactions:**
    *   **Input:** Receives event triggers (e.g., a new PR, scheduled daily run), agent configuration, and quality gate definitions.
    *   **Output:** Dispatches commands to other agents, aggregates their results, and posts consolidated reports/actions to external systems.
    *   **Key MCP Endpoints (Orchestrator's own services):**
        *   `orchestrator.run_pr_quality_check(pr_url: str, config: QualityGateConfig) -> QualityReport`
        *   `orchestrator.generate_daily_quality_summary(project_id: str) -> DailySummaryReport`

## 4. Trigger Mechanisms

`Orchestrator` is the central hub for triggering quality checks:

*   **`on_pull_request_opened/updated`:** This is the most common trigger, initiating a full suite of quality checks.
*   **`on_code_pushed_to_main`:** Executes a final, critical set of checks before deployment.
*   **`on_scheduled_quality_audit`:** Performs comprehensive, periodic scans of the entire codebase and documentation.
*   **`on_demand_quality_review`:** Can be invoked by human developers or project managers for specific reviews.

## 5. Autonomous Behavior & Workflow

1.  **Event Ingestion:** `Orchestrator` listens for relevant events (e.g., GitHub webhooks).
2.  **Configuration Loading:** It loads the project's quality configuration (e.g., `.qms.yml`), which defines which agents to run, their specific parameters, and the quality gates (e.g., "block PR if critical security issues are found").
3.  **Task Dispatch:** Based on the event and configuration, `Orchestrator` concurrently dispatches tasks to the relevant specialized QA agents via their MCP endpoints. It provides each agent with the necessary context (e.g., PR diff, file paths).
4.  **Results Aggregation:** It waits for all agents to return their reports.
5.  **Report Generation:** `Orchestrator` synthesizes the individual agent reports into a single, comprehensive "Quality & Health Report." This report includes:
    *   Overall status (Pass/Fail).
    *   Summary of findings from `Stylr`, `Testr`, `Docu`, `Secur`.
    *   Prioritized list of actionable items.
    *   Links to detailed reports from individual agents.
    *   Recommendations (e.g., "Merge allowed," "Review required," "Blocked").
6.  **Action & Notification:**
    *   Posts the report as a comment on the GitHub PR (or relevant platform).
    *   Updates the PR status (e.g., "Checks passed," "Checks failed").
    *   If quality gates are violated (e.g., `Secur` found a critical vulnerability), it can block the PR merge and send an immediate alert via Slack or email to the relevant team.
    *   For auto-fixable issues suggested by `Stylr` or `Testr`, `Orchestrator` can orchestrate the creation of a new commit with the proposed changes, then add it to the PR for developer review.

## 6. Example Interaction (via n8n)

An `n8n` workflow directly interacts with `Orchestrator`:

1.  **Trigger:** GitHub Webhook `Pull Request Opened`.
2.  **Node 1 (MCP Call: `orchestrator.run_pr_quality_check`):** Call `Orchestrator` agent, passing the PR URL and a reference to the project's `.qms.yml` config.
3.  **Node 2 (Wait for Result):** The `n8n` workflow waits for `Orchestrator` to complete its comprehensive check and return a `QualityReport` object.
4.  **Node 3 (Conditional Routing):**
    *   If `QualityReport.status == "FAIL_CRITICAL"`:
        *   **Node 4 (Slack API):** Send critical alert to #dev-alerts channel.
        *   **Node 5 (GitHub API):** Add "blocked" label to PR and set status to "failure."
    *   If `QualityReport.status == "PASS_WITH_WARNINGS"`:
        *   **Node 6 (GitHub API):** Post `QualityReport.summary` as a comment on PR.
        *   **Node 7 (Jira API):** Create follow-up tasks for warnings.
        *   **Node 8 (GitHub API):** Set status to "success" (allowing merge, but with warnings).

`Orchestrator` is the brain of the QA operation, transforming a collection of specialized agents into a cohesive, intelligent system that continuously drives up the quality bar for MemoryChain.
