# 00. MVP Definition: MemoryChain

## 1. MVP Goal

The goal of the Minimum Viable Product (MVP) is to deliver a functional, whitelabel-ready application that demonstrates the core value proposition of MemoryChain: **simple, secure, and verifiable data archiving.**

The MVP will focus on the data ingestion and verification workflow for a single organization, providing a user-friendly experience for both the organization's staff and the public.

## 2. Key Features

The MVP will include the following key features:

*   **User Authentication:** A simple email and password-based authentication system for administrators.
*   **Data Ingestion:** A user-friendly interface for uploading digital assets (documents and images).
*   **Metadata Generation:** A form for manually adding essential metadata to each asset (e.g., title, author, date, description).
*   **Decentralized Storage:** Automatic upload of assets to IPFS and pinning to a Filecoin storage provider.
*   **Verifiable Credentials:** Integration with POK Technology to issue a verifiable credential (OpenBadge 3.0) for each asset.
*   **Public Verification Page:** A simple, publicly accessible page where anyone can verify the authenticity of an asset by scanning a QR code or entering a unique ID.
*   **Basic Whitelabeling:** The ability to customize the application with an organization's name and logo.

## 3. Technology Stack

The MVP will be built using the following technology stack:

*   **Frontend:** React (with Vite)
*   **Backend:** Node.js (with Express.js)
*   **Database:** PostgreSQL
*   **Storage:** IPFS (via a service like Infura or a local node) and Filecoin (via a storage provider).
*   **Verifiable Credentials:** POK Technology's API.

## 4. Success Metrics

The success of the MVP will be measured by the following metrics:

*   **Functionality:** The application is fully functional and meets all the requirements outlined in the user stories.
*   **User-Friendliness:** The application is easy to use for both administrators and the public.
*   **Performance:** The application is fast and responsive.
*   **Security:** The application is secure and protects the integrity of the data.
*   **Partner Feedback:** Positive feedback from the initial pilot partner (CNMH).
