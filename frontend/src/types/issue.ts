export interface Issue {
  id: number;
  identifier: string;
  title: string;
  description: string;
  status: "backlog" | "active" | "done";
  priority: "none" | "low" | "medium" | "high" | "urgent";
  assignee: string;
  labels: string[];
  project: string;
  created_at: string;
  updated_at: string;
}

export type CreateIssuePayload = {
  title: string;
  description?: string;
  status?: Issue["status"];
  priority?: Issue["priority"];
  assignee?: string;
  labels?: string[];
  project?: string;
};

export type UpdateIssuePayload = Partial<
  Omit<Issue, "id" | "identifier" | "created_at" | "updated_at">
>;
