# MemoryChain: Decentralized Memory Platform

## Project Overview

**MemoryChain** is a decentralized knowledge and memory platform designed to be the permanent, immutable, and accessible archive of human experiences, knowledge, and culture. It aims to address the fragility of digital data and the need for censorship-resistant, long-term storage solutions for valuable information. By leveraging decentralized technologies like IPFS and Filecoin, and integrating with AI/LLMs, MemoryChain seeks to create a "living archive" that not only stores data but also understands and makes it intelligently accessible.

This project is deeply aligned with the vision of Filecoin and IPFS, aiming to build a robust and decentralized storage layer for humanity's most important information.

## Vision and Scope

### Vision

To build the world's most trusted and enduring digital archive, a living testament to human history and achievement, where truth is immutable and accessible to all. We envision a future where every important document, from a birth certificate to a peace treaty, is preserved with absolute integrity and can be verified by anyone, anywhere, instantly.

MemoryChain will be the cornerstone of this future, a decentralized platform that empowers individuals, organizations, and governments to safeguard their most valuable data against censorship, loss, and time itself.

### Scope

The scope of the MemoryChain project is to design, develop, and deploy a decentralized application (dApp) that facilitates the ingestion, storage, and verification of digital assets. The platform will be built on a foundation of IPFS, Filecoin, and a compatible blockchain, and will be designed to be user-friendly, scalable, and secure.

**Key Features:**

*   **Data Ingestion:** A simple and intuitive interface for uploading digital assets, including documents, images, audio, and video.
*   **Metadata Generation:** Automatic and manual metadata generation to enrich the data and make it more discoverable.
*   **Decentralized Storage:** Secure and permanent storage of data on IPFS and Filecoin.
*   **Verifiable Credentials:** Integration with POK Technology to issue OpenBadge 3.0 compliant verifiable credentials for all assets.
*   **NFT-based Access Control:** The use of Non-Fungible Tokens (NFTs) to manage access rights and permissions for the data.
*   **Semantic Search:** An advanced search engine that uses AI and LLMs to enable natural language queries and semantic retrieval of information.
*   **Whitelabeling:** The ability for organizations to customize the platform with their own branding and workflows.

## Technology Stack

### Frontend

*   **Framework:** React (using Vite for scaffolding and development).
*   **Styling:** Tailwind CSS (planned).
*   **UI Components:** Shadcn/UI or Material-UI (planned).

### Backend

*   **Language:** Node.js with TypeScript (planned).
*   **Framework:** Express.js or similar (planned).
*   **Database:** PostgreSQL for metadata, Ceramic/ComposeDB for graph data (planned).

### Decentralized Infrastructure

*   **Storage:** IPFS (Helia for client-side interaction) and Filecoin.
*   **Blockchain:** Ethereum, Polygon, or FVM-compatible chain (decision pending).
*   **Verifiable Credentials:** POK Technology's platform (planned).

### AI & LLMs

*   **Semantic Search:** Meilisearch or vector database (planned).
*   **LLM Integration:** OpenAI, Hugging Face, or self-hosted models (planned).
*   **Agent Framework:** Flowise or similar (planned).

## Local Development Setup

To get the MemoryChain application running on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd MemoryChain
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
3.  **Start the development server:**
    ```bash
    pnpm dev
    ```
    The application will typically be available at `http://localhost:5173` (or another port if 5173 is in use).

## Docker Deployment

To build and run the MemoryChain application using Docker:

1.  **Build the Docker image:**
    ```bash
    pnpm docker:build
    ```
2.  **Run the Docker container:**
    ```bash
    pnpm docker:run
    ```
    The application will be available at `http://localhost:80`.

## MVP Features (Current State)

The current Minimum Viable Product (MVP) demonstrates the core functionality of MemoryChain:

*   **Admin Dashboard:**
    *   Allows authenticated users to upload files.
    *   Integrates with a local Helia IPFS node for decentralized storage.
    *   Enables manual input of metadata (Title, Author, Date, Description).
    *   Displays a list of uploaded assets with their IPFS CIDs and links to public IPFS gateways.
*   **Public Verification Page:**
    *   Allows users to enter an IPFS CID to retrieve and display the associated metadata.
*   **Basic Authentication:**
    *   A simulated login/logout mechanism.
    *   The `/admin` route is protected, redirecting unauthenticated users to the `/login` page.

## Authentication Strategy: Research & Development

The current authentication system is a placeholder. The long-term strategy for robust and decentralized authentication is under active research and development. We are evaluating two primary approaches:

*   **POK Credentials:** Leveraging POK Technology's verifiable credential platform for user authentication and authorization. This aligns with the project's goal of verifiable credentials for assets and could provide a unified identity layer.
*   **LIT-Implemented System:** Exploring solutions based on Lit Protocol for decentralized access control and encryption. This could offer fine-grained control over data access and ownership, potentially integrating with NFTs for authorization.

A detailed decision on the authentication mechanism will be made during the "Core Development" phase, as outlined in the project roadmap.

## Contribution Guidelines

We welcome contributions to the MemoryChain project. Please refer to the `02_Agents/` directory for our agent culture and role-specific manuals.

## License

[To be determined, likely MIT/Apache dual-license as per Akashic's initial plan]
