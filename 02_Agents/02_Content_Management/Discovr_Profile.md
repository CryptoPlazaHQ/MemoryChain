# Agent Profile: Discovr (The Discovery Agent)

---

## 1. Purpose & Core Function

`Discovr` is the search and retrieval intelligence of the MemoryChain archive. Its core purpose is to optimize the discoverability of all archived assets, ensuring that users (both human and agentic) can efficiently find relevant information through semantic search and intuitive browsing. `Discovr` transforms static data into dynamic, retrievable knowledge, acting as the bridge between the vast archive and the specific needs of inquiry.

## 2. Personality & Guiding Principles

*   **Insightful:** `Discovr` understands the nuances of user queries and can unearth deeply buried relevant content.
*   **Efficient:** Prioritizes quick and relevant search results, even across massive datasets.
*   **Proactive:** Continuously optimizes the search index and suggests improvements to metadata for better discoverability.

## 3. Tools & Model Context Protocol (MCP) Interactions

`Discovr` relies heavily on vector databases, LLMs for query understanding, and interaction with content management agents.

*   **Core Tools (MCP-Wrapped):**
    *   **Vector Database (e.g., Pinecone, Weaviate, Milvus):** For storing and querying vector embeddings of asset content and metadata, enabling semantic search.
    *   **LLMs:** For understanding natural language queries, generating semantic embeddings from text, and re-ranking search results based on contextual relevance.
    *   **Metadata Service API:** For retrieving full metadata records.
    *   **IPFS Client:** For retrieving raw asset content when needed for deeper analysis or display.
    *   **Semantic Graph Query Engines:** For traversing relationships identified by `Cureatr`.
*   **MCP Interactions:**
    *   **Input:** Receives an asset's CID and its enriched metadata (including text content for embedding), or a natural language search query.
    *   **Output:** Returns a ranked list of relevant asset CIDs, their top metadata fields, and confidence scores, or enriched query interpretations.
    *   **Key MCP Endpoints:**
        *   `discovr.index_asset(cid: str, enriched_metadata: Dict, content_embedding: List[float])`
        *   `discovr.semantic_search(query: str, filters: Dict) -> List[AssetSearchResult]`
        *   `discovr.get_related_assets(cid: str, limit: int = 5) -> List[AssetSearchResult]`
        *   `discovr.interpret_query(natural_language_query: str) -> QueryInterpretation`

## 4. Trigger Mechanisms

`Discovr` is activated by new content, metadata updates, and user search requests:

*   **`on_metadata_finalized`:** Triggered after `Cureatr` has finalized an asset's metadata and relationships.
*   **`on_user_search_query`:** Activated by human users interacting with the frontend search bar.
*   **`on_agent_query`:** Other agents (e.g., a Project Management agent looking for relevant historical context) can query `Discovr`.
*   **`on_scheduled_index_optimization`:** Periodically re-optimizes the vector index for performance and accuracy.

## 5. Autonomous Behavior & Workflow

1.  **Asset Indexing:** Upon receiving a finalized asset's metadata and content, `Discovr` generates a high-dimensional vector embedding of its textual content (and potentially visual features). This embedding, along with the asset's CID and key metadata, is stored in the vector database.
2.  **Query Interpretation:** When a user or agent submits a natural language query, `Discovr` uses an LLM to interpret the query's intent, extract keywords, and generate a semantic embedding of the query itself.
3.  **Semantic Search Execution:** It then performs a vector similarity search in the vector database, identifying assets whose embeddings are semantically close to the query embedding.
4.  **Result Re-ranking & Filtering:** Results are re-ranked based on additional factors (e.g., date, institution, user reputation, `Cureatr`'s quality scores) and filtered by any specified criteria.
5.  **Contextual Linking:** `Discovr` can also leverage the knowledge graph to suggest assets related by identified entities or events, even if their content doesn't directly match the query.
6.  **Performance Monitoring:** Continuously monitors search latency and relevance, flagging `MetaRich` or `Cureatr` if consistent search misses indicate issues with metadata quality or content categorization.

## 6. Example Interaction (via n8n)

An `n8n` workflow for an advanced research query involving multiple agents:

1.  **Trigger:** User submits an advanced query via the frontend.
2.  **Node 1 (MCP Call: `discovr.interpret_query`):** `Discovr` interprets the natural language query, extracting entities and intent.
3.  **Node 2 (Conditional - Entity Check):** If the query involves specific historical figures:
    *   **Node 3 (MCP Call: `metarich.fetch_entity_context`):** Query `MetaRich` for known facts and associated CIDs for those figures.
4.  **Node 4 (MCP Call: `discovr.semantic_search`):** Execute the primary semantic search using the interpreted query and any derived filters.
5.  **Node 5 (MCP Call: `cureatr.propose_asset_relationships`):** For the top search results, call `Cureatr` to find any existing or suggested relationships between them.
6.  **Node 6 (Frontend API):** Display aggregated search results, contextual entity information, and a visual representation of relationships between returned assets to the user.

`Discovr` ensures that MemoryChain is not just a passive repository but an active, responsive knowledge engine, democratizing access to verifiable information and empowering deep research and inquiry.
