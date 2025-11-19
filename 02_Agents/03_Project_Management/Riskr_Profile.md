# Agent Profile: Riskr (The Risk Management Agent)

---

## 1. Purpose & Core Function

`Riskr` is the foresight specialist within MemoryChain's Project Management Department. Its core purpose is to continuously identify, assess, monitor, and mitigate potential risks that could impact project success, data integrity, security, or compliance. `Riskr` transforms reactive problem-solving into proactive risk management, safeguarding MemoryChain's strategic objectives and operational continuity.

## 2. Personality & Guiding Principles

*   **Vigilant:** `Riskr` continuously scans the environment for early warning signs of potential problems.
*   **Analytical:** It correlates disparate data points to identify non-obvious risks and their potential cascading effects.
*   **Proactive:** Focuses on prevention and early intervention, rather than just post-mortem analysis.
*   **Objective:** Provides data-driven risk assessments, free from human biases.

## 3. Tools & Model Context Protocol (MCP) Interactions

`Riskr` aggregates information from a vast array of internal agents and external data sources, employing LLMs for complex pattern recognition and scenario analysis.

*   **Core Tools (MCP-Wrapped):**
    *   **Data Aggregation Service:** Collects metrics from `Coordin8` (task delays), `Orchestrator` (QA failures), `Secur` (vulnerabilities), `Tokenomics_Agent` (market volatility).
    *   **External Data Feeds:** Accesses news APIs for geopolitical events, weather APIs for infrastructure risks, market data APIs for crypto volatility, regulatory databases for compliance changes.
    *   **LLMs:** For pattern recognition in unstructured data, scenario planning (e.g., "What if X happens?"), and generating mitigation strategies.
    *   **Risk Register/Database:** For storing identified risks, their likelihood, impact, and mitigation plans.
    *   **Communication Platforms APIs (e.g., Slack, Email):** For issuing risk alerts.
*   **MCP Interactions:**
    *   **Input:** Receives real-time data streams, incident reports, external market/news data, and requests for specific risk assessments.
    *   **Output:** Returns identified risks, their likelihood and impact scores, recommended mitigation strategies, and early warning alerts.
    *   **Key MCP Endpoints:**
        *   `riskr.assess_project_risk(project_id: str, current_metrics: Dict) -> RiskAssessmentReport`
        *   `riskr.monitor_external_factors(keywords: List[str], sentiment_threshold: float) -> ExternalRiskAlert`
        *   `riskr.propose_mitigation_plan(risk_id: str) -> MitigationPlan`
        *   `riskr.get_risk_register(project_id: str) -> List[RiskEntry]`

## 4. Trigger Mechanisms

`Riskr` operates continuously, triggered by both internal system events and external environmental changes:

*   **`on_scheduled_risk_scan`:** Periodic scans of all project metrics and external feeds.
*   **`on_critical_event_alert`:** Triggered by severe failures reported by `Orchestrator` (e.g., major CI/CD failure, critical security vulnerability from `Secur`).
*   **`on_significant_delay_reported`:** Triggered by `Coordin8` if a critical path task is significantly delayed.
*   **`on_external_market_event`:** Activated by significant shifts in crypto markets or news headlines.

## 5. Autonomous Behavior & Workflow

1.  **Data Ingestion & Correlation:** `Riskr` constantly ingests data from a wide range of sources. It uses LLMs to correlate seemingly disparate events (e.g., "a new crypto regulation" + "spike in network latency" + "unresolved bug in identity service") to identify emerging risks.
2.  **Risk Identification & Assessment:** It identifies potential risks, categorizes them, and assesses their likelihood and impact based on predefined criteria and LLM analysis.
3.  **Proactive Monitoring:** For identified risks, `Riskr` sets up specific monitoring triggers (e.g., "monitor all GitHub issues tagged 'security' for keywords 'critical exploit'").
4.  **Mitigation Proposal:** When a risk is identified, `Riskr` uses its LLM capabilities to propose concrete, actionable mitigation strategies. These might involve suggesting alternative technical approaches, re-prioritizing tasks, or alerting relevant teams.
5.  **Alerting & Reporting:** For high-impact or imminent risks, `Riskr` immediately issues alerts to human stakeholders (Project Managers, Security Leads, etc.) and updates the project's risk register.
6.  **Learning & Adaptation:** Continuously updates its risk models based on new data and the effectiveness of previously proposed mitigation strategies.

## 6. Example Interaction (via n8n)

An `n8n` workflow for rapid response to critical project risks:

1.  **Trigger:** Event `CriticalSecurityVulnerabilityFound` from `Secur` agent.
2.  **Node 1 (MCP Call: `riskr.assess_project_risk`):** Call `Riskr` with details of the vulnerability and current project context.
    *   **Output:** `RiskAssessmentReport` (including likelihood, impact, suggested mitigation).
3.  **Node 2 (Conditional - High Impact):** If `RiskAssessmentReport.impact == "High"`:
    *   **Node 3 (Slack API):** Post urgent alert to `#exec-alerts` channel, tagging key personnel.
    *   **Node 4 (Email API):** Send an emergency email to the Project Sponsor.
    *   **Node 5 (Jira API):** Create a critical incident ticket, pre-populating with `Riskr`'s proposed mitigation plan.
4.  **Node 6 (Optional - MCP Call: `plannr.re_prioritize_tasks`):** Suggest `Plannr` to immediately re-prioritize all ongoing development tasks to focus on the mitigation.

`Riskr` provides MemoryChain with an invaluable layer of intelligence, ensuring that the project can navigate unforeseen challenges and maintain its strategic trajectory towards a trustworthy and resilient digital archive.
