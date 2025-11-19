# MVP Feature Breakdown: MemoryChain

---

This document provides a detailed breakdown of the Minimum Viable Product (MVP) features, expanding on the high-level definitions in `00_MVP_Definition.md` and directly mapping them to the user stories in `01_User_Stories.md`. The goal is to provide a granular understanding of each feature, enabling precise development and testing.

## 1. User Authentication (Administrator)

*   **Reference:** `00_MVP_Definition.md` (Key Features), `01_User_Stories.md` (Administrator: "...log in to the application securely...")
*   **Description:** Implement a secure login mechanism for designated administrators to access the MemoryChain platform. This will initially be a traditional email/password system, but the architecture should be designed for future integration with Lit Protocol PKPs for identity.
*   **Sub-features:**
    *   **1.1. Login Form:**
        *   User interface with fields for email and password.
        *   "Forgot Password" functionality (placeholder, initially may just direct to support).
        *   Error handling for incorrect credentials.
    *   **1.2. Session Management:**
        *   Secure session token generation and validation.
        *   Token storage (e.g., HttpOnly cookies).
        *   Session expiration and renewal mechanisms.
    *   **1.3. Role-based Access Control (Basic):**
        *   Initial definition of an "Administrator" role.
        *   Protection of admin-only routes (e.g., `/admin`, `/ingest`).

## 2. "Credentialing Function SDK" Dashboard & Authorization

*   **Reference:** `00_MVP_Definition.md` (Key Features), `01_User_Stories.md` (Administrator: "...access a dashboard to manage credentials and authorize users."), (Developer: "...easily integrate the SDK...")
*   **Description:** Develop a dashboard interface that allows administrators to manage users (initially, assigning roles) and credentials (issuing, revoking). This dashboard will serve as the primary UI for interacting with the **Credentialing Function SDK**, which will be developed as a separate component.
*   **Sub-features:**
    *   **2.1. Dashboard Access:**
        *   Protected route (`/admin/credentials`).
        *   Dashboard overview displaying key credentialing statistics (e.g., total credentials issued, active users).
    *   **2.2. User Management (Basic):**
        *   List of registered administrators.
        *   Ability to add/remove administrators (initially manual, later integrated with Lit Protocol PKP registration).
    *   **2.3. Credential Definition & Issuance Interface:**
        *   Form to define new credential types (e.g., "Asset Archival Credential").
        *   Interface to issue credentials, linking them to an asset CID and an administrator's identity.
    *   **2.4. Credential Revocation:**
        *   Mechanism to mark an issued credential as revoked.
    *   **2.5. Developer Configuration View:**
        *   Display API keys/endpoints for the Credentialing Function SDK (for integration purposes).
        *   Documentation links for SDK usage.

## 3. Data Ingestion (Digital Asset Upload)

*   **Reference:** `00_MVP_Definition.md` (Key Features), `01_User_Stories.md` (Administrator: "...upload a digital asset...")
*   **Description:** Provide a user-friendly interface for administrators to upload digital assets (initially documents and images) to the platform.
*   **Sub-features:**
    *   **3.1. File Upload Component:**
        *   Drag-and-drop area.
        *   File browser integration.
        *   Progress indicator during upload.
        *   Support for common document (PDF, DOCX) and image (JPG, PNG) formats.
    *   **3.2. IPFS Integration:**
        *   Upon successful upload, the file is pushed to IPFS.
        *   Return and display the generated Content Identifier (CID).

## 4. Metadata Generation

*   **Reference:** `00_MVP_Definition.md` (Key Features), `01_User_Stories.md` (Administrator: "...add metadata to the asset...")
*   **Description:** Allow administrators to manually add essential metadata to each uploaded asset.
*   **Sub-features:**
    *   **4.1. Metadata Form:**
        *   Fields for: Title, Author/Origin, Date Created (datepicker), Description (multiline text), Tags (comma-separated input).
        *   Association of metadata with the asset's CID.
    *   **4.2. Basic LLM-Assisted Suggestions:**
        *   (Stretch Goal for MVP): When description is entered, suggest relevant tags or a short summary.

## 5. Decentralized Storage (IPFS & Filecoin)

*   **Reference:** `00_MVP_Definition.md` (Key Features), `01_User_Stories.md` (Administrator: "...see a confirmation that the asset has been successfully uploaded to IPFS and Filecoin...")
*   **Description:** Ensure that uploaded assets are not only on IPFS but also securely pinned and stored long-term on the Filecoin network.
*   **Sub-features:**
    *   **5.1. IPFS Pinning:**
        *   Automatic pinning of the asset to a trusted IPFS pinning service.
    *   **5.2. Filecoin Storage Deal Orchestration:**
        *   Behind-the-scenes initiation of a Filecoin storage deal for the asset's CID.
        *   Display status of Filecoin deal (e.g., "Pending," "Active," "Completed") in the Admin Dashboard.

## 6. Public Verification Page

*   **Reference:** `00_MVP_Definition.md` (Key Features), `01_User_Stories.md` (Public User: "...access a public verification page...scan a QR code or enter a unique ID...")
*   **Description:** Create a publicly accessible web page where anyone can verify the authenticity of an asset by providing its unique identifier (CID or MemoryChain ID).
*   **Sub-features:**
    *   **6.1. Verification Input:**
        *   Single input field for CID or MemoryChain ID.
        *   "Verify" button.
    *   **6.2. Verification Results Display:**
        *   If valid:
            *   "VERIFIED" status with a green indicator.
            *   Display asset Title, Author, Date, Description.
            *   Link to view the asset directly on an IPFS gateway.
            *   Display information about the issuing institution and the verification method (via Lit Protocol).
        *   If invalid:
            *   "UNVERIFIED" status with a red indicator.
            *   Clear message explaining why (e.g., "CID not found," "Credential revoked").

## 7. Basic Whitelabeling

*   **Reference:** `00_MVP_Definition.md` (Key Features), `01_User_Stories.md` (Administrator: "...customize the application with my organization's name and logo...")
*   **Description:** Allow an administrator to configure the application's branding for their institution.
*   **Sub-features:**
    *   **7.1. Settings Page for Branding:**
        *   Input field for "Institution Name."
        *   Upload field for "Institution Logo."
        *   These settings will dynamically update the application's header/footer and the Public Verification Page.

---
