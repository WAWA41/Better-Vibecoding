---
name: auto-chat
description: Route work between Codex desktop chats when the user asks for automatic chat handoffs, a standing user rule enables them, or a new chat receives a handoff. Also use when the user asks to evaluate or disable automatic handoffs.
---

# Auto-chat

## Decide where the request belongs

Read the user's request and applicable personal or project rules. Record the source and scope of explicit permission to create chats. A global instruction can cover every project and new chat. Permission given in one chat covers that chat and its successors unless the user specifies a different scope. Honor later instructions such as “keep this one here” or “turn off automatic handoffs.” Update a project's `AGENTS.md` only when the user asks to save a project rule.

If the user asks for advice, give a routing decision. If they enable the skill without a task, acknowledge it and wait for a request. Start the first task of a fresh chat there. Keep follow-ups, corrections, new constraints on the same deliverable, and investigation of the same failure together.

Consider a new chat when the next request has its own deliverable and acceptance criteria, or when a verified phase ends and the next phase can be checked independently. Chat length alone is insufficient. Finish any active write or reach a point where the next chat can take over the running work. Continue in the current chat if the receiver would lose access to essential state or the working directory.

## Save the handoff

Create `.auto-chat/handoffs/<new UUID>/resume.md` in the project workspace only when handing work over. Give each handoff its own directory. Record:

- The user's request in their own words, later corrections, acceptance criteria, and scope exclusions.
- Applicable decisions from earlier work, their scope and sources, and any older decisions they supersede. Identify assumptions and unresolved proposals separately.
- The absolute project or worktree path, branch and HEAD when available, relevant uncommitted edits, key files, verified results, remaining work, and the first action for the receiver.

Include only relevant history. Leave out credentials and unrelated chats. Put small attachments that must remain unchanged beside the note, or reference originals both chats can read. Read the note back and calculate SHA-256 for the note and each attachment. On PowerShell, use `Get-FileHash -LiteralPath`. Keep handoff materials local and out of the task's commits.

If the project already uses pstack checkpoints and its Resume storage instructions and tools are available, you can use its begin, publish, and read workflow. Verify that the published receipt identifies this handoff's directory. Pin the exact file paths and hashes because another task can advance the latest pointer. Use the workspace note if the checkpoint tooling or receipt is unavailable.

## Create the chat and confirm pickup

Use the Codex desktop thread tools only within the user's explicit authorization. Use `list_projects` to match the project and worktree, then `create_thread` with the same project's local environment. Use a projectless target only when the receiver's access to the original directory can be verified. Keep the source chat available.

Before dispatching, check whether this handoff has already been assigned. If creation times out or its outcome is unclear, use `list_threads` and inspect candidate chats for the exact handoff path before retrying. While creation or pickup is uncertain, pause writes to the same task in the source chat. If creation definitively failed and no receiver exists, continue locally and report the failure.

In the first message, include the goal, acceptance criteria, original directory, pinned absolute paths and hashes, and the user's permission and its scope. Tell the receiver to verify the handoff and start work there. Reconsider routing only on the next new request.

Record the returned identifiers alongside the handoff path and show the desktop chat entry to the user. With a `threadId` and `hostId`, use `wait_threads` or `read_thread` to observe pickup. If only a `clientThreadId` is available, show the pending entry and resolve the actual thread ID before reading or waiting. The outbound message alone means pickup is still pending. Confirm pickup from the receiver's account of the goal, relevant corrections, and first action.

## Receive the handoff

Verify the named note and attachments against their SHA-256 hashes. Read the project rules and compare the actual worktree, branch, changes, and acceptance criteria with the note. Use files, tests, or runtime results to distinguish completed work from open tasks. If another checkpoint is newer, follow the verified record named in the opening message.

Resolve material discrepancies from the cited sources. Ask the user only when a discrepancy affects the work and the evidence cannot resolve it. Report the inherited goal and first action, then perform and verify the task. Carry applicable corrections and authorization into any later handoff.
