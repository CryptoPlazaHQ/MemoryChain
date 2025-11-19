# Agent Department: 02. Content Management

---

## 1. Mission Statement

The **Content Management Department** is the intelligent engine driving MemoryChain's archive. Its mission is to efficiently and intelligently ingest, enrich, curate, and make discoverable all digital assets and their associated metadata. This department ensures that raw data is transformed into semantically rich, verifiable, and easily accessible knowledge, forming the core of the living archive.

## 2. Core Principles

*   **Intelligent Ingestion:** Automate and optimize the process of bringing diverse data into the MemoryChain.
*   **Semantic Enrichment:** Transform raw data into structured, meaningful information through AI-driven metadata generation and linking.
*   **Continuous Curation:** Proactively maintain the quality, relevance, and interconnectedness of archived content.
*   **Discoverability:** Ensure that valuable information is not just stored, but easily found and understood by various user groups and other agents.

## 3. Departmental Agents

This department comprises the following specialized AI agents, each contributing to a seamless content pipeline:

*   **`Ingestr` (The Ingestion Agent):** Manages the entire process of bringing new digital assets into the system.
*   **`MetaRich` (The Metadata Enrichment Agent):** Specializes in generating, validating, and enhancing metadata for archived assets.
*   **`Cureatr` (The Curation Agent):** Oversees the quality, categorization, and contextual linking of archived content.
*   **`Discovr` (The Discovery Agent):** Optimizes content for search and ensures its retrievability.

## 4. Interaction with Other Departments & External Services

Content Management agents frequently interact with:

*   **Frontend (Admin Dashboard):** `Ingestr` receives uploaded files and initial metadata.
*   **Backend Services:** All agents interact with MemoryChain's Metadata Service and Filecoin Storage Service.
*   **Quality Assurance:** `MetaRich` can request validation from `Docu` on metadata schemas, and `Cureatr` might flag content for `Secur` review.
*   **AI & LLMs:** All agents extensively use LLMs for processing, summarization, and semantic analysis.
*   **Decentralized Storage:** Direct interaction with IPFS for content addressing and retrieval.
*   **`n8n` Workflows:** Orchestrates complex content pipelines, often involving human-in-the-loop steps.

## 5. Workflow Example (n8n Integration)

A typical workflow for a new asset ingestion, orchestrated by `n8n`:

1.  **Trigger:** `n8n` workflow starts `on new file upload to Admin Dashboard`.
2.  **Node 1 (MCP Call: `ingestr.process_upload`):** `Ingestr` receives the uploaded file, pushes it to IPFS, and returns a CID.
3.  **Node 2 (MCP Call: `metarich.enrich_metadata`):** `MetaRich` takes the CID and initial human-provided metadata, uses LLMs to generate suggested tags, summaries, and categorize the content.
4.  **Node 3 (Conditional - Human Review):** If `MetaRich` flags the content as sensitive or needing manual review:
    *   **Node 4 (Email/Slack):** Notify a human curator.
    *   **Node 5 (Wait Node):** Pause workflow until human approval.
5.  **Node 6 (MCP Call: `cureatr.finalize_curation`):** `Cureatr` reviews and finalizes the metadata.
6.  **Node 7 (MCP Call: `discovr.index_asset`):** `Discovr` adds the asset's metadata and embeddings to the vector database for semantic search.
7.  **Node 8 (Filecoin Storage Service API):** Initiate Filecoin storage deal for the CID.
8.  **Node 9 (Notification):** Send confirmation to administrator.

This department ensures that MemoryChain's archive is not just a collection of files but a meticulously managed, semantically rich, and intelligently connected repository of knowledge.
