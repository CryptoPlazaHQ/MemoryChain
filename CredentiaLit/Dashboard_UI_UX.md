# Product Requirements Document (PRD): CredentiaLit App Management Dashboard

This document outlines the functional, UI/UX, and technical requirements for the **CredentiaLit App Management Dashboard**. This dashboard is a critical component of the CredentiaLit offering, serving as an intuitive graphical interface for institutional administrators to manage verifiable credentials, user authorizations, and integration workflows with platforms like MemoryChain, Learning Management Systems (LMS) such as Moodle, and workflow automation tools like N8N. It is designed to deliver an easy user experience, directly addressing the administrative burden and complexity of decentralized identity management.

## 1. Vision: Simplifying Verifiable Trust for Institutions

To provide an elegant, user-friendly interface that abstracts the complexity of Lit Protocol and CredentiaLit SDK functionalities, enabling any institution (educational, corporate, community) to seamlessly manage, issue, and verify credentials and access policies. The dashboard will be the bridge between cryptographic security and practical, everyday institutional operations.

## 2. Target Users

*   **Institutional Administrators (e.g., University Registrar, HR Manager, Community Lead):** Primary users responsible for defining credential types, issuing credentials, managing user roles, and monitoring verification activities.
*   **Developers (integrating CredentiaLit):** Users who need to configure SDK integrations, generate API keys, and monitor SDK usage.
*   **Workflow Automators (e.g., N8N users):** Users who configure automated workflows and need to manage credential-based authorizations.

## 3. Key Pages, Flows & Features (Addressing Institutional Pain Points)

### 3.1. Login/Authentication Page
*   **Functional Requirement:** Secure login for institutional administrators.
*   **UI/UX:**
    *   **"Connect with your PKP" / Wallet Login:** Prominent option to connect via a Lit Protocol-compatible wallet (e.g., MetaMask).
    *   **Email/Password (Managed Identity):** Option for traditional login (backed by CredentiaLit's secure identity management, linked to PKPs).
    *   Clear error messaging for failed login attempts, **reducing frustration and support tickets.**

### 3.2. Dashboard Overview (Institutional Health Monitor)
*   **Functional Requirement:** Provide a high-level summary of credentialing and authorization activity.
*   **UI/UX:**
    *   **Key Statistics:** Prominent cards displaying "Total Credentials Issued," "Active Users (PKPs)," "Successful Verifications Last 24h," "Pending Authorizations."
    *   **Recent Activity Feed:** Chronological list of recent issuance, verification, and authorization events, with links to details.
    *   **Quick Access Navigation:** Clear links to "Issue Credential," "Manage Users," "Integrations."
    *   **Value Proposition Highlight:** Clearly visible metrics that demonstrate **reduced fraud or administrative savings.**

### 3.3. Credential Management (Issuance, Review, Revocation) - Combating Fraud

*   **Functional Requirement:** Enable institutional administrators to define, issue, and manage the lifecycle of verifiable credentials.
*   **UI/UX:**
    *   **"Define Credential Type" Module:**
        *   Wizard-based interface to create new credential schemas (e.g., "Course Completion," "Project Contributor," "Verified Member").
        *   Fields for `credentialType`, `claims` structure (e.g., add `course_id`, `grade`, `date_completed`), and metadata.
    *   **"Issue New Credential" Module:**
        *   Intuitive form to select a credential type, specify recipient (by PKP or linked email), and input claims data.
        *   Option to link credential to an asset CID (e.g., a student's thesis archived on MemoryChain).
        *   Confirmation of successful issuance with a downloadable VC.
    *   **"Manage Issued Credentials" List:**
        *   Searchable and filterable table of all issued credentials.
        *   Details for each VC: type, issuer, subject, claims, status (active/revoked), issuance date.
        *   **"Revoke Credential" Action:** Prominent button/action to initiate VC revocation (with confirmation).
    *   **Bulk Actions:** Ability to issue or revoke multiple credentials simultaneously (e.g., for a class of students), **significantly reducing administrative burden.**

### 3.4. User & Role Management (Decentralized Authorization for Institutions)

*   **Functional Requirement:** Allow administrators to manage user PKPs, assign roles, and define authorization policies.
*   **UI/UX:**
    *   **"Manage Users" List:** Searchable table of registered user PKPs, linked identities (email/wallet), and assigned roles.
    *   **"Assign Role" Module:** Interface to assign predefined roles to users (e.g., "Moodle Admin," "MemoryChain Data Curators"), supporting **fine-grained institutional access control.**
    *   **"Define Authorization Policy" Module:**
        *   Graphical interface to define Lit Protocol access conditions for specific resources (e.g., "User must have 'Course Completion: CS101' VC AND own 100 $TRUTH tokens to access this premium content").
        *   Support for `AND`/`OR` logic to create complex policies.

### 3.5. Integrations & Developer Configuration (Connecting to Moodle, MemoryChain, N8N)

*   **Functional Requirement:** Provide tools and documentation for integrating CredentiaLit with external platforms and enabling no-code/low-code solutions.
*   **UI/UX:**
    *   **"API Key Management":** Generate and manage API keys for programmatic access to CredentiaLit SDK/App functions.
    *   **"Webhook Configuration":** Set up webhooks to notify external systems (e.g., LMS, N8N) about credential issuance or verification events.
    *   **"N8N Nodes Library":**
        *   Dedicated section linking to documentation for **CredentiaLit N8N nodes**.
        *   Tutorials on how to use N8N to automate credential issuance (e.g., on LMS completion), verification, and authorization workflows.
    *   **"Platform Connectors":** Wizards or guided setups for connecting CredentiaLit App to MemoryChain or specific LMS instances (e.g., Moodle), simplifying **institutional integration efforts.**
    *   **"Sandbox/Testing Environment":** A dedicated area for developers to test SDK integrations and authorization policies in a safe environment.

## 4. Design Principles (Ensuring User Experience for Institutions)

*   **Clarity & Intuition:** The interface must be immediately understandable and easy to navigate for diverse institutional roles (from IT to educators). Abstract cryptographic concepts will be hidden behind user-friendly abstractions.
*   **Scalability:** The design must accommodate a growing number of users, credentials, and integration points without performance degradation.
*   **Security by Design:** All UI elements and workflows will reinforce security best practices. Sensitive information will be handled with utmost care.
*   **Responsiveness & Accessibility:** The dashboard will be fully responsive across devices and adhere to WCAG accessibility guidelines, ensuring broad institutional reach.
*   **Consistency:** Adhere to established UI patterns and brand guidelines for a professional, trustworthy appearance.

## 5. Technical Requirements for the App

*   **Framework:** React (Frontend), Node.js/Express.js (Backend).
*   **Database:** PostgreSQL for operational data, potentially integrating with Lit Protocol's decentralized storage for certain configurations.
*   **Deployment:** Containerized (Docker) for ease of deployment and scalability in institutional environments.
*   **API:** Secure RESTful API for interaction with SDK and external platforms.
*   **Security:** Adherence to OWASP Top 10, regular security audits.

---
_This PRD works in conjunction with `CredentiaLit/Credential_SDK_Requirements.md` (for SDK core) and is supported by `CredentiaLit/Product_Roadmap.md`._

