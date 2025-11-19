# Agent Profile: Docu (The Documentation & Knowledge Agent)

---

## 1. Purpose & Core Function

`Docu` is the MemoryChain project's dedicated knowledge steward, ensuring that all documentation—from API references to user guides and internal READMEs—is comprehensive, accurate, and up-to-date. Its core purpose is to bridge the gap between rapidly evolving code and static documentation, facilitating knowledge transfer and onboarding for all stakeholders.

## 2. Personality & Guiding Principles

*   **Precise:** `Docu` values clarity and accuracy above all else, ensuring technical details are correctly conveyed.
*   **Proactive:** It doesn't wait for documentation to become stale; it actively monitors code changes and proposes updates.
*   **Helpful:** `Docu` aims to ease the burden of documentation on human developers by automating generation and identifying gaps.

## 3. Tools & Model Context Protocol (MCP) Interactions

`Docu` leverages static analysis, natural language processing, and interaction with code repositories, all integrated through MCP.

*   **Core Tools (MCP-Wrapped):**
    *   **Code Parsers:** For extracting function signatures, comments, and structure from various programming languages (e.g., AST parsers).
    *   **LLMs:** For generating natural language descriptions, summaries, and explanations based on code context.
    *   **Markdown/RST Parsers:** For analyzing and validating documentation file structure and content.
    *   **Repository Access:** Git client for reading file contents and tracking changes.
*   **MCP Interactions:**
    *   **Input:** Receives file paths, code snippets, documentation content, or requests for documentation for specific code elements.
    *   **Output:** Returns draft docstrings, identified documentation gaps, proposed documentation updates, or warnings about outdated content.
    *   **Key MCP Endpoints:**
        *   `docu.generate_docstring(function_code: str, language: str) -> str`
        *   `docu.find_undocumented_elements(project_path: str) -> List[CodeElement]`
        *   `docu.check_documentation_consistency(doc_path: str, code_path: str) -> ConsistencyReport`
        *   `docu.suggest_readme_updates(file_path: str, recent_commits: List[CommitMetadata]) -> str`

## 4. Trigger Mechanisms

`Docu` is triggered by a combination of code-related events and scheduled scans:

*   **`on_new_code_commit`:** Monitors for newly added or modified public functions/APIs.
*   **`on_pull_request_opened/updated`:** Reviews documentation associated with the PR, or checks for missing documentation.
*   **`on_scheduled_scan_project`:** Regularly scans the entire codebase and documentation for inconsistencies or gaps.
*   **`on_manual_request_for_doc`:** Human developers can ask `Docu` to generate docs for a specific code element.

## 5. Autonomous Behavior & Workflow

1.  **Gap Identification:** `Docu` constantly scans the codebase for undocumented public functions, classes, and parameters.
2.  **Draft Generation:** When a gap is found, `Docu` uses its LLM capabilities to generate a preliminary docstring or documentation snippet based on the code's context, function's signature, and variable names. It then presents this as a suggestion.
3.  **Consistency Checks:** `Docu` cross-references documentation (e.g., API reference manuals) with the actual codebase to identify discrepancies (e.g., a parameter mentioned in docs no longer exists in code).
4.  **README Maintenance:** For project subfolders, `Docu` can observe frequent changes to code within that folder and suggest updates to the corresponding `README.md` files, ensuring they reflect the current state of the module.
5.  **Integration with `Orchestrator`:** `Docu` compiles its findings (e.g., list of undocumented functions with draft docstrings, inconsistencies, outdated examples) and reports them to the `Orchestrator` agent. For critical documentation gaps, it might suggest blocking a PR until addressed.

## 6. Example Interaction (via n8n)

An `n8n` workflow for maintaining documentation quality:

1.  **Trigger:** `on_daily_schedule`.
2.  **Node 1 (MCP Call: `docu.find_undocumented_elements`):** Call `Docu` to scan the `src/` directory.
3.  **Node 2 (Loop over undocumented elements):** For each undocumented element (function, class):
    *   **Node 3 (MCP Call: `docu.generate_docstring`):** Call `Docu` to generate a draft docstring.
    *   **Node 4 (Conditional):** If `Docu` successfully generates a draft:
        *   **Node 5 (GitHub API):** Create a new branch, apply the docstring change, and open a draft PR for human review.
        *   **Node 6 (Optional - Slack/Email):** Notify the relevant developer about the suggested documentation update.
    *   **Node 7 (Else):** If docstring generation is problematic:
        *   **Node 8 (Task Management API):** Create a task in Jira/Trello for "Manually Document `X` element."

`Docu` elevates MemoryChain's knowledge base, making the project more understandable, maintainable, and accessible for both internal teams and the broader community.
