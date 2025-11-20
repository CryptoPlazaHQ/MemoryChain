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

## 3. CredentiaLit SDK/App Integration: Powering Verifiable Credentials & Authorization

*   **External Dependency:** The **CredentiaLit SDK** will be consumed as an external library (npm package) by the MemoryChain backend. The **CredentiaLit App** (management dashboard) will provide the UI for administration.
*   **API Key Management:** The MemoryChain backend will securely store and use API keys or similar credentials provided by the CredentiaLit SDK/App to authenticate its calls, ensuring **secure interaction for institutional data management.**
*   **Issuance Flow:** When an asset is marked as "archived" and approved, or an educational achievement is recorded, the MemoryChain backend will call the SDK's `issueCredential` function (or trigger the CredentiaLit App via API), passing in relevant asset/learner metadata (CID, institution details, course info, etc.). This ensures **fraud-proof credential issuance.**
*   **Verification Flow:** The Public Verification Page on the MemoryChain frontend will call a backend endpoint, which in turn will utilize the SDK's `verifyCredential` function (or the CredentiaLit App's verification service) to validate the authenticity and integrity of the credential using Lit Protocol. This **streamlines verification for institutional stakeholders and combats credential fraud.**

## 4. Environment & Deployment

*   **Development Environment:** Local development will utilize **Docker Compose** to spin up the React frontend, Node.js backend, and PostgreSQL database for easy setup and reproducibility. This facilitates **rapid institutional integration and testing.**
*   **CI/CD:** Basic CI/CD pipelines (e.g., GitHub Actions) will be established for automated testing and deployment to a staging environment, ensuring **continuous quality and reliability for institutional partners.**
*   **Containerization:** The frontend and backend applications will be containerized using Docker, enabling consistent deployment across different environments, **critical for scalable institutional rollouts.**

## 5. Security Considerations for MVP: Safeguarding Institutional Trust

*   **Input Validation:** Strict input validation on all API endpoints to prevent common vulnerabilities (e.g., XSS, SQL Injection), **protecting sensitive institutional data.**
*   **Password Hashing:** Use strong, salted hashing algorithms (e.g., bcrypt) for storing user passwords, **securing administrator accounts.**
*   **Secure Communications:** Enforce HTTPS for all communication between frontend and backend, **ensuring data privacy.**
*   **Principle of Least Privilege:** Backend services will only have the necessary permissions to perform their designated tasks, **minimizing attack surface for institutional systems.**

## 6. Known Risks & Assumptions: Mitigating Challenges for Institutional Adoption

*   **Lit Protocol & CredentiaLit SDK Maturity:** Assuming the CredentiaLit SDK (built on Lit Protocol) will provide a stable and well-documented API for seamless integration within the MVP timeline, **crucial for institutional reliability.**
*   **IPFS/Filecoin Pinning Service Reliability:** Relying on the chosen pinning service for consistent IPFS content availability and Filecoin deal success rates, **essential for guaranteed institutional data permanence.**
*   **LLM API Access:** Assuming continued access to reliable LLM APIs for metadata suggestions, **key for intelligent knowledge management.**
*   **Institutional Integration Complexity:** Acknowledging the inherent complexity of integrating with diverse institutional systems (e.g., legacy LMS, HR platforms) and planning for flexible integration points (including N8N no-code/low-code solutions).
