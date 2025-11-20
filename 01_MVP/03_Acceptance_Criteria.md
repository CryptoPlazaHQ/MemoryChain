# MVP Acceptance Criteria: MemoryChain

---

This document outlines the acceptance criteria for each key feature of the MemoryChain Minimum Viable Product (MVP). These criteria will be used to verify the successful implementation and functionality of the platform components, ensuring that they meet the defined requirements and deliver the expected value to users.

Each criterion is structured to be testable and observable, providing a clear definition of "done" for the development team.

## 1. User Authentication (Administrator) - Ensuring Secure Institutional Access

*   **AC 1.1 - Secure Login for Institutional Admins:**
    *   **Given** an institutional administrator navigates to the login page
    *   **When** they enter valid email and password
    *   **Then** they are successfully redirected to the Admin Dashboard
    *   **And** a secure session token is created and stored, **protecting institutional operations.**
*   **AC 1.2 - Robust Invalid Credentials Handling:**
    *   **Given** an institutional administrator navigates to the login page
    *   **When** they enter invalid email or password
    *   **Then** an appropriate error message ("Invalid credentials") is displayed
    *   **And** they remain on the login page, **preventing unauthorized access.**
*   **AC 1.3 - Session Expiration for Security:**
    *   **Given** an institutional administrator is logged in
    *   **When** their session token expires
    *   **Then** they are automatically logged out
    *   **And** redirected to the login page upon attempting to access a protected route, **enhancing security for sensitive institutional data.**
*   **AC 1.4 - Role-based Access Control for Institutional Roles:**
    *   **Given** a user is an authenticated institutional administrator
    *   **When** they attempt to access `/admin` or `/ingest` routes
    *   **Then** access is granted, **ensuring authorized management.**
    *   **Given** a user is *not* an authenticated institutional administrator
    *   **When** they attempt to access `/admin` or `/ingest` routes
    *   **Then** access is denied
    *   **And** they are redirected to the login page, **preventing unauthorized access to institutional functions.**

## 2. CredentiaLit SDK Integration & Dashboard - Combating Credential Fraud & Streamlining Verification

*   **AC 2.1 - Credentialing Dashboard Access:**
    *   **Given** an institutional administrator is logged in
    *   **When** they navigate to `/admin/credentials`
    *   **Then** the Credentialing Dashboard is displayed
    *   **And** it shows key statistics (e.g., "Total Credentials Issued"), **providing institutional oversight.**
*   **AC 2.2 - Institutional Administrator Management:**
    *   **Given** an institutional administrator is on the Credentialing Dashboard
    *   **When** they select "Manage Administrators"
    *   **Then** a list of current administrators is displayed.
    *   **And** they can successfully add/remove institutional administrators (email/password based), **maintaining secure operational control.**
*   **AC 2.3 - Verifiable Credential Definition:**
    *   **Given** an institutional administrator is on the Credentialing Dashboard
    *   **When** they navigate to "Define Credential Types"
    *   **Then** they can create new credential types (e.g., "Course Completion VC," "Research Grant VC") with name and description, **tailoring to institutional needs.**
*   **AC 2.4 - Fraud-Proof Credential Issuance Interface:**
    *   **Given** an institutional administrator has defined a credential type
    *   **When** they navigate to "Issue Credential"
    *   **Then** they can select a credential type, enter an asset CID, and assign it to a learner's identity (e.g., a student's PKP).
    *   **And** the **CredentiaLit SDK** successfully issues the cryptographically signed credential, **combating credential fraud.**
*   **AC 2.5 - Credential Revocation for Integrity:**
    *   **Given** an institutional administrator has issued a credential
    *   **When** they select that credential from the list
    *   **Then** they can mark the credential as "revoked."
    *   **And** the public verification page reflects its revoked status, **maintaining academic integrity.**
*   **AC 2.6 - Developer Configuration for Institutional Integration:**
    *   **Given** a developer accesses the `/admin/credentials/config` route
    *   **Then** they can view the **CredentiaLit SDK's** API endpoint and sample configuration, **facilitating LMS and institutional system integration.**

## 3. Data Ingestion (Digital Asset Upload) - Securing Institutional Knowledge

