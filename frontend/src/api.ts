import { Issue, CreateIssuePayload, UpdateIssuePayload } from "./types/issue";

const BASE = "/api";

export async function fetchIssues(): Promise<Issue[]> {
  const res = await fetch(`${BASE}/issues`);
  if (!res.ok) throw new Error("Failed to fetch issues");
  return res.json();
}

export async function fetchIssue(identifier: string): Promise<Issue> {
  const res = await fetch(`${BASE}/issues/${identifier}`);
  if (!res.ok) throw new Error("Failed to fetch issue");
  return res.json();
}

export async function createIssue(payload: CreateIssuePayload): Promise<Issue> {
  const res = await fetch(`${BASE}/issues`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create issue");
  return res.json();
}

export async function updateIssue(
  identifier: string,
  payload: UpdateIssuePayload
): Promise<Issue> {
  const res = await fetch(`${BASE}/issues/${identifier}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update issue");
  return res.json();
}

export async function deleteIssue(
  identifier: string
): Promise<{ deleted: boolean }> {
  const res = await fetch(`${BASE}/issues/${identifier}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete issue");
  return res.json();
}
