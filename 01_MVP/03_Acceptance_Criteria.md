# MVP Acceptance Criteria: MemoryChain

---

This document outlines the acceptance criteria for each key feature of the MemoryChain Minimum Viable Product (MVP). These criteria will be used to verify the successful implementation and functionality of the platform components, ensuring that they meet the defined requirements and deliver the expected value to users.

Each criterion is structured to be testable and observable, providing a clear definition of "done" for the development team.

## 1. User Authentication (Administrator)

*   **AC 1.1 - Secure Login:**
    *   **Given** an administrator navigates to the login page
    *   **When** they enter valid email and password
    *   **Then** they are successfully redirected to the Admin Dashboard
    *   **And** a secure session token is created and stored.
*   **AC 1.2 - Invalid Credentials Handling:**
    *   **Given** an administrator navigates to the login page
    *   **When** they enter invalid email or password
    *   **Then** an appropriate error message ("Invalid credentials") is displayed
    *   **And** they remain on the login page.
*   **AC 1.3 - Session Expiration:**
    *   **Given** an administrator is logged in
    *   **When** their session token expires
    *   **Then** they are automatically logged out
    *   **And** redirected to the login page upon attempting to access a protected route.
*   **AC 1.4 - Role-based Access:**
    *   **Given** a user is an authenticated administrator
    *   **When** they attempt to access `/admin` or `/ingest` routes
    *   **Then** access is granted.
    *   **Given** a user is *not* an authenticated administrator
    *   **When** they attempt to access `/admin` or `/ingest` routes
    *   **Then** access is denied
    *   **And** they are redirected to the login page.

## 2. "Credentialing Function SDK" Dashboard & Authorization

*   **AC 2.1 - Dashboard Access:**
    *   **Given** an administrator is logged in
    *   **When** they navigate to `/admin/credentials`
    *   **Then** the Credentialing Dashboard is displayed
    *   **And** it shows key statistics (e.g., "Total Credentials Issued").
*   **AC 2.2 - Administrator Management:**
    *   **Given** an administrator is on the Credentialing Dashboard
    *   **When** they select "Manage Administrators"
    *   **Then** a list of current administrators is displayed.
    *   **And** they can successfully add a new administrator (email/password based).
    *   **And** they can successfully remove an existing administrator.
*   **AC 2.3 - Credential Definition:**
    *   **Given** an administrator is on the Credentialing Dashboard
    *   **When** they navigate to "Define Credential Types"
    *   **Then** they can create a new credential type with a name and description.
*   **AC 2.4 - Credential Issuance Interface:**
    *   **Given** an administrator has defined a credential type
    *   **When** they navigate to "Issue Credential"
    *   **Then** they can select a credential type, enter an asset CID, and assign it to an administrator's identity.
    *   **And** the SDK successfully issues the credential.
*   **AC 2.5 - Credential Revocation:**
    *   **Given** an administrator has issued a credential
    *   **When** they select that credential from the list
    *   **Then** they can mark the credential as "revoked."
    *   **And** the public verification page reflects its revoked status.
*   **AC 2.6 - Developer Configuration:**
    *   **Given** a developer accesses the `/admin/credentials/config` route
    *   **Then** they can view the Credentialing Function SDK's API endpoint and sample configuration.

## 3. Data Ingestion (Digital Asset Upload)

*   **AC 3.1 - File Upload Functionality:**
    *   **Given** an administrator is on the "Ingest New Asset" page
    *   **When** they drag-and-drop a supported file (e.g., PDF, JPG)
    *   **Then** the file uploads successfully
    *   **And** a progress indicator is displayed during upload.
*   **AC 3.2 - CID Generation:**
    *   **Given** a file has been successfully uploaded
    *   **When** the upload process completes
    *   **Then** a unique IPFS CID is displayed to the administrator.
    *   **And** the CID is clickable, opening the asset in a public IPFS gateway.

## 4. Metadata Generation

*   **AC 4.1 - Manual Metadata Entry:**
    *   **Given** an administrator has uploaded an asset
    *   **When** they fill out the metadata form (Title, Author, Date, Description, Tags)
    *   **Then** the entered metadata is associated with the asset's CID in the system.
*   **AC 4.2 - Metadata Persistence:**
    *   **Given** metadata has been saved for an asset
    *   **When** the administrator navigates away and returns to view the asset
    *   **Then** the previously entered metadata is displayed correctly.

## 5. Decentralized Storage (IPFS & Filecoin)

*   **AC 5.1 - IPFS Pinning Confirmation:**
    *   **Given** an asset is uploaded and its CID generated
    *   **When** the system attempts to pin the asset
    *   **Then** the Admin Dashboard displays "Asset pinned to IPFS" status.
*   **AC 5.2 - Filecoin Deal Initiation & Status:**
    *   **Given** an asset is pinned to IPFS
    *   **When** the administrator requests long-term storage
    *   **Then** a Filecoin storage deal is initiated for the asset's CID.
    *   **And** the Admin Dashboard displays the status of the Filecoin deal (e.g., "Deal Pending", "Deal Active").

## 6. Public Verification Page

*   **AC 6.1 - Access & Input:**
    *   **Given** a public user navigates to the public verification page
    *   **When** they enter a valid asset CID or MemoryChain ID
    *   **Then** the verification results are displayed.
*   **AC 6.2 - Valid Asset Verification:**
    *   **Given** a valid and verified asset CID/ID is entered
    *   **When** the user clicks "Verify"
    *   **Then** "VERIFIED" status is prominently displayed with a green indicator.
    *   **And** the asset's Title, Author, Date, and Description are shown.
    *   **And** a clickable link to view the asset on an IPFS gateway is provided.
    *   **And** the issuing institution and "Verified by Lit Protocol" is displayed.
*   **AC 6.3 - Invalid/Unverified Asset Handling:**
    *   **Given** an invalid or unverified asset CID/ID is entered (e.g., not found, invalid format, credential revoked)
    *   **When** the user clicks "Verify"
    *   **Then** "UNVERIFIED" status is displayed with a red indicator.
    *   **And** an informative message explains the reason for the unverified status.

## 7. Basic Whitelabeling

*   **AC 7.1 - Institution Name Customization:**
    *   **Given** an administrator is on the branding settings page
    *   **When** they enter an "Institution Name" and save changes
    *   **Then** the application's header and the Public Verification Page reflect the new institution name.
*   **AC 7.2 - Institution Logo Customization:**
    *   **Given** an administrator is on the branding settings page
    *   **When** they upload an "Institution Logo" (e.g., PNG, JPG) and save changes
    *   **Then** the application's header and the Public Verification Page display the uploaded logo.
    *   **And** the logo is correctly resized and positioned.
