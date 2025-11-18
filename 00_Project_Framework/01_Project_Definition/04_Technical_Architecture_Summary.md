# 04. Technical Architecture Summary: MemoryChain

This document provides a high-level overview of the MemoryChain technical architecture, illustrating the key components and their interactions. The design prioritizes decentralization, intelligent data interaction via Model Context Protocol (MCP), and a robust workflow for institutional data management.

## Architecture Flow Diagram

```mermaid
graph TD
    subgraph Frontend (React App)
        A[User Interface] --> B(Login Page);
        B -- Authenticated --> C(Admin Dashboard);
        C -- Unauthenticated --> B;
        C --> D(Verification Page);
        D -- CID Input --> D;
    end

    subgraph Backend (Node.js / Express.js)
        E[API Gateway] --> F(Authentication Service);
        E --> G(Metadata Service);
        E --> H(Filecoin Storage Service);
        E --> I(Verifiable Credential Service);
        E --> J(LLM Orchestration Service via MCP);
    end

    subgraph Decentralized Storage & Network
        K[IPFS Network] -- CID --> L(Filecoin Storage Providers);
        L -- Storage Deals --> M(Filecoin Blockchain);
    end

    subgraph AI & Data Intelligence
        N[LLM Models] -- via MCP --> J;
        O[Vector Database] -- Embeddings --> J;
        P[MCP Servers] -- Tools/Context --> N;
    end

    subgraph External Services
        Q[Identity & Attestation Layer Provider] -- Auth/VCs --> F;
        R[Blockchain Network] -- Transactions --> M;
    end

    A -- Access --> E;
    C -- Upload File --> K;
    C -- Submit Metadata --> G;
    C -- Request Storage Deal --> H;
    C -- Request VC --> I;
    D -- Request Metadata --> G;
    G -- Store CID --> K;
    G -- Store Metadata --> O;
    H -- Interact --> L;
    I -- Issue VCs --> Q;
    J -- Process Data --> G;
    J -- Semantic Search --> O;
    J -- Interact with Tools --> P;

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#f9f,stroke:#333,stroke-width:2px
    style C fill:#f9f,stroke:#333,stroke-width:2px
    style D fill:#f9f,stroke:#333,stroke-width:2px
    style E fill:#ccf,stroke:#333,stroke-width:2px
    style F fill:#ccf,stroke:#333,stroke-width:2px
    style G fill:#ccf,stroke:#333,stroke-width:2px
    style H fill:#ccf,stroke:#333,stroke-width:2px
    style I fill:#ccf,stroke:#333,stroke-width:2px
    style J fill:#ccf,stroke:#333,stroke-width:2px
    style K fill:#cfc,stroke:#333,stroke-width:2px
    style L fill:#cfc,stroke:#333,stroke-width:2px
    style M fill:#cfc,stroke:#333,stroke-width:2px
    style N fill:#ffc,stroke:#333,stroke-width:2px
    style O fill:#ffc,stroke:#333,stroke-width:2px
    style P fill:#ffc,stroke:#333,stroke-width:2px
    style Q fill:#fcf,stroke:#333,stroke-width:2px
    style R fill:#fcf,stroke:#333,stroke-width:2px
```

## Key Workflow Summaries:

### 1. Authentication Flow
*   **User Interaction:** Institutional users access the MemoryChain frontend.
*   **Login:** Users attempt to log in via the `LoginPage`.
*   **Authentication Service:** The `Authentication Service` (backend) verifies user credentials, potentially interacting with an external `Identity & Attestation Layer Provider` (e.g., a Verifiable Credential Provider or a LIT-implemented system).
*   **Authorization:** Upon successful authentication, the user gains access to protected routes like the `Admin Dashboard`.

