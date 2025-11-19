# Agent Profile: MetaRich (The Metadata Enrichment Agent)

---

## 1. Purpose & Core Function

`MetaRich` is the intelligence layer for MemoryChain's archived assets. Its core purpose is to transform raw asset data and basic human input into rich, structured, and semantically valuable metadata. By leveraging advanced LLM capabilities and specialized knowledge bases, `MetaRich` ensures that every asset is thoroughly described, easily discoverable, and meaningfully connected within the broader archive.

## 2. Personality & Guiding Principles

*   **Intelligent:** `MetaRich` possesses a deep understanding of content, capable of extracting nuanced information.
*   **Thorough:** It strives for comprehensive metadata, leaving no relevant detail overlooked.
*   **Context-Aware:** `MetaRich` considers the asset's type, source, and existing information to provide highly relevant suggestions.
*   **Adaptive:** Continuously refines its metadata generation capabilities based on feedback and new data.

## 3. Tools & Model Context Protocol (MCP) Interactions

`MetaRich` heavily utilizes LLMs, content analysis tools, and various knowledge graphs, all accessed via MCP.

*   **Core Tools (MCP-Wrapped):**
    *   **LLMs (e.g., Gemini, GPT-4):** For natural language understanding, summarization, entity extraction, and content classification.
    *   **OCR (Optical Character Recognition) Engines:** For extracting text from image-based documents (e.g., Tesseract).
    *   **Audio-to-Text Transcription Services:** For processing audio assets.
    *   **Image Analysis APIs:** For object detection, facial recognition, and scene understanding in visual assets.
    *   **Knowledge Graph/Ontology APIs:** For linking extracted entities to external knowledge bases (e.g., Wikidata, historical archives).
    *   **Data Validation Services:** For checking against metadata schemas (e.g., Dublin Core, MODS).
*   **MCP Interactions:**
    *   **Input:** Receives an asset's CID, initial human-provided metadata, and optionally, specific metadata fields to focus on.
    *   **Output:** Returns a comprehensive set of enriched metadata fields, including summaries, keywords, categorized tags, identified entities (people, places, organizations, dates), and confidence scores for suggestions.
    *   **Key MCP Endpoints:**
        *   `metarich.enrich_from_cid(cid: str, initial_metadata: Dict) -> EnrichedMetadata`
        *   `metarich.summarize_content(cid: str, length: str = "medium") -> str`
        *   `metarich.extract_entities(cid: str) -> List[Entity]`
        *   `metarich.suggest_tags(cid: str, category: str = "general") -> List[str]`
        *   `metarich.validate_metadata_schema(metadata: Dict, schema_id: str) -> ValidationReport`

## 4. Trigger Mechanisms

`MetaRich` is primarily triggered by newly ingested assets and requests for metadata enhancement:

*   **`on_asset_ingested`:** After `Ingestr` successfully processes a file and returns a CID.
*   **`on_manual_metadata_request`:** When a human administrator requests additional metadata suggestions for an asset.
*   **`on_scheduled_metadata_review`:** Periodically re-evaluates older assets to enrich them with newly available knowledge graph data or improved LLM models.

## 5. Autonomous Behavior & Workflow

1.  **Content Retrieval:** Upon receiving an asset's CID, `MetaRich` uses an MCP-wrapped tool to fetch the content from IPFS.
2.  **Multimodal Analysis:**
    *   If text-based, it directly processes the text.
    *   If image-based, it uses OCR to extract text and image analysis APIs for visual content understanding.
    *   If audio/video, it uses transcription services to convert to text.
3.  **LLM-Driven Enrichment:** Passes the extracted text/data to LLMs to perform:
    *   **Summarization:** Create concise abstracts.
    *   **Entity Extraction:** Identify and categorize named entities (people, organizations, locations, dates).
    *   **Keyword & Tag Generation:** Suggest relevant keywords and tags for discoverability.
    *   **Content Classification:** Assign the asset to predefined categories (e.g., "Legal Document," "Historical Photograph," "Oral History").
4.  **Knowledge Graph Linking:** For extracted entities, `MetaRich` queries external knowledge graphs to link entities to canonical IDs and retrieve additional context.
5.  **Human Review & Learning:** Presents enriched metadata suggestions to human curators for review. Incorporates feedback to fine-tune its models and improve accuracy.
6.  **Integration with `Orchestrator`:** Reports metadata enrichment progress and any potential issues (e.g., content too ambiguous for accurate metadata) to the `Orchestrator` agent.

## 6. Example Interaction (via n8n)

An `n8n` workflow for intelligent metadata generation:

1.  **Trigger:** Event `AssetArchived` from `Ingestr` agent.
2.  **Node 1 (MCP Call: `metarich.enrich_from_cid`):** Call `MetaRich` with the new asset's CID and any initial metadata.
3.  **Node 2 (Conditional - AI Confidence Threshold):** If `MetaRich` returns metadata suggestions with high confidence:
    *   **Node 3 (MemoryChain Backend API):** Update the asset record with the enriched metadata.
    *   **Node 4 (MCP Call: `discovr.index_asset`):** Trigger the `Discovr` agent to index the asset.
4.  **Node 5 (Else - Low Confidence/Manual Review Required):**
    *   **Node 6 (Task Management API):** Create a task in a human curation queue for "Review Metadata for Asset [CID]".
    *   **Node 7 (Email/Slack):** Notify a human curator.

`MetaRich` ensures that MemoryChain's archive is not just a repository of bits, but a living, intelligent database of interconnected knowledge, ready for deep inquiry and discovery.
