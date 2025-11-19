# Agent Profile: Cureatr (The Curation Agent)

---

## 1. Purpose & Core Function

`Cureatr` is the quality control and contextual linking specialist within MemoryChain's content pipeline. Its primary purpose is to ensure the integrity, relevance, and interconnectedness of all archived content and its metadata. `Cureatr` acts as an automated librarian and historian, constantly verifying information, identifying relationships between assets, and maintaining the semantic graph of the MemoryChain archive.

## 2. Personality & Guiding Principles

*   **Discerning:** `Cureatr` possesses a keen eye for detail and context, identifying inconsistencies or opportunities for deeper connections.
*   **Persistent:** Continuously works to refine and improve the archive's organization and metadata quality.
*   **Connector:** Actively seeks to link related assets and build a richer, more navigable knowledge graph.

## 3. Tools & Model Context Protocol (MCP) Interactions

`Cureatr` leverages advanced LLM capabilities, knowledge graph databases, and communication with other agents.

*   **Core Tools (MCP-Wrapped):**
    *   **LLMs:** For understanding complex relationships, disambiguation, and generating contextual summaries.
    *   **Knowledge Graph Database (e.g., Neo4j, GraphQL APIs to Ceramic/ComposeDB):** For querying and updating the semantic relationships between assets, entities, and events.
    *   **Metadata Service API:** For CRUD operations on asset metadata.
    *   **Verifiable Credential Service API:** For checking the status and provenance of credentials.
    *   **Text/Image/Audio Comparison Algorithms:** For detecting potential duplicates or highly similar content.
*   **MCP Interactions:**
    *   **Input:** Receives an asset's CID, its current metadata, related CIDs, or requests for content quality review.
    *   **Output:** Returns suggested metadata corrections, new relationship proposals (e.g., "Asset X is related to Asset Y because..."), content quality flags, or duplicate detection alerts.
    *   **Key MCP Endpoints:**
        *   `cureatr.review_asset_quality(cid: str) -> CurationReport`
        *   `cureatr.propose_asset_relationships(cid1: str, cid2: str) -> RelationshipProposal`
        *   `cureatr.detect_duplicates(cid: str, threshold: float) -> List[DuplicateCID]`
        *   `cureatr.verify_metadata_accuracy(cid: str, metadata: Dict) -> VerificationReport`

## 4. Trigger Mechanisms

`Cureatr` is triggered by a variety of events, both internal and external:

*   **`on_metadata_enriched`:** After `MetaRich` completes its initial processing of an asset.
*   **`on_new_knowledge_graph_data`:** When new external knowledge sources become available.
*   **`on_user_feedback`:** If a user flags an asset's metadata as incorrect or incomplete.
*   **`on_scheduled_archive_audit`:** Periodic scans of sections of the archive for consistency and quality.

## 5. Autonomous Behavior & Workflow

1.  **Metadata Validation & Correction:** `Cureatr` receives an asset's metadata (from `MetaRich` or human input) and cross-references it with internal knowledge bases and external facts (e.g., using LLMs to check historical accuracy of dates/names). If discrepancies are found, it proposes corrections to the `Orchestrator` (Content Management).
2.  **Relationship Discovery:** It proactively scans newly added assets and compares them with existing assets to identify potential semantic relationships (e.g., "This letter mentions an event described in that newspaper article"). These proposed links are added to the knowledge graph.
3.  **Duplicate Detection:** `Cureatr` performs similarity checks to identify potential duplicate assets or redundant information, flagging them for human review or consolidation.
4.  **Content Quality Assessment:** Evaluates the asset itself for potential issues (e.g., low-resolution images flagged for re-ingestion, incomplete document scans). It communicates these findings to the relevant agents or human curators.
5.  **Schema Enforcement:** Ensures that metadata adheres to established schemas (e.g., Dublin Core, institutional-specific standards).
6.  **Integration with `Orchestrator` (Content Management):** Reports on content quality, proposed relationships, and any required human interventions.

## 6. Example Interaction (via n8n)

An `n8n` workflow for continuous content curation:

1.  **Trigger:** Event `MetadataEnriched` from `MetaRich` agent.
2.  **Node 1 (MCP Call: `cureatr.review_asset_quality`):** Call `Cureatr` with the newly enriched asset's CID.
3.  **Node 2 (Conditional - Quality Flag):** If `Cureatr` returns a "low quality" flag or "needs human review":
    *   **Node 3 (Task Management API):** Create a high-priority task in a human curation queue for "Review Metadata for Asset [CID]".
    *   **Node 4 (Slack/Email):** Notify the Head Curator.
4.  **Node 5 (MCP Call: `cureatr.propose_asset_relationships`):** Call `Cureatr` to find related assets based on semantic analysis.
5.  **Node 6 (MemoryChain Backend API):** If relationships are proposed, update the asset's knowledge graph entries.
6.  **Node 7 (Optional - Gamification):** Award bonus `$TRUTH` points to `MetaRich` if `Cureatr` consistently approves its metadata without intervention.

`Cureatr` ensures that MemoryChain is not just a dump of data, but a meticulously organized, richly interconnected, and continuously verified knowledge repository, providing deep value to its users.
