import { useState, useRef, useEffect } from "react";
import { Issue } from "../types/issue";
import PriorityIcon from "./PriorityIcon";
import StatusIcon from "./StatusIcon";

interface IssueDetailProps {
  issue: Issue;
  onBack: () => void;
  onUpdate: (identifier: string, data: Partial<Issue>) => Promise<void>;
  onDelete: (identifier: string) => Promise<void>;
}

const statusOptions: Issue["status"][] = ["backlog", "active", "done"];
const priorityOptions: Issue["priority"][] = [
  "none",
  "low",
  "medium",
  "high",
  "urgent",
];

const statusLabels: Record<Issue["status"], string> = {
  backlog: "Backlog",
  active: "Active",
  done: "Done",
};

const priorityLabels: Record<Issue["priority"], string> = {
  none: "No priority",
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

const priorityColors: Record<Issue["priority"], string> = {
  urgent: "var(--priority-urgent)",
  high: "var(--priority-high)",
  medium: "var(--priority-medium)",
  low: "var(--priority-low)",
  none: "var(--priority-none)",
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}min ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

type DropdownType = "status" | "priority" | null;

export default function IssueDetail({
  issue,
  onBack,
  onUpdate,
  onDelete,
}: IssueDetailProps) {
  const [title, setTitle] = useState(issue.title);
  const [description, setDescription] = useState(issue.description);
  const [dropdown, setDropdown] = useState<DropdownType>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTitle(issue.title);
    setDescription(issue.description);
  }, [issue]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleTitleBlur = () => {
    if (title !== issue.title && title.trim()) {
      onUpdate(issue.identifier, { title });
    }
  };

  const handleDescriptionBlur = () => {
    if (description !== issue.description) {
      onUpdate(issue.identifier, { description });
    }
  };

  return (
    <div className="issue-detail">
      <div className="issue-detail-header">
        <button className="back-btn" onClick={onBack}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M10 3L5 8l5 5" />
          </svg>
        </button>
        <span>{issue.identifier}</span>
        <span style={{ fontWeight: 500 }}>{issue.title}</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <button className="back-btn" style={{ color: "var(--text-muted)" }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 2l-1.5 4.5L2 8l4.5 1.5L8 14l1.5-4.5L14 8l-4.5-1.5z" />
            </svg>
          </button>
          <button
            className="back-btn"
            style={{ color: "var(--text-muted)" }}
            onClick={() => {
              if (confirm("Delete this issue?")) {
                onDelete(issue.identifier);
              }
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="4" cy="8" r="1" fill="currentColor" />
              <circle cx="8" cy="8" r="1" fill="currentColor" />
              <circle cx="12" cy="8" r="1" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
      <div className="issue-detail-body">
        <div className="issue-detail-main">
          <input
            ref={titleRef}
            className="issue-detail-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") titleRef.current?.blur();
            }}
          />

          <textarea
            className="issue-detail-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={handleDescriptionBlur}
            placeholder="Add description..."
            rows={4}
          />

          <div className="issue-meta-actions">
            <span style={{ fontSize: 16 }}>&#128993;</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5">
              <path d="M13 10v3H3V3h3M7 9l6-6M9 3h4v4" />
            </svg>
            <button style={{ fontSize: "var(--font-size-sm)", color: "var(--text-secondary)" }}>
              + Add sub-issues
            </button>
          </div>

          <div className="issue-detail-activity">
            <div className="issue-detail-activity-header">
              <span className="issue-detail-activity-title">Activity</span>
              <button style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", padding: "2px 8px" }}>
                Unsubscribe
              </button>
            </div>
            <div className="activity-item">
              <span className="activity-avatar">U</span>
              <span>
                <strong style={{ color: "var(--text-primary)" }}>User</strong>{" "}
                created the issue
              </span>
              <span style={{ marginLeft: "auto" }}>
                {formatDate(issue.created_at)}
              </span>
            </div>
          </div>

          <div className="issue-comment-box">
            <input
              type="text"
              placeholder="Leave a comment..."
              style={{
                width: "100%",
                padding: "10px 12px",
                background: "var(--bg-hover)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)",
                color: "var(--text-primary)",
                fontSize: "var(--font-size-sm)",
              }}
            />
          </div>
        </div>

        <div className="properties-panel" ref={dropdownRef}>
        <div className="properties-title">Properties</div>

        <div className="property-row">
          <span className="property-label">Status</span>
          <div style={{ position: "relative" }}>
            <button
              className="property-value"
              onClick={() =>
                setDropdown(dropdown === "status" ? null : "status")
              }
            >
              <StatusIcon status={issue.status} />
              {statusLabels[issue.status]}
            </button>
            {dropdown === "status" && (
              <div
                className="dropdown"
                style={{ right: 0, top: "100%", marginTop: 4 }}
              >
                {statusOptions.map((s) => (
                  <button
                    key={s}
                    className={`dropdown-item ${issue.status === s ? "selected" : ""}`}
                    onClick={() => {
                      onUpdate(issue.identifier, { status: s });
                      setDropdown(null);
                    }}
                  >
                    <StatusIcon status={s} />
                    {statusLabels[s]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="property-row">
          <span className="property-label">Priority</span>
          <div style={{ position: "relative" }}>
            <button
              className="property-value"
              onClick={() =>
                setDropdown(dropdown === "priority" ? null : "priority")
              }
            >
              <PriorityIcon priority={issue.priority} />
              {priorityLabels[issue.priority]}
            </button>
            {dropdown === "priority" && (
              <div
                className="dropdown"
                style={{ right: 0, top: "100%", marginTop: 4 }}
              >
                {priorityOptions.map((p) => (
                  <button
                    key={p}
                    className={`dropdown-item ${issue.priority === p ? "selected" : ""}`}
                    onClick={() => {
                      onUpdate(issue.identifier, { priority: p });
                      setDropdown(null);
                    }}
                  >
                    <PriorityIcon priority={p} />
                    {priorityLabels[p]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="property-row">
          <span className="property-label">Assignee</span>
          <span className="property-value" style={{ color: "var(--text-secondary)" }}>
            {issue.assignee || "Assign"}
          </span>
        </div>

        <div className="property-section">
          <div className="property-section-title">Labels</div>
          <div className="property-add-btn">
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M8 3v10M3 8h10" />
            </svg>
            Add label
          </div>
        </div>

        <div className="property-section">
          <div className="property-section-title">Project</div>
          <div className="property-add-btn">
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M8 3v10M3 8h10" />
            </svg>
            Add to project
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
