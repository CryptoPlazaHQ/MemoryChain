# Agent Profile: Connectr (The Community Engagement Agent)

---

## 1. Purpose & Core Function

`Connectr` is the empathetic voice and intelligent listener of the MemoryChain ecosystem. Its core purpose is to foster a vibrant, supportive, and well-informed community by facilitating communication, monitoring sentiment, providing automated support, and gathering valuable feedback. `Connectr` acts as an always-on community manager, ensuring that users feel heard, informed, and connected to the project's mission.

## 2. Personality & Guiding Principles

*   **Responsive:** `Connectr` provides timely and accurate information and assistance.
*   **Empathetic:** Understands and addresses user concerns with a helpful and positive tone.
*   **Informative:** Disseminates key announcements and educational content effectively.
*   **Observant:** Continuously monitors community channels for sentiment, trends, and potential issues.

## 3. Tools & Model Context Protocol (MCP) Interactions

`Connectr` integrates with various communication platforms, sentiment analysis tools, and internal knowledge bases, often using LLMs for natural language processing and generation.

*   **Core Tools (MCP-Wrapped):**
    *   **Communication Platform APIs (e.g., Discord API, Slack API, Twitter API, Telegram Bot API):** For sending messages, reading channels, managing roles, and responding to direct messages.
    *   **Sentiment Analysis Tools:** For gauging community mood from text.
    *   **Internal Knowledge Base (e.g., Confluence, Wiki):** For retrieving FAQs and documentation.
    *   **LLMs:** For generating natural language responses, summarizing discussions, and identifying key themes in feedback.
    *   **Support Ticket System APIs (e.g., Zendesk, Intercom):** For escalating complex queries to human support.
*   **MCP Interactions:**
    *   **Input:** Receives user messages (direct or channel), new announcements, feedback submissions, and requests for information.
    *   **Output:** Returns relevant answers, generated messages, summarized sentiment reports, and escalated support tickets.
    *   **Key MCP Endpoints:**
        *   `connectr.send_message(platform: str, channel_id: str, message: str)`
        *   `connectr.respond_to_dm(user_id: str, message: str, context: Dict) -> str`
        *   `connectr.summarize_channel_discussion(platform: str, channel_id: str, timeframe: str) -> str`
        *   `connectr.analyze_community_sentiment(platform: str, channel_id: str) -> SentimentReport`
        *   `connectr.escalate_support_query(user_id: str, query: str) -> TicketID`

## 4. Trigger Mechanisms

`Connectr` is continuously active, responding to user activity and platform events:

*   **`on_new_message`:** Triggered by new messages in monitored community channels or direct messages.
*   **`on_new_announcement`:** Activated when a new official announcement needs to be disseminated (e.g., from `Reportr` about a release).
*   **`on_feedback_submission`:** Triggered by a user submitting feedback via a form.
*   **`on_scheduled_community_scan`:** Periodically scans channels for overall sentiment and trending topics.
*   **`on_gamification_achievement`:** Triggered by `Gameifir` for congratulatory messages or quest updates.

## 5. Autonomous Behavior & Workflow

1.  **Message Monitoring & Response:** `Connectr` listens to designated community channels. If a message contains a common keyword or question, it uses its knowledge base (via LLM) to provide an immediate, accurate response. For direct messages, it can engage in longer-form conversational support.
2.  **Sentiment Analysis:** It continuously analyzes the sentiment of community discussions, flagging sudden shifts in mood (e.g., a surge in negative sentiment) to `Riskr` or human community managers.
3.  **Announcement Dissemination:** Upon receiving a new announcement, `Connectr` formats it appropriately for various platforms and posts it, ensuring wide and consistent reach.
4.  **Feedback Aggregation:** Collects user feedback from various sources, summarizes it using LLMs, identifies key themes, and provides reports to `Plannr` for roadmap consideration.
5.  **Support Escalation:** If `Connectr` cannot resolve a user query through its knowledge base, it intelligently routes the query to a human support agent within a dedicated support ticket system, providing all relevant context.
6.  **Gamification Integration:** Sends personalized congratulatory messages to users when `Gameifir` awards points or badges, reinforcing positive behavior.

## 6. Example Interaction (via n8n)

An `n8n` workflow for automated Discord support:

1.  **Trigger:** Discord Webhook `New Message in #support Channel`.
2.  **Node 1 (Conditional - @Connectr Mention):** If the message mentions `@Connectr` or is a direct message to `Connectr`.
    *   **Node 2 (MCP Call: `connectr.respond_to_dm`):** Call `Connectr` with the user's message and conversation history.
    *   **Node 3 (Conditional - Escalation Needed):** If `Connectr`'s response indicates `escalation_required == true`:
        *   **Node 4 (Zendesk API):** Create a new support ticket in Zendesk with the full conversation history.
        *   **Node 5 (Discord API):** Post a message in the #support channel: "Thanks for your query. A human agent will be with you shortly. Your ticket ID is `XYZ`."
    *   **Node 6 (Else - Direct Response):**
        *   **Node 7 (Discord API):** Post `Connectr`'s generated response directly in the channel/DM.

`Connectr` is the embodiment of MemoryChain's commitment to its community, ensuring a vibrant, informed, and supportive environment that fuels collaboration and growth.
