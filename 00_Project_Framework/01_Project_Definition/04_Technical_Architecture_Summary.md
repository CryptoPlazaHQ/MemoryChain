# 04. Technical Architecture Summary: MemoryChain

This document provides a high-level overview of the MemoryChain technical architecture, illustrating the key components and their interactions. The design prioritizes decentralization, intelligent data interaction via Model Context Protocol (MCP), and a robust workflow for institutional data management.

# 04. Technical Architecture Summary: MemoryChain - Engineering Trust for Institutions

This document provides a high-level overview of the MemoryChain technical architecture, illustrating the key components and their interactions, with a specific focus on addressing the challenges faced by educational and knowledge-driven institutions. The design prioritizes decentralized permanence, intelligent data interaction via Model Context Protocol (MCP), and a robust workflow for verifiable credentialing and institutional data management.

## Architecture Flow Diagram

```mermaid
graph TD
    subgraph Frontend (React App)
        A[User Interface - For Institutions] --> B(Login Page);
        B -- Authenticated --> C(Admin Dashboard - Credentialing & Archival);
        C -- Unauthenticated --> B;
        C --> D(Verification Page - Public/Institutional);
        D -- CID/Credential ID Input --> D;
    end

    subgraph Backend (Node.js / Express.js)
        E[API Gateway - Secure Access] --> F(Authentication Service);
        E --> G(Metadata Service - Knowledge Structuring);
        E --> H(Filecoin Storage Service - Permanent Archive);
        E --> I(Verifiable Credential Service - Educational Integrity);
        E --> J(LLM Orchestration Service via MCP - Intelligent Curaton);
    end

    subgraph Decentralized Storage & Network
        K[IPFS Network - Immutable Content] -- CID --> L(Filecoin Storage Providers - Verifiable Persistence);
        L -- Storage Deals --> M(Filecoin Blockchain - Audit Trail);
    end

    subgraph AI & Data Intelligence
        N[LLM Models - Contextual Understanding] -- via MCP --> J;
        O[Vector Database - Semantic Indexing] -- Embeddings --> J;
        P[MCP Servers - Specialized Tools] -- Tools/Context --> N;
    end

    subgraph External Services
        Q["CredentiaLit SDK" <br> (External Repository)] -- Auth/VCs --> I;
        R[Blockchain Network - Credential Audit] -- Transactions --> M;
    end

    A -- Access --> E;
    C -- Upload File/Data --> K;
    C -- Submit Metadata --> G;
    C -- Request Storage Deal --> H;
    C -- Issue Credential (via SDK) --> I;
    D -- Request Credential Verification/Metadata --> I & G;
    G -- Store CID/Metadata --> K & O;
    H -- Interact --> L;
    I -- Issue/Verify VCs --> Q;
    J -- Process Data/Metadata --> G;
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

## Key Workflow Summaries: Addressing Institutional Pain Points

### 1. Verifiable Credentialing & Authorization Flow (Combating Fraud & Streamlining Verification)
*   **User Interaction:** Institutional administrators (e.g., University Registrar, LMS Course Admin) use the `Admin Dashboard` to manage learner identities and issue credentials.
*   **Credential Issuance:** The `Verifiable Credential Service` (backend) interacts with the **CredentiaLit SDK** (built on Lit Protocol) to issue VCs for achievements (e.g., course completion), roles, or permissions. This is a fraud-proof process.
*   **Access Control:** The SDK enforces conditional access, ensuring only authorized individuals (e.g., students with a specific VC) can access designated educational content or research data.
*   **Verification:** Public/Institutional users (e.g., employers, other academic institutions) use the `Verification Page` to instantly verify credentials, drastically **reducing administrative burden and combating credential fraud**.

### 2. Permanent Data Archiving & Knowledge Management Flow (Mitigating Loss & Enhancing Discoverability)
*   **User Action:** An authenticated institutional user (e.g., Archivist, Researcher) uploads critical **educational content or research data** via the `Admin Dashboard`.
*   **IPFS Upload:** The frontend (using Helia) uploads the file directly to the `IPFS Network`, receiving an immutable `CID`.
*   **Metadata Submission & Enrichment:** The user provides initial metadata. The `Metadata Service` (backend) uses the `LLM Orchestration Service (MCP)` to engage `LLM Models` for intelligent metadata enrichment (e.g., summarization of research, tagging of historical documents), transforming raw data into **actionable institutional knowledge**.
*   **Filecoin Storage:** The `Filecoin Storage Service` initiates a verifiable storage deal, ensuring **long-term, censorship-resistant preservation of invaluable institutional assets**.
*   **Semantic Indexing:** Enriched metadata and embeddings are stored in a `Vector Database`, enabling **advanced semantic search capabilities across institutional archives**.

## Technology Stack Summary: Purpose-Built for the Knowledge Economy

*   **Frontend:** React (Vite), Tailwind CSS (planned), UI Component Library (planned). Designed for **intuitive institutional user experience**.
*   **Backend:** Node.js (TypeScript), Express.js. Provides a **scalable and secure operational backbone for institutions**.
*   **Databases:** PostgreSQL (metadata), Vector Database (e.g., Pinecone, Weaviate for embeddings). Crucial for **intelligent knowledge management**.
*   **Decentralized Storage:** IPFS (Helia), Filecoin. The foundation for **permanent, verifiable institutional archives**.
*   **Blockchain:** Filecoin Blockchain (for storage deals), potentially other Blockchain Networks for **credential audit trails**.
*   **AI/LLM:** LLM Models (e.g., OpenAI, Hugging Face, custom), Model Context Protocol (MCP) for orchestration. Powers **intelligent data enrichment and discovery**.
*   **Identity/Auth:** The **CredentiaLit SDK** (external component built with Lit Protocol). The core for **fraud-proof verifiable credentials and granular authorization**.
*   **Deployment:** Docker, Nginx. Ensures **reliable and scalable deployment for institutional-grade applications**.
