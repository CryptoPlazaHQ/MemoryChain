# MemoryChain Development Log

This document serves as a chronological log of the development progress for the MemoryChain Minimum Viable Product (MVP). It details the steps taken, the reasoning behind decisions, and the current state of the application. We began by checking Akashic Project from Filecoin Foundation, however we thought in creating something from zero with a whitelabelling purpose to help the network for easy users onboarding.

---

## 2025-11-13 - Initial Project Setup & Scaffolding

**Action/Task:** Initial project setup, workspace cleanup, and scaffolding of the MemoryChain React application.

**Reasoning/Context:** Following the user's request to pivot from the "Akashic" project to "MemoryChain" and to establish a well-organized project framework. The goal was to create a clean slate for the new project and set up a basic React development environment.


We are connecting to IPFS using Helia because Helia is a modern, lightweight, and modular JavaScript implementation of IPFS that can be embedded directly into applications, including browser apps. This gives it several advantages:

It allows the IPFS node to run inside the app or browser itself, reducing latency and improving performance.

Developers can use familiar JavaScript tools and skills to manage and tune the IPFS node.

Helia has a modular architecture, so only the needed features are included, making it more efficient.

Compared to older IPFS implementations like js-IPFS or Kubo, Helia offers faster operations and better resource management.

For in-browser and Node.js apps, Helia is currently one of the best options because it natively supports these environments without complex external setups.

There are other IPFS tools like Kubo and Elastic-IPFS, but Kubo requires separate installation and is less integrated for web apps, while Elastic-IPFS is more cloud-focused. Helia is considered good especially for decentralized apps that want seamless IPFS integration within web or server environments because it balances performance, modularity, and ease of use.


**Outcome/Result:**
*   All "Akashic" related files and folders were deleted from the workspace, except for the `MemoryChain` directory.
*   A new, structured project framework was established within the `MemoryChain` directory, including:
    *   `00_Project_Framework/` (containing `00_Project_Charter.md`, `01_Vision_and_Scope.md`, `02_Technology_Stack.md`, `03_Roadmap.md`)
    *   `01_MVP/` (containing `00_MVP_Definition.md`, `01_User_Stories.md`)
    *   `02_Agents/` (containing `00_Agent_Culture.md`, `01_Project_Manager_Architect.md`)
*   A `.gitignore` file was created for a React project.
*   A basic React application with TypeScript was scaffolded using Vite within the `MemoryChain/src` directory. This included:
    *   `MemoryChain/index.html`
    *   `MemoryChain/src/main.tsx`
    *   `MemoryChain/src/App.tsx` (initial placeholder content)
    *   `MemoryChain/src/index.css`
    *   `MemoryChain/vite.config.ts`
    *   `MemoryChain/package.json`
    *   `MemoryChain/tsconfig.json`
    *   `MemoryChain/tsconfig.node.json`
*   Project dependencies were installed using `pnpm install`.

**Next Steps:** Begin implementing the core features of the MVP, starting with the UI.

---

## 2025-11-13 - Admin Dashboard and IPFS Upload Integration

**Action/Task:** Developed the basic UI for the Admin Dashboard and integrated local IPFS file upload functionality using Helia.

**Reasoning/Context:** To fulfill the MVP requirement for data ingestion. The Admin Dashboard is where users will upload their digital assets. Initial integration with IPFS (via Helia) demonstrates the decentralized storage aspect.

**Outcome/Result:**
*   `LoginPage.tsx` was created as a placeholder for user authentication.
*   `react-router-dom` was installed for client-side routing.
*   `App.tsx` was updated to include basic routing for `/`, `/login`, and `/admin`.
*   `AdminDashboard.tsx` was created with a form for file upload and metadata input (Title, Author, Date, Description).
*   Helia was installed (after deprecation warning for `ipfs-http-client`) and integrated into `AdminDashboard.tsx` to:
    *   Create a local Helia node on component mount.
    *   Handle file selection.
    *   Upload the selected file to the local Helia node upon form submission.
    *   Display the IPFS CID and a link to view the uploaded file on a public IPFS gateway.
