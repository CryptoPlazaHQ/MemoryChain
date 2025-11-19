# MVP Technical Considerations: MemoryChain

---

This document outlines specific technical considerations and decisions for the implementation of the MemoryChain Minimum Viable Product (MVP). It bridges the high-level technical strategy with actionable implementation details, highlighting crucial aspects, potential challenges, and specific technology choices relevant to the MVP scope.

## 1. Frontend Specifics (React/Vite)

*   **Component Library:** For rapid development and consistent UI, we will initially use a lightweight component library such as **Chakra UI** or **Mantine**, alongside **Tailwind CSS**. A final decision on the specific library will be made during the initial frontend setup phase.
*   **Routing:** React Router DOM will be used for client-side routing, managing protected and public routes (`/login`, `/admin/*`, `/verify`).
*   **Form Management:** React Hook Form or Formik will be evaluated for efficient form state management, validation, and submission, especially for the Data Ingestion and Metadata Generation forms.
*   **IPFS File Upload:**
    *   The **Helia** library will be the primary choice for direct IPFS interaction from the browser. This allows for client-side content addressing and upload, reducing backend load and enhancing decentralization.
    *   Consideration for large file uploads: Implement chunking and resumable uploads if initial testing reveals performance bottlenecks for very large documents.
*   **Environment Variables:** Use Vite's `import.meta.env` for managing environment variables (e.g., API endpoints, IPFS pinning service keys) securely during development and build.

## 2. Backend Specifics (Node.js/Express.js)

*   **Database Schema:**
    *   **`assets` table:** `id (PK)`, `cid (UNIQUE)`, `title`, `author`, `date_created`, `description`, `tags (JSONB)`, `institution_id (FK)`, `status (e.g., 'pending', 'archived')`, `created_at`, `updated_at`.
    *   **`institutions` table:** `id (PK)`, `name`, `logo_url`, `api_key (for SDK interaction)`, `created_at`, `updated_at`.
    *   **`users` table:** `id (PK)`, `email (UNIQUE)`, `password_hash`, `role (e.g., 'admin')`, `institution_id (FK)`, `created_at`, `updated_at`.
*   **API Design:** RESTful API endpoints following best practices.
    *   `/api/v1/auth/login` (POST)
    *   `/api/v1/assets` (GET, POST)
    *   `/api/v1/assets/:cid` (GET, PUT)
    *   `/api/v1/admin/institutions/:id/branding` (PUT)
    *   `/api/v1/admin/users` (GET, POST)
    *   `/api/v1/credentials` (POST, GET)
*   **Authentication Middleware:** Implement JWT-based authentication for protecting backend API routes, verifying tokens issued upon successful login.
*   **Filecoin Integration:**
    *   Utilize a **Filecoin pinning service API** (e.g., Estuary, Filebase, Web3.Storage) for initiating and monitoring storage deals. This abstracts away the complexity of direct Filecoin client interaction for the MVP.
    *   The backend will manage the communication with the pinning service, track deal status, and update the `assets` table accordingly.

## 3. "Credentialing Function SDK" Integration

*   **External Dependency:** The Credentialing Function SDK will be consumed as an external library (npm package) by the MemoryChain backend.
*   **API Key Management:** The MemoryChain backend will securely store and use API keys or similar credentials provided by the Credentialing Function SDK to authenticate its calls.
*   **Issuance Flow:** When an asset is marked as "archived" and approved, the MemoryChain backend will call the SDK's `issueCredential` function, passing in relevant asset metadata (CID, institution details, etc.).
*   **Verification Flow:** The Public Verification Page on the MemoryChain frontend will call a backend endpoint, which in turn will utilize the SDK's `verifyCredential` function to validate the authenticity and integrity of the credential using Lit Protocol.

## 4. Environment & Deployment

*   **Development Environment:** Local development will utilize **Docker Compose** to spin up the React frontend, Node.js backend, and PostgreSQL database for easy setup and reproducibility.
*   **CI/CD:** Basic CI/CD pipelines (e.g., GitHub Actions) will be established for automated testing and deployment to a staging environment.
*   **Containerization:** The frontend and backend applications will be containerized using Docker, enabling consistent deployment across different environments.

## 5. Security Considerations for MVP

*   **Input Validation:** Strict input validation on all API endpoints to prevent common vulnerabilities (e.g., XSS, SQL Injection).
*   **Password Hashing:** Use strong, salted hashing algorithms (e.g., bcrypt) for storing user passwords.
*   **Secure Communications:** Enforce HTTPS for all communication between frontend and backend.
*   **Principle of Least Privilege:** Backend services will only have the necessary permissions to perform their designated tasks.

## 6. Known Risks & Assumptions

*   **Lit Protocol SDK Maturity:** Assuming the Credentialing Function SDK (built on Lit Protocol) will provide a stable and well-documented API for seamless integration within the MVP timeline.
*   **IPFS/Filecoin Pinning Service Reliability:** Relying on the chosen pinning service for consistent IPFS content availability and Filecoin deal success rates.
*   **LLM API Access:** Assuming continued access to reliable LLM APIs for metadata suggestions.

---
