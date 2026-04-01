import { useState } from "react";
import { Issue } from "../types/issue";

interface CreateIssueModalProps {
  onClose: () => void;
  onCreate: (data: {
    title: string;
    description: string;
    status: Issue["status"];
    priority: Issue["priority"];
  }) => Promise<void>;
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

export default function CreateIssueModal({
  onClose,
  onCreate,
}: CreateIssueModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Issue["status"]>("backlog");
  const [priority, setPriority] = useState<Issue["priority"]>("none");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || submitting) return;
    setSubmitting(true);
    try {
      await onCreate({ title: title.trim(), description, status, priority });
      onClose();
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-header-team-icon">S</div>
            <span>New issue</span>
          </div>
          <div className="modal-header-actions">
            <button className="modal-close-btn">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9v4h4M13 7V3h-4" />
              </svg>
            </button>
            <button className="modal-close-btn" onClick={onClose}>
              &times;
            </button>
          </div>
        </div>

        <div className="modal-body">
          <input
            className="modal-title-input"
            placeholder="Issue title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            autoFocus
          />
          <textarea
            className="modal-description-input"
            placeholder="Add description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className="modal-footer">
          <div className="modal-pills">
            <div style={{ position: "relative" }}>
              <button
                className="modal-pill"
                onClick={() => {
                  setShowStatusDropdown(!showStatusDropdown);
                  setShowPriorityDropdown(false);
                }}
              >
                <span
                  className="modal-pill-dot"
                  style={{
                    background:
                      status === "backlog"
                        ? "var(--status-backlog)"
                        : status === "active"
                          ? "var(--status-active)"
                          : "var(--status-done)",
                  }}
                />
                {statusLabels[status]}
              </button>
              {showStatusDropdown && (
                <div
                  className="dropdown"
                  style={{ bottom: "100%", left: 0, marginBottom: 4 }}
                >
                  {statusOptions.map((s) => (
                    <button
                      key={s}
                      className={`dropdown-item ${status === s ? "selected" : ""}`}
                      onClick={() => {
                        setStatus(s);
                        setShowStatusDropdown(false);
                      }}
                    >
                      {statusLabels[s]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div style={{ position: "relative" }}>
              <button
                className="modal-pill"
                onClick={() => {
                  setShowPriorityDropdown(!showPriorityDropdown);
                  setShowStatusDropdown(false);
                }}
              >
                <span>&#9866;</span>
                Priority
              </button>
              {showPriorityDropdown && (
                <div
                  className="dropdown"
                  style={{ bottom: "100%", left: 0, marginBottom: 4 }}
                >
                  {priorityOptions.map((p) => (
                    <button
                      key={p}
                      className={`dropdown-item ${priority === p ? "selected" : ""}`}
                      onClick={() => {
                        setPriority(p);
                        setShowPriorityDropdown(false);
                      }}
                    >
                      {priorityLabels[p]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="modal-pill">
              <span>&#128100;</span> Assignee
            </button>
            <button className="modal-pill">
              <span>&#9898;</span> Project
            </button>
            <button className="modal-pill">
              <span>&#127991;</span> Labels
            </button>
            <button className="modal-pill">...</button>
          </div>

          <div className="modal-footer-right">
            <label className="create-more-toggle">
              <span className="toggle-switch"><span className="toggle-knob" /></span>
              Create more
            </label>
            <button
              className="create-btn"
              onClick={handleSubmit}
              disabled={!title.trim() || submitting}
            >
              Create issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
