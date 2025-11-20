# 00. MVP Definition: MemoryChain

## 1. MVP Goal: Delivering Verifiable Trust for Institutional Knowledge & Credentials

The goal of the Minimum Viable Product (MVP) is to deliver a functional, whitelabel-ready application that demonstrates the core value proposition of MemoryChain: **simple, secure, and verifiable data archiving alongside fraud-proof credential management.**

The MVP will focus on the secure data ingestion, intelligent metadata enrichment, and verifiable credentialing workflow for a single **educational or knowledge-driven institution**. It will provide a user-friendly experience for institutional staff (e.g., archivists, course administrators) and ensure transparent verification for the public (e.g., employers validating student credentials).

## 2. Key Features: Addressing Institutional Pain Points in Practice

The MVP will include the following key features, directly tackling the problems of credential fraud, knowledge loss, and administrative burden:

*   **User Authentication:** A simple email and password-based authentication system for administrators, with architecture ready for future integration with **CredentiaLit SDK's PKP-based identity**.
*   **CredentiaLit SDK Integration (App-Side):** A functional integration of the **CredentiaLit SDK** (now in `CredentiaLit/`) enabling:
    *   **Verifiable Credential Issuance:** Tools for institutions to issue cryptographically signed, fraud-proof credentials (e.g., course completions for an LMS, skill attestations).
    *   **Dashboard Interface:** A scalable dashboard for administrators to manage credential creation, registration, and user authorization effectively.
*   **Data Ingestion:** A user-friendly interface for uploading digital assets (documents, images, research papers) to the platform, **securing institutional knowledge.**
*   **Metadata Generation & AI Enrichment:** A form for manually adding essential metadata to each asset, complemented by initial LLM-assisted suggestions to enrich metadata, **improving knowledge discoverability.**
*   **Decentralized Storage (IPFS & Filecoin):** Automatic upload of assets to IPFS and verifiable pinning to a Filecoin storage provider, ensuring **long-term, censorship-resistant preservation of institutional data.**
*   **Public Verification Page:** A simple, publicly accessible page where anyone can verify the authenticity of an asset or a **CredentiaLit SDK-issued credential** by scanning a QR code or entering a unique ID. This combats **credential fraud.**
*   **Basic Whitelabeling:** The ability to customize the application with an institution's name and logo, facilitating **seamless institutional adoption.**

## 3. Technology Stack: Purpose-Built for Verifiable Institutional Solutions

The MVP will be built using the following technology stack:

*   **Frontend:** React (with Vite)
*   **Backend:** Node.js (with Express.js)
*   **Database:** PostgreSQL
*   **Storage:** IPFS (via a service like Infura or a local node) and Filecoin (via a storage provider).
*   **Verifiable Credentials & Authorization:** **CredentiaLit SDK** (now in `CredentiaLit/`), built on Lit Protocol.

## 4. Success Metrics: Measuring Impact for Institutions & Learners

The success of the MVP will be measured by the following metrics, reflecting our commitment to solving institutional challenges:

*   **Functionality:** The application is fully functional and meets all the requirements outlined in the user stories, including **successful CredentiaLit SDK integration for verifiable credential issuance.**
*   **User-Friendliness:** The application is easy to use for institutional administrators (e.g., for credential management) and the public (for verification).
*   **Performance:** The application is fast and responsive, handling institutional data ingestion and verification requests efficiently.
*   **Security:** The application is secure and protects the integrity of the data and credentials, specifically guarding against **credential fraud and unauthorized data access.**
*   **Partner Feedback:** Positive feedback from the initial pilot partner (**CNMH and a pilot educational institution**), validating the MVP's effectiveness in addressing their pain points.
