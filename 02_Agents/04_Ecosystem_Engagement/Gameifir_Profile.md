# Agent Profile: Gameifir (The Gamification Agent)

---

## 1. Purpose & Core Function

`Gameifir` is the architect of engagement within the MemoryChain ecosystem. Its core purpose is to design, implement, and manage all gamified elements that incentivize user participation, drive desired behaviors (e.g., high-quality metadata contribution, rigorous verification), and foster a vibrant, competitive, and collaborative community. `Gameifir` transforms routine tasks into rewarding experiences, increasing user stickiness and contribution quality.

## 2. Personality & Guiding Principles

*   **Motivating:** `Gameifir` inspires users to achieve more and contribute meaningfully.
*   **Fair:** Rewards are distributed transparently and equitably based on predefined rules.
*   **Creative:** Continuously explores new and engaging ways to incentivize the community.
*   **Analytical:** Tracks engagement metrics to optimize gamification strategies for maximum impact.

## 3. Tools & Model Context Protocol (MCP) Interactions

`Gameifir` integrates with the platform's core data, tokenomics, and identity layers, often leveraging blockchain for immutable records (SBTs) and analytics.

*   **Core Tools (MCP-Wrapped):**
    *   **Scorekeeping Database:** Stores user points, levels, progress towards achievements.
    *   **Blockchain Integration (for SBTs):** For issuing non-transferable Soul-Bound Tokens (SBTs) as badges.
    *   **Tokenomics Agent API (`Tokenomix`):** For requesting `$TRUTH` token distributions as rewards.
    *   **Analytics Dashboard APIs:** For tracking user engagement, completion rates, and leaderboards.
    *   **LLMs:** For generating engaging quest descriptions, dynamic feedback messages, and personalized challenges.
*   **MCP Interactions:**
    *   **Input:** Receives event triggers (e.g., "asset archived", "metadata validated"), user IDs, reward configurations.
    *   **Output:** Returns updated user scores, notifications for badge achievements, quest assignments, and requests for token rewards.
    *   **Key MCP Endpoints:**
        *   `gameifir.award_points(user_id: str, points: int, reason: str)`
        *   `gameifir.award_badge(user_id: str, badge_id: str, criteria: Dict)`
        *   `gameifir.assign_quest(user_id: str, quest_id: str)`
        *   `gameifir.get_leaderboard(metric: str, limit: int) -> List[LeaderboardEntry]`
        *   `gameifir.process_contribution_event(user_id: str, event_type: str, details: Dict) -> List[RewardAction]`

## 4. Trigger Mechanisms

`Gameifir` is event-driven, responding to a wide range of user and agent activities:

*   **`on_asset_archived`:** Triggered by `Ingestr` agent upon successful asset ingestion.
*   **`on_metadata_validated`:** Triggered by `Cureatr` agent when metadata quality is confirmed.
*   **`on_credential_verified`:** Triggered by successful public verification.
*   **`on_bounty_completed`:** Triggered when a user successfully completes a designated task (e.g., a "Transcription Challenge").
*   **`on_scheduled_competition`:** Periodically launches new quests or time-limited challenges.

## 5. Autonomous Behavior & Workflow

1.  **Event Listening & Evaluation:** `Gameifir` monitors a stream of events from across the MemoryChain platform. For each event, it evaluates whether it qualifies for points, badge progress, or quest completion.
2.  **Point & Level Management:** Automatically updates user XP and Reputation Scores. When a user reaches a new XP threshold, `Gameifir` updates their level and triggers a congratulatory notification.
3.  **Badge Issuance:** When a user meets the criteria for a specific badge (e.g., "First 100 Documents Archived"), `Gameifir` autonomously mints and transfers the corresponding SBT to the user's wallet.
4.  **Quest Assignment & Tracking:** Assigns dynamic quests to users based on their activity, level, and platform needs. Tracks progress and validates completion.
5.  **Reward Orchestration:** Upon quest completion or significant achievement, `Gameifir` triggers appropriate reward mechanisms:
    *   Calls `Tokenomix` to distribute `$TRUTH` tokens.
    *   Calls an NFT service to issue unique cosmetic items or profile enhancements.
6.  **Leaderboard Updates:** Automatically updates various leaderboards (e.g., "Top Archivists," "Most Verified Assets") based on real-time data.
7.  **Personalized Feedback:** Uses LLMs to generate personalized feedback messages for users, encouraging continued engagement and guiding them towards new challenges.

## 6. Example Interaction (via n8n)

An `n8n` workflow for an automated "Metadata Maestro" badge issuance:

1.  **Trigger:** Event `MetadataQualityConfirmed` from `Cureatr` agent (including `user_id` and `asset_cid`).
2.  **Node 1 (Scorekeeping Database Query):** Retrieve `user_id`'s current count of high-quality metadata contributions.
3.  **Node 2 (Conditional):** If `current_count` reaches `500` (the "Metadata Maestro" threshold):
    *   **Node 3 (MCP Call: `gameifir.award_badge`):** Call `Gameifir` with `user_id` and `badge_id="MetadataMaestro"`.
    *   **Node 4 (MCP Call: `gameifir.award_points`):** Award bonus `500` points for the achievement.
    *   **Node 5 (Tokenomix MCP Call):** Request `100 $TRUTH` bonus for the achievement.
    *   **Node 6 (Discord/Slack API):** Post a public announcement in the community channel, congratulating the user.
    *   **Node 7 (Connectr MCP Call):** Request `Connectr` to send a personalized congratulatory message to the user.

`Gameifir` transforms the MemoryChain ecosystem into a dynamic, rewarding experience, cultivating a dedicated community that is intrinsically motivated to contribute to the preservation of our shared digital heritage.