### 2. Data Ingestion Flow
*   **User Action:** An authenticated institutional user uploads a file via the `Admin Dashboard`.
*   **IPFS Upload:** The frontend (using Helia) uploads the file directly to the `IPFS Network`, receiving a Content Identifier (CID).
*   **Metadata Submission:** The user provides metadata (title, author, description, etc.) through the `Admin Dashboard`.
*   **Metadata Service:** The `Metadata Service` (backend) receives the CID and metadata.
*   **LLM Orchestration via MCP:** The `LLM Orchestration Service` (backend) utilizes the `Model Context Protocol (MCP)` to interact with `LLM Models`. The LLMs, via MCP, can access the IPFS content (using the CID) and the provided metadata to generate enriched metadata, tags, summaries, or perform data quality checks.
*   **Metadata Storage:** The enriched metadata is stored in a `PostgreSQL` database and potentially a `Vector Database` for semantic search.
*   **Filecoin Storage:** The `Filecoin Storage Service` (backend) initiates a storage deal with `Filecoin Storage Providers` for the IPFS CID, ensuring long-term verifiable persistence on the `Filecoin Blockchain`.

### 3. Metadata Generation & Semantic Indexing (LLM-driven via MCP)
*   **Trigger:** New IPFS data and initial metadata are available.
*   **LLM Orchestration Service:** This service acts as the central hub, using the `Model Context Protocol (MCP)` to communicate with various `LLM Models`.
*   **MCP Servers:** These external services (or internal modules acting as MCP servers) provide the LLMs with specific tools and context. For MemoryChain, an MCP server might expose tools to:
    *   Retrieve IPFS content given a CID.
    *   Access existing metadata from the `Metadata Service`.
    *   Interact with the `Vector Database` to store/retrieve embeddings.
*   **LLM Processing:** The LLMs analyze the IPFS content and metadata, generating embeddings, semantic tags, summaries, and potentially identifying entities or relationships.
*   **Semantic Indexing:** The generated embeddings and enriched metadata are stored in the `Vector Database`, enabling advanced semantic search capabilities.

### 4. Editing, Approval & Checking Workflow
*   **Admin Dashboard:** Institutional administrators can view, edit, and approve metadata for uploaded assets.
*   **Metadata Service:** Backend service manages updates to metadata in the `PostgreSQL` database.
*   **Verifiable Credentials:** Upon approval, the `Verifiable Credential Service` (backend) interacts with the `Identity & Attestation Layer Provider` to issue verifiable credentials for the asset, linking its CID and approved metadata.
*   **Audit Trail:** All significant actions (upload, metadata edit, approval, VC issuance) are recorded, potentially on a `Blockchain Network` for an immutable audit trail.

### 5. Semantic Search & Data Interaction
*   **User Query:** Users (institutional or public) submit natural language queries via the frontend.
*   **LLM Orchestration Service:** The query is processed by an LLM (via MCP) which translates it into a semantic search query.
*   **Vector Database:** The `Vector Database` is queried using the semantic embeddings, returning relevant CIDs and metadata.
*   **IPFS Retrieval:** Relevant content can be retrieved from the `IPFS Network` using the CIDs.
*   **Agentic Interaction:** Future agents, leveraging MCP, can further process search results, correlate data across different MCPs, and provide deeper insights.

## Technology Stack Summary:

*   **Frontend:** React (Vite), Tailwind CSS (planned), UI Component Library (planned).
*   **Backend:** Node.js (TypeScript), Express.js.
*   **Databases:** PostgreSQL (metadata), Vector Database (e.g., Pinecone, Weaviate for embeddings).
*   **Decentralized Storage:** IPFS (Helia), Filecoin.
*   **Blockchain:** Filecoin Blockchain (for storage deals), potentially other Blockchain Networks for audit trails/NFTs.
*   **AI/LLM:** LLM Models (e.g., OpenAI, Hugging Face, custom), Model Context Protocol (MCP) for orchestration.
*   **Identity/Auth:** Identity & Attestation Layer Provider (e.g., Verifiable Credential Provider, Lit Protocol).
*   **Deployment:** Docker, Nginx.
