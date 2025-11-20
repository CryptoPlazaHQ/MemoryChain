# 01. User Stories: MemoryChain MVP

## 1. Administrator (e.g., University Registrar, LMS Course Admin, Institutional Archivist)

As an **administrator**, I want to...

*   ...log in to the application securely so that I can manage our institution's assets and credentials, **reducing administrative burden and ensuring compliance.**
*   ...access a dashboard to manage credentials (e.g., issue course completion VCs) and authorize users, **combating credential fraud and streamlining verification.**
*   ...upload a digital asset (e.g., research paper, historical document, course material) to the platform so that it can be archived, **securing our institutional knowledge.**
*   ...add comprehensive metadata to the asset so that it can be easily identified, searched, and contextually linked, **improving knowledge management.**
*   ...see a confirmation that the asset has been successfully uploaded to IPFS and Filecoin so that I know it is securely and permanently stored, **mitigating knowledge loss risks.**
*   ...issue a verifiable credential for a learner or asset using the **CredentiaLit SDK** so that it is fraud-proof and owned by the recipient, **enhancing educational integrity and student empowerment.**
*   ...see a list of all archived assets and issued credentials so that I can audit and manage them effectively.
*   ...customize the application with my institution's name and logo so that it matches our branding, **facilitating seamless institutional adoption.**

## 2. Public User (e.g., Employer, Academic Verifier, Research Collaborator)

As a **public user**, I want to...

*   ...access a public verification page so that I can verify the authenticity of an asset (e.g., research paper) or a learner's credential (e.g., course completion VC).
*   ...scan a QR code or enter a unique ID (e.g., a credential ID or asset CID) to retrieve information about an asset or credential so that I can be sure it is authentic and valid, **drastically reducing verification time and cost.**
*   ...see the asset's metadata and a link to the asset on IPFS so that I can view the verifiable content.
*   ...see a clear confirmation that the asset's credential is valid, verified by Lit Protocol (via the **CredentiaLit SDK**), so that I can trust its authenticity and provenance, **enhancing trust in academic and professional claims.**

## 3. Developer (e.g., LMS Developer, Internal Application Integrator)

As a **developer**, I want to...

*   ...be able to easily integrate the **CredentiaLit SDK** (now in `CredentiaLit/`) into my application (e.g., an LMS, a research data portal, a community platform) to manage verifiable credentials and authorization, **accelerating secure feature development.**
*   ...have clear API documentation and examples so that I can quickly implement credential issuance, verification, and access control functionalities.
*   ...understand the underlying Lit Protocol interactions abstractly so that I can focus on building value for my application users.