*   **AC 3.1 - File Upload Functionality for Institutional Assets:**
    *   **Given** an institutional administrator is on the "Ingest New Asset" page
    *   **When** they drag-and-drop a supported institutional file (e.g., research paper PDF, historical archive image)
    *   **Then** the file uploads successfully with a progress indicator, **ensuring efficient archival.**
*   **AC 3.2 - CID Generation for Immutable Provenance:**
    *   **Given** an institutional file has been successfully uploaded
    *   **When** the upload process completes
    *   **Then** a unique IPFS CID is displayed to the administrator.
    *   **And** the CID is clickable, opening the asset in a public IPFS gateway, **providing immutable proof of existence.**

## 4. Metadata Generation & AI Enrichment - Enhancing Institutional Discoverability

*   **AC 4.1 - Manual Metadata Entry for Institutional Content:**
    *   **Given** an institutional administrator has uploaded an asset
    *   **When** they fill out the metadata form (Title, Author, Date, Description, Tags)
    *   **Then** the entered metadata is associated with the asset's CID in the system, **improving institutional knowledge management.**
*   **AC 4.2 - Metadata Persistence for Archives:**
    *   **Given** metadata has been saved for an institutional asset
    *   **When** the administrator navigates away and returns to view the asset
    *   **Then** the previously entered metadata is displayed correctly, **ensuring consistent record-keeping.**

## 5. Decentralized Storage (IPFS & Filecoin) - Guaranteed Institutional Permanence

*   **AC 5.1 - IPFS Pinning Confirmation for Accessibility:**
    *   **Given** an institutional asset is uploaded and its CID generated
    *   **When** the system attempts to pin the asset
    *   **Then** the Admin Dashboard displays "Asset pinned to IPFS" status, **confirming accessibility.**
*   **AC 5.2 - Filecoin Deal Initiation & Status for Long-Term Preservation:**
    *   **Given** an institutional asset is pinned to IPFS
    *   **When** the administrator requests long-term storage
    *   **Then** a Filecoin storage deal is initiated for the asset's CID.
    *   **And** the Admin Dashboard displays the status of the Filecoin deal (e.g., "Deal Pending", "Deal Active"), **providing verifiable assurance of preservation.**

## 6. Public Verification Page - Validating Academic & Institutional Claims

*   **AC 6.1 - Access & Input for Verification:**
    *   **Given** a public user (e.g., an employer, another academic institution) navigates to the public verification page
    *   **When** they enter a valid asset CID or Credential ID
    *   **Then** the verification results are displayed.
*   **AC 6.2 - Valid Asset/Credential Verification:**
    *   **Given** a valid and verified asset CID/ID is entered
    *   **When** the user clicks "Verify"
    *   **Then** "VERIFIED" status is prominently displayed with a green indicator.
    *   **And** the asset's Title, Author, Date, and Description are shown (for assets), or the credential details (for VCs).
    *   **And** a clickable link to view the asset on an IPFS gateway is provided.
    *   **And** the issuing institution and "Verified by Lit Protocol" (via **CredentiaLit SDK**) is displayed, **instilling trust in academic records and institutional claims.**
*   **AC 6.3 - Invalid/Unverified Asset/Credential Handling:**
    *   **Given** an invalid or unverified asset CID/ID is entered (e.g., not found, invalid format, credential revoked)
    *   **When** the user clicks "Verify"
    *   **Then** "UNVERIFIED" status is displayed with a red indicator.
    *   **And** an informative message explains the reason for the unverified status, **protecting against fraudulent claims.**

## 7. Basic Whitelabeling - Seamless Institutional Integration

*   **AC 7.1 - Institution Name Customization:**
    *   **Given** an institutional administrator is on the branding settings page
    *   **When** they enter an "Institution Name" and save changes
    *   **Then** the application's header and the Public Verification Page reflect the new institution name, **facilitating brand consistency.**
*   **AC 7.2 - Institution Logo Customization:**
    *   **Given** an institutional administrator is on the branding settings page
    *   **When** they upload an "Institution Logo" (e.g., PNG, JPG) and save changes
    *   **Then** the application's header and the Public Verification Page display the uploaded logo.
    *   **And** the logo is correctly resized and positioned, **enhancing institutional identity within the platform.**