*   The `assets` state (an in-memory array of uploaded asset metadata) was lifted from `AdminDashboard.tsx` to `App.tsx` to allow sharing with other components.
*   `VerificationPage.tsx` was created to allow users to search for and display asset metadata by CID.
*   `App.tsx` was updated to pass the `assets` state to both `AdminDashboard` and `VerificationPage`.

**Next Steps:** Implement user authentication to protect the Admin Dashboard.

---

## 2025-11-13 - User Authentication Implementation

**Action/Task:** Implemented a basic, simulated user authentication system to protect the `/admin` route.

**Reasoning/Context:** To secure the administrative interface as per the MVP definition. This initial implementation provides a functional placeholder for a more robust authentication system in the future.

**Outcome/Result:**
*   `AuthContext.tsx` was created to manage authentication state (`isAuthenticated`, `login`, `logout`) using React Context.
*   `main.tsx` was updated to wrap the `App` component with `AuthProvider`, making the authentication context available throughout the application.
*   `ProtectedRoute.tsx` was created to act as a guard for routes, redirecting unauthenticated users to the `/login` page.
*   `App.tsx` was updated to use `ProtectedRoute` to secure the `/admin` route.
*   `LoginPage.tsx` was updated to use the `login` function from `AuthContext` and `react-router-dom`'s `useNavigate` to redirect to `/admin` upon simulated login.
*   A "Logout" button was added to `AdminDashboard.tsx`, which calls the `logout` function from `AuthContext` and redirects the user to `/login`.

**Current State:** The MVP now has a basic authentication flow, a functional admin dashboard for IPFS file uploads and metadata entry (in-memory), and a public verification page.

**Next Steps:**
1.  **Replace the in-memory array with a database:** This is the most critical next step for data persistence.
2.  **Integrate with POK Technology:** To issue verifiable credentials.
3.  **Improve the UI/UX:** Enhance the visual design and user experience.
4.  **Refine the login mechanism:** Implement actual authentication logic (e.g., with a backend).

---

## 2025-11-14 - Project Framework Restructuring & Grant Integration

**Action/Task:** Restructured the `MemoryChain/00_Project_Framework` directory, integrated Lit Protocol as the primary authentication strategy, and incorporated grant opportunities into the roadmap.

**Reasoning/Context:** To enhance the project's organizational structure, align with strategic grant opportunities (specifically Lit Protocol), and provide a clearer, more comprehensive framework for any project manager or LLM assuming direction. This also addresses the need for a "clear quality management system docs" and a more detailed "Installation" stage.

**Outcome/Result:**
*   The `MemoryChain/00_Project_Framework` directory was restructured:
    *   Existing core project documents (`00_Project_Charter.md`, `01_Vision_and_Scope.md`, `02_Technology_Stack.md`, `03_Roadmap.md`, `04_Technical_Architecture_Summary.md`) were moved into a new subfolder: `MemoryChain/00_Project_Framework/01_Project_Definition`.
    *   New subfolders were created under `MemoryChain/00_Project_Framework/Logic`:
        *   `1.Concept`
        *   `2.Project_MockUp`
        *   `3.Technical_Strategy`
        *   `4.Tokenomics`
        *   `5.Gamification_Strategy`
    *   A new folder `MemoryChain/00_Project_Framework/Quality_Management_System` was created.
*   Initial `README.md` files were created in each new `Logic` subfolder and in `Quality_Management_System`, outlining their purpose and future content.
*   The `MemoryChain/Roadmap.md` was thoroughly revised to:
    *   Explicitly integrate the **Model Context Protocol (MCP)** and its central role in intelligent data interaction and agentic frameworks.
    *   Update the "Agentic Framework for Ecosystem Integration" core principle to reflect external agentic interaction with IPFS data and MCPs.
    *   Detail how AI agents will utilize MCPs for data preparation, metadata refinement, MCP creation, discovery, and intelligent data interaction across various phases.
    *   Integrate the concept of an "Index of Specialized Data Services" (Index of MCPs) as an intelligent, agent-driven system.
    *   Include a Mermaid diagram for visual representation.
    *   Emphasize UI/UX throughout.
    *   Explicitly integrate the Lit Protocol grant waypoints and emphasize the open-source nature of the developments.
