# Agent Profile: Ingestr (The Ingestion Agent)

---

## 1. Purpose & Core Function

`Ingestr` is the primary gateway for all digital assets entering the MemoryChain archive. Its core purpose is to efficiently and reliably manage the entire ingestion process, from receiving raw files to ensuring their initial secure placement on IPFS and preparing them for further processing. `Ingestr` is designed to handle a variety of file types and sources, abstracting the complexities of decentralized storage interaction.

## 2. Personality & Guiding Principles

*   **Efficient:** `Ingestr` prioritizes speed and resource optimization in handling large volumes of incoming data.
*   **Reliable:** Ensures every incoming asset is correctly processed and provided with its unique identifier.
*   **Adaptable:** Can be configured to accept files from various input methods and formats.

## 3. Tools & Model Context Protocol (MCP) Interactions

`Ingestr` interacts heavily with file systems, IPFS clients, and various parsing tools, all exposed through MCP.

*   **Core Tools (MCP-Wrapped):**
    *   **IPFS Client (Helia/IPFS HTTP API):** For adding files to the local IPFS node/network and generating CIDs.
    *   **File Type Detectors:** Libraries for identifying file formats (e.g., `mime-types`).
    *   **Temporary Storage Management:** Tools for handling incoming file buffers and temporary disk storage.
    *   **Hashers:** For generating cryptographic hashes to ensure data integrity during transfer.
*   **MCP Interactions:**
    *   **Input:** Receives binary file data (e.g., `Buffer`, `Blob`), original filename, and optional initial metadata (from human input).
    *   **Output:** Returns the IPFS Content Identifier (CID) for the ingested asset, basic file properties (size, mime type), and a confirmation of successful staging.
    *   **Key MCP Endpoints:**
        *   `ingestr.add_file_to_ipfs(file_data: bytes, filename: str) -> IngestionResult`
        *   `ingestr.receive_file_stream(stream_id: str, chunk: bytes) -> ProcessingStatus`
        *   `ingestr.finalize_stream_ingestion(stream_id: str) -> IngestionResult`

## 4. Trigger Mechanisms

`Ingestr` is primarily activated by user actions and API calls:

*   **`on_file_upload_to_frontend`:** Triggered directly from the Admin Dashboard's upload component.
*   **`on_api_ingest_call`:** Activated by external systems or batch ingestion processes through a dedicated API endpoint.
*   **`on_scheduled_folder_scan`:** (Future) Monitors a designated hot folder for new files to ingest automatically.

## 5. Autonomous Behavior & Workflow

1.  **Receive & Validate:** Upon receiving a file (or stream of chunks), `Ingestr` performs basic validation (e.g., file size limits, allowed file types).
2.  **IPFS Staging:** Adds the raw file data to the local IPFS node, receiving a CID. This is a critical step, as the CID becomes the asset's immutable identifier.
3.  **Metadata Extraction (Basic):** Extracts basic, inherent file metadata (e.g., file size, mime type, creation date from EXIF for images).
4.  **Confirm & Hand-off:** Stores the CID and basic metadata temporarily, then signals successful ingestion and passes the CID and initial metadata to the `MetaRich` agent for further processing, and to the main MemoryChain backend for database record creation.
5.  **Error Handling:** Implements robust retry mechanisms for IPFS operations and detailed logging for any ingestion failures, notifying `Orchestrator` (QA Lead) if necessary.

## 6. Example Interaction (via n8n)

An `n8n` workflow for a high-volume batch ingestion scenario:

1.  **Trigger:** Manual button click in `n8n` or `on_new_files_in_dropbox` (using Dropbox Watch Node).
2.  **Node 1 (File Iterator):** Iterates through each file in the source (e.g., a batch of historical documents).
3.  **Node 2 (MCP Call: `ingestr.add_file_to_ipfs`):** Sends file binary data to `Ingestr`.
    *   **Output:** `{"cid": "Qm...", "filename": "document.pdf", "size": 12345}`
4.  **Node 3 (MemoryChain Backend API):** Calls the MemoryChain backend's asset API to create a new asset record, passing the CID and initial filename.
5.  **Node 4 (MCP Call: `metarich.enrich_metadata`):** Calls the `MetaRich` agent's MCP endpoint with the new CID, triggering metadata enrichment.
6.  **Node 5 (Success/Failure Notification):** Sends an email or Slack message summarizing the batch ingestion results (e.g., "50 files ingested, 2 failures").

`Ingestr` forms the vital first link in the MemoryChain, guaranteeing that every piece of our collective memory is securely and reliably brought into the decentralized archive.
