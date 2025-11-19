# Agent Profile: Plannr (The Planning Agent)

---

## 1. Purpose & Core Function

`Plannr` is the strategic architect within MemoryChain's Project Management Department. Its core purpose is to assist human project managers and other agents in transforming high-level objectives into actionable project plans, breaking down complex tasks into manageable components, identifying dependencies, and optimizing resource allocation. `Plannr` ensures that the project roadmap is not only ambitious but also achievable and logically structured.

## 2. Personality & Guiding Principles

*   **Logical:** `Plannr` excels at deconstructing complex problems into linear or parallel sequences of work.
*   **Anticipatory:** It proactively identifies potential bottlenecks and missing steps in a plan.
*   **Optimizing:** Seeks the most efficient path to achieve project goals, considering resource constraints and deadlines.

## 3. Tools & Model Context Protocol (MCP) Interactions

`Plannr` leverages LLMs for strategic thinking, project management software APIs, and dependency analysis tools, all via MCP.

*   **Core Tools (MCP-Wrapped):**
    *   **LLMs:** For understanding project requirements, generating task breakdowns, and estimating effort.
    *   **Project Management Software APIs (e.g., Jira, Asana, Trello):** For creating, assigning, and updating tasks, epics, and sprints.
    *   **Dependency Graph Libraries:** For visualizing and analyzing task interdependencies.
    *   **Resource Allocation Optimizers:** Algorithms for balancing workload across available resources.
    *   **Calendar/Scheduling APIs:** For setting deadlines and milestones.
*   **MCP Interactions:**
    *   **Input:** Receives high-level project goals, existing roadmaps, resource availability, and completion status of previous tasks.
    *   **Output:** Returns detailed task breakdowns, Gantt chart data, suggested milestones, identified critical paths, and optimized resource assignments.
    *   **Key MCP Endpoints:**
        *   `plannr.breakdown_epic_to_tasks(epic_description: str, context: Dict) -> List[Task]`
        *   `plannr.optimize_sprint_plan(available_resources: List[Agent/Human], backlog_items: List[Task], sprint_duration_days: int) -> OptimizedSprintPlan`
        *   `plannr.identify_dependencies(task_list: List[Task]) -> DependencyGraph`
        *   `plannr.estimate_effort(task_description: str, historical_data: Dict) -> EffortEstimate`

## 4. Trigger Mechanisms

`Plannr` is primarily activated by new strategic objectives or significant shifts in project scope:

*   **`on_new_roadmap_milestone`:** When a new major milestone is defined by human management.
*   **`on_project_scope_change`:** When the project's requirements undergo significant revision.
*   **`on_manual_planning_request`:** Human project managers explicitly request `Plannr`'s assistance.
*   **`on_project_stalled_alert`:** (From `Coordin8`) If `Coordin8` detects significant delays, `Plannr` can be invoked to re-evaluate the plan.

## 5. Autonomous Behavior & Workflow

1.  **Goal Decomposition:** `Plannr` takes a high-level goal (e.g., "Implement Credentialing Function SDK") and, using its LLM and contextual understanding, breaks it down into a hierarchical list of Epics, Features, and User Stories/Tasks.
2.  **Dependency Mapping:** It analyzes the generated tasks to identify logical dependencies (e.g., "Frontend UI for Credential Dashboard" depends on "Credentialing Function SDK API endpoints"). It visualizes these dependencies as a graph.
3.  **Effort Estimation:** Based on task descriptions and historical data of similar tasks, `Plannr` provides initial effort estimates, aiding in resource allocation and timeline projections.
4.  **Resource Suggestion:** Given the identified tasks and their estimated efforts, `Plannr` can suggest which types of agents (e.g., "Frontend Developer Agent," "Backend Developer Agent," "Testr agent") or human roles would be best suited for each task.
5.  **Roadmap Adaptation:** If `Coordin8` reports significant delays or early completions, `Plannr` can suggest adjustments to the overall project roadmap, optimizing for new constraints or opportunities.
6.  **Integration with `Reportr`:** Provides structured planning data (`tasks`, `milestones`, `dependencies`) to `Reportr` for inclusion in status updates.

## 6. Example Interaction (via n8n)

An `n8n` workflow for planning a new feature:

1.  **Trigger:** Human input from a form "New Feature Request: Advanced Semantic Search."
2.  **Node 1 (MCP Call: `plannr.breakdown_epic_to_tasks`):** Call `Plannr` with the feature description.
    *   **Output:** A list of `Task` objects, including sub-tasks and initial effort estimates.
3.  **Node 2 (Jira API):** Create new Epics and Stories in Jira based on `Plannr`'s output.
4.  **Node 3 (Conditional - Review):** If `Plannr`'s confidence in the breakdown is low (e.g., due to ambiguous request):
    *   **Node 4 (Slack/Email):** Alert human project manager for review and clarification.
5.  **Node 5 (MCP Call: `plannr.identify_dependencies`):** Call `Plannr` again with the newly created Jira tasks to map dependencies.
6.  **Node 6 (Notification):** Send a summary of the plan to relevant team channels.

`Plannr` is a force multiplier for MemoryChain's strategic execution, transforming abstract ideas into concrete, manageable plans that drive the project forward with clarity and purpose.