*   The `MemoryChain/00_Project_Framework/01_Project_Definition/02_Technology_Stack.md` was updated to explicitly mention **Lit Protocol** as the chosen authentication strategy, replacing generic references.
*   The `lit_grants.md` file was located and its content understood for future integration into the roadmap's grant waypoints.

**Current State:** The project framework is now highly organized, with a clear structure for comprehensive documentation. The roadmap and technology stack reflect a strategic focus on Lit Protocol and the Model Context Protocol (MCP), aligning with grant opportunities and advanced AI/decentralized data interaction.

**Next Steps:**
1.  **Develop Open Source Resource Strategy:** Outline the open-source resources and SDKs to be developed in each phase, emphasizing community contribution and brand awareness.
2.  **Populate Logic Folders:** Begin populating the `Logic` subfolders with actual content based on the project's vision.
3.  **Define Quality Management System:** Develop initial documents for the `Quality_Management_System`.

---

## 2025-11-14 - CryptoPlaza Project Documentation & Roadmap Refinement

**Action/Task:** Created the CryptoPlaza Project documentation as the "Flag Brand" and further refined the MemoryChain roadmap to align with this strategic context and Lit Protocol grant opportunities.

**Reasoning/Context:** To establish the overarching CryptoPlaza brand narrative for TechnoPlay's software division, focusing on high-visibility, high-impact use cases for Filecoin and Lit Protocol. This also ensures the MemoryChain roadmap is precisely aligned with grant opportunities and the development of open-source resources.

**Outcome/Result:**
*   A new folder `MemoryChain/CryptoPlaza_Project/` was created.
*   A comprehensive `MemoryChain/CryptoPlaza_Project/README.md` was created, serving as the "Flag Brand" document. This document articulates CryptoPlaza's objective, vision, mission, core pillars (SDKs, Dapps, Frameworks), strategic alignment with Filecoin and Lit Protocol, and how MemoryChain fits into this vision. It includes compelling copywriting for founders, developers, and investors.
*   The `MemoryChain/Roadmap.md` was further refined to:
    *   Explicitly integrate the Lit Protocol grants ("Credentialing SDK" (#4) and "Generating Privacy-Preserving Proofs with Lit" (#6)) as strategic waypoints, detailing their contribution to building the core stack and open-source resources.
    *   Clearly outline the open-source SDKs, Dapps, and frameworks that will be developed and released in each phase, emphasizing community contribution and brand awareness for both Filecoin and Lit Protocol.
    *   Ensure Lit Protocol is consistently presented as the chosen solution for authentication, verifiable credentials, and privacy-preserving proofs.
    *   Clearly articulate the development of ingestion, metadata, indexing, and MCP components as part of the Filecoin proposal.
    *   Maintain a strong UI/UX focus for the roadmap's presentation, including the Mermaid diagram.
*   The `MemoryChain/00_Project_Framework/01_Project_Definition/02_Technology_Stack.md` was confirmed to firmly establish Lit Protocol as the authentication and verifiable credential solution.
*   Initial `README.md` files were created for the new `Logic` subfolders (`1.Concept`, `2.Project_MockUp`, `3.Technical_Strategy`, `4.Tokenomics`, `5.Gamification_Strategy`) and for `Quality_Management_System`, outlining their purpose and what content they will eventually hold.

**Current State:** The project now has a well-defined brand narrative under CryptoPlaza, with a highly detailed and strategically aligned roadmap for MemoryChain. The documentation structure is robust, and the focus on open-source development and grant opportunities is clearly articulated.

**Next Steps:**
1.  **Develop Open Source Resource Strategy:** Outline the open-source resources and SDKs to be developed in each phase, emphasizing community contribution and brand awareness.
2.  **Populate Logic Folders:** Begin populating the `Logic` subfolders with actual content based on the project's vision.
3.  **Define Quality Management System:** Develop initial documents for the `Quality_Management_System`.

---