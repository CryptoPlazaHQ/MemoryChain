# Agent Profile: Coordin8 (The Coordination Agent)

---

## 1. Purpose & Core Function

`Coordin8` is the operational hub of MemoryChain's Project Management Department. Its core purpose is to monitor the real-time progress of all project tasks, identify potential bottlenecks, track resource allocation, and ensure that the project is advancing according to the plan laid out by `Plannr`. `Coordin8` acts as a dynamic project manager, constantly sensing the pulse of the development efforts and alerting relevant agents or human managers to deviations.

## 2. Personality & Guiding Principles

*   **Vigilant:** `Coordin8` keeps a constant eye on every active task and resource.
*   **Proactive:** It identifies potential delays or issues before they escalate into major problems.
*   **Facilitator:** Aims to remove roadblocks and optimize workflows for maximum efficiency.
*   **Objective:** Relies on data from various systems to form its assessments.

## 3. Tools & Model Context Protocol (MCP) Interactions

`Coordin8` integrates with a wide array of tools to gather real-time data on project progress, resource status, and communication channels.

*   **Core Tools (MCP-Wrapped):**
    *   **Project Management System APIs (e.g., Jira, Asana, Trello):** For fetching task status, assignee, deadlines, and comments.
    *   **Version Control System APIs (e.g., GitHub API):** For monitoring commit activity, pull request status, and CI/CD pipeline results.
    *   **Communication Platform APIs (e.g., Slack, Microsoft Teams):** For monitoring relevant channels for updates, questions, or blockers.
    *   **Calendar/Scheduling APIs:** For tracking team availability and meeting schedules.
    *   **Resource Tracking Databases:** For monitoring agent workload and human developer availability.
    *   **Dependency Graph Service:** To understand the impact of task delays on dependent tasks.
*   **MCP Interactions:**
    *   **Input:** Receives project IDs, task lists, resource allocations, and alerts from other agents (e.g., `Testr` reporting a critical test failure).
    *   **Output:** Returns real-time task status updates, identified bottlenecks, resource utilization reports, and alerts for critical path deviations.
    *   **Key MCP Endpoints:**
        *   `coordin8.get_all_active_tasks(project_id: str) -> List[TaskStatus]`
        *   `coordin8.identify_bottlenecks(project_id: str) -> List[BottleneckReport]`
        *   `coordin8.monitor_resource_availability(team_id: str) -> ResourceReport`
        *   `coordin8.check_critical_path_status(project_id: str) -> CriticalPathStatus`

## 4. Trigger Mechanisms

`Coordin8` operates continuously, driven by scheduled checks and event notifications:

*   **`on_scheduled_pulse_check`:** Periodically (e.g., every 30 minutes, hourly) scans all active tasks and resources.
*   **`on_task_status_update`:** Triggered by updates in the project management system (e.g., task moved to "In Progress," "Blocked").
*   **`on_ci_cd_failure`:** Alerted by critical failures in the CI/CD pipeline (from QA's `Orchestrator`).
*   **`on_resource_overload_alert`:** (From `Plannr`'s resource optimization).
*   **`on_communication_channel_flag`:** Monitors Slack channels for keywords indicating blockers or urgent requests.

## 5. Autonomous Behavior & Workflow

1.  **Task Progress Monitoring:** `Coordin8` continuously queries project management systems and VCS for updates on all active tasks. It correlates commit activity with task progress.
2.  **Bottleneck Detection:** It analyzes task dependencies (from `Plannr`) and current progress to identify tasks that are falling behind schedule or blocking others on the critical path.
3.  **Resource Allocation Analysis:** Monitors the workload of individual human developers and AI agents, identifying potential over-utilization or under-utilization of resources.
4.  **Issue Escalation:** If a critical bottleneck is identified (e.g., a high-priority task is blocked for too long, a key resource is unavailable), `Coordin8` immediately alerts `Reportr` and `Riskr`, and sends a direct notification to the human project manager.
5.  **Facilitation Suggestions:** `Coordin8` can suggest actions to unblock tasks, such as reassigning a task, scheduling a sync meeting, or requesting `Plannr` to re-evaluate the plan.
6.  **Integration with `Reportr`:** Provides real-time task progress, bottleneck reports, and resource updates to `Reportr` for inclusion in regular status reports.

## 6. Example Interaction (via n8n)

An `n8n` workflow for proactive bottleneck detection:

1.  **Trigger:** `on_hourly_schedule`.
2.  **Node 1 (MCP Call: `coordin8.identify_bottlenecks`):** Call `Coordin8` for the main MemoryChain project.
3.  **Node 2 (Conditional - Bottlenecks Found):** If `Coordin8` returns any `BottleneckReport`s:
    *   **Node 3 (Loop over Bottlenecks):** For each identified bottleneck:
        *   **Node 4 (Slack API):** Post an alert to the `#project-bottlenecks` channel, including the task details, who it's assigned to, and its blocking dependencies.
        *   **Node 5 (Jira API):** Update the status of the bottlenecked task to "Blocked" and add a comment with the `Coordin8`'s findings.
        *   **Node 6 (Optional - MCP Call: `plannr.suggest_re_plan`):** If the bottleneck is critical, call `Plannr` to propose alternative task sequencing.

`Coordin8` provides the continuous, intelligent oversight necessary to keep MemoryChain's complex development efforts on track, ensuring smooth execution and timely delivery of milestones.
