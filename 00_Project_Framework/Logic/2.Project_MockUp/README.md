# Project Mockup: A Text-Based Visualization of MemoryChain

---

## 1. Design Philosophy: "The Modern Archive"

The user experience of MemoryChain is guided by a single philosophy: **"The Modern Archive."** This means the design must feel **authoritative and trustworthy** like a centuries-old library, yet be as **intuitive and seamless** as a modern web application.

*   **Clarity & Focus:** The UI is clean, spacious, and avoids clutter. The focus is always on the content and the task at hand.
*   **Trust through Transparency:** Visual cues constantly reinforce the underlying technologies of decentralization and verification. CIDs, verification checkmarks, and provenance trails are not hidden but presented as core UI elements.
*   **Quiet Confidence:** The aesthetic is professional and understated. It does not shout for attention but communicates reliability and seriousness of purpose.
*   **Accessibility:** The platform is designed to be accessible to a wide range of users, from tech-savvy administrators to the general public, adhering to WCAG standards.

**Inspiration:** The design takes cues from the clean interfaces of platforms like Stripe (for its clear dashboards), the content-focus of Notion, and the authoritative typography of major museum and university websites.

---

## 2. Visual Style Guide (Text-Based)

*   **Color Palette:**
    *   **Primary (Charcoal):** `#2D3748` - Used for primary text, headings, and dark UI elements. Evokes seriousness and readability.
    *   **Secondary (Slate Gray):** `#718096` - Used for subheadings, descriptive text, and secondary UI elements.
    *   **Background (Off-White):** `#F7FAFC` - A clean, slightly warm background that is easy on the eyes.
    *   **Accent (Cerulean Blue):** `#3182CE` - Used for primary buttons, links, and active states. Represents technology, clarity, and trust.
    *   **Success (Emerald Green):** `#38A169` - Used for verification success, confirmation messages, and positive indicators.
    *   **Warning (Amber):** `#D69E2E` - For pending states, warnings, or actions that require caution.
    *   **Error (Crimson):** `#E53E3E` - For errors and critical alerts.

*   **Typography:**
    *   **Headings:** `Source Serif Pro`, a strong, classic serif font that conveys authority and tradition.
    *   **Body & UI Text:** `Inter`, a highly readable and modern sans-serif font, perfect for user interfaces.

*   **Iconography:** `Feather Icons` - A set of clean, minimalist, and consistent line icons.

---

## 3. User Journeys & Screen Descriptions

### A. The Administrator's Journey: Ingesting a Historical Document

**Persona:** Dr. Elena Reyes, an archivist at a national historical institute.

**Goal:** Securely upload a newly digitized 19th-century land deed and ensure it is verifiably archived.

1.  **Login Screen:**
    *   **Appearance:** A centered, clean white card on the off-white background. The MemoryChain logo is subtly displayed at the top.
    *   **Fields:** Two simple fields: "Email Address" and "Password". A primary blue "Log In" button. Below it, a link: "Having trouble? Connect with your wallet." This second option is for more advanced users using the Credentialing SDK directly.
    *   **Interaction:** Dr. Reyes enters her credentials and clicks "Log In".

2.  **The Admin Dashboard (Home):**
    *   **Layout:** A two-column layout. A fixed vertical navigation bar on the left, and the main content area on the right.
    *   **Left Navigation:** Icons and text for "Dashboard", "Ingest New Asset", "Manage Archive", "Users & Roles", "Settings". Her user profile (`Dr. Elena Reyes`) is at the bottom.
    *   **Main Content Area:**
        *   **Top:** A welcome message: "Welcome back, Dr. Reyes."
        *   **Stats Bar:** Four clean cards in a row: "Total Assets" (with a number), "Verifications This Month" (number), "Storage Deals Active" (number), "Pending Approvals" (number, with an amber dot).
        *   **Recent Activity Feed:** A chronological list of recent events: "Document 'Deed of 1884' was successfully verified.", "User 'J. Gomez' was granted 'Curator' role.", etc. Each item has a timestamp.
        *   **Primary Call-to-Action:** A large, blue "+ Ingest New Asset" button is prominently displayed.

3.  **Ingest New Asset Screen:**
    *   **Layout:** A large, central "drag-and-drop" area with a dashed border. An icon of a cloud upload is in the center. Text says, "Drag & Drop Files Here or Click to Browse".
    *   **Interaction (Step 1 - Upload):** Dr. Reyes drags the `deed_1884.pdf` file into the area.
    *   **Progress Indicator:** A progress bar appears below the file name. Upon completion, a green checkmark appears, along with the text: **"File Uploaded to IPFS. CID Generated: `bafy...`"** The CID is a clickable link that opens the file in a public IPFS gateway.

4.  **Ingest New Asset Screen (Metadata Form):**
    *   **Appearance:** The view smoothly transitions to a two-column form. On the left is a preview of the uploaded PDF. On the right are the metadata fields.
    *   **Fields:** "Title", "Author/Origin", "Date Created", "Description", "Tags (comma-separated)".
    *   **AI Assistance:** As Dr. Reyes starts typing, the **LLM Assistant** comes to life. Below the "Description" field, a lightbulb icon appears with the text: "AI Suggestions: Based on the document, we suggest the following tags: `land deed`, `19th century`, `legal document`." She can click these tags to add them instantly.
    *   **Final Actions:** At the bottom are two buttons: "Save as Draft" and a primary blue "Submit for Archiving".

5.  **Archiving Confirmation Modal:**
    *   **Appearance:** A modal window appears after she clicks "Submit".
    *   **Content:** It shows a summary of the actions being taken, with checkmarks appearing next to each as they complete in real-time.
        *   `✓` Metadata Saved
        *   `...` Issuing Verifiable Credential via CredentiaLit Protocol... `(pending)` -> `✓`
        *   `...` Initiating Filecoin Storage Deal... `(pending)` -> `✓`
    *   **Final Message:** "Success! The asset 'Deed of 1884' is now permanently archived and verified." A "View Asset" button is shown.

### B. The Public User's Journey: Verifying an Asset

**Persona:** David, a university student researching historical land claims.

**Goal:** Verify the authenticity of a document referenced in his research.

1.  **Public Verification Page:**
    *   **Appearance:** A very simple, full-screen page. The MemoryChain logo and the institution's logo (e.g., "In partnership with the National Archive") are at the top.
    *   **Central Element:** A single, clean input field with the label: "Enter MemoryChain ID or CID to Verify". A blue "Verify" button is next to it.
    *   **Interaction:** David pastes the CID he found in a citation: `bafy...`.

2.  **Verification Results View:**
    *   **Appearance:** The page animates to a results card.
    *   **Results Card:**
        *   **Top Left:** A large, bold green shield icon with the text **"VERIFIED"**.
        *   **Top Right:** "Verified on: Nov 18, 2025" and "Issuing Institution: National Archive".
        *   **Asset Details:**
            *   **Title:** Deed of 1884
            *   **Author/Origin:** ...
            *   **Date:** ...
        *   **Provenance Trail:** A simple, clear timeline:
            *   *Nov 18, 2025:* Credential Issued by National Archive.
            *   *Nov 18, 2025:* Asset archived to Filecoin Network.
            *   *Nov 18, 2025:* Ingested by Dr. Elena Reyes.
        *   **Links:** "View on IPFS" and "View Credential Details" links. The second link would show the raw Verifiable Credential data.

This text-based mockup provides a clear blueprint for the frontend developers, ensuring the core philosophies of clarity, trust, and modern professionalism are embedded in the final product.
