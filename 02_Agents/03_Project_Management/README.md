# Agent Department: 03. Project Management

---

## 1. Mission Statement

The **Project Management Department** orchestrates the development, deployment, and strategic evolution of the MemoryChain platform. Its mission is to ensure the efficient execution of project roadmaps, optimal allocation of resources, proactive risk mitigation, and transparent communication with all stakeholders. Leveraging specialized AI agents, this department transforms complex project workflows into streamlined, data-driven, and adaptable processes.

This department extends the principles outlined in `02_Agents/01_Project_Manager_Architect.md` by decentralizing and automating many of the PMA's responsibilities across a team of dedicated agents.

## 2. Core Principles

*   **Data-Driven Decisions:** All planning, monitoring, and reporting are informed by real-time data and predictive analytics.
*   **Proactive Risk Management:** Agents continuously scan for potential blockers, dependencies, and deviations from the plan.
*   **Transparent Communication:** Key project information is automatically generated and disseminated to relevant stakeholders.
*   **Adaptive Planning:** The project roadmap is not static; agents help identify opportunities for adjustments based on new information or shifting priorities.

## 3. Departmental Agents

This department comprises the following specialized AI agents, each contributing to effective project oversight:

*   **`Plannr` (The Planning Agent):** Assists in breaking down large goals into actionable tasks and managing dependencies.
*   **`Coordin8` (The Coordination Agent):** Tracks task progress, identifies bottlenecks, and facilitates resource allocation.
*   **`Reportr` (The Reporting Agent):** Generates comprehensive project status reports for various audiences.
*   **`Riskr` (The Risk Management Agent):** Identifies, assesses, and monitors project risks.

## 4. Interaction with Other Departments & External Services

Project Management agents interact extensively:

*   **With Development Teams:** Monitor code repositories, CI/CD pipelines, and task management systems.
*   **With QA Department:** `Reportr` integrates quality metrics from the `Orchestrator` agent into project reports. `Riskr` can flag quality issues as potential project risks.
*   **With Ecosystem Engagement:** `Reportr` can provide data for community updates. `Plannr` can integrate community feedback into future roadmap planning.
*   **External Tools:** Integrates with project management software (Jira, Trello, Asana), communication platforms (Slack, Email), and version control systems (GitHub API).
*   **`n8n` Workflows:** Used to orchestrate complex project management processes, especially those requiring cross-platform integration and conditional logic.

## 5. Workflow Example (n8n Integration)

A typical workflow for weekly project status reporting, orchestrated by `n8n`:

1.  **Trigger:** `n8n` workflow starts `on weekly schedule` (e.g., every Friday at 4 PM).
2.  **Node 1 (MCP Call: `coordin8.get_task_updates`):** Calls `Coordin8` to gather updates from all active tasks across various development teams (e.g., via Jira API).
3.  **Node 2 (MCP Call: `riskr.assess_current_risks`):** Calls `Riskr` to get an updated risk assessment based on recent events (e.g., failed CI/CD, unaddressed bugs, delays).
4.  **Node 3 (MCP Call: `reportr.generate_status_report`):** Calls `Reportr`, providing the task updates, risk assessment, and quality metrics (from QA department via `Orchestrator`'s MCP).
5.  **Node 4 (Conditional - High Risk):** If `Reportr` indicates a high-risk status:
    *   **Node 5 (Email/Slack):** Send an urgent executive summary to the Project Sponsor and core team.
    *   **Node 6 (Task Management API):** Create a "Mitigate High Risk" task.
6.  **Node 7 (Else - Standard Report):**
    *   **Node 8 (Email API):** Send the full weekly status report to all stakeholders.
    *   **Node 9 (Confluence/Wiki API):** Update the project status page.

This department ensures that MemoryChain's ambitious goals are met with precision, agility, and a continuous awareness of the project's health and trajectory.
