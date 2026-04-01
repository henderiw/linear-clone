import { Issue } from "../types/issue";
import PriorityIcon from "./PriorityIcon";
import StatusIcon from "./StatusIcon";

interface TeamViewProps {
  issues: Issue[];
  activeTab: "all" | "active" | "backlog";
  onTabChange: (tab: "all" | "active" | "backlog") => void;
  onSelectIssue: (issue: Issue) => void;
  onCreateClick: () => void;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function groupByStatus(issues: Issue[]): Record<string, Issue[]> {
  const groups: Record<string, Issue[]> = {};
  for (const issue of issues) {
    if (!groups[issue.status]) groups[issue.status] = [];
    groups[issue.status].push(issue);
  }
  return groups;
}

const statusOrder = ["active", "backlog", "done"];
const statusLabels: Record<string, string> = {
  backlog: "Backlog",
  active: "Active",
  done: "Done",
};

export default function TeamView({
  issues,
  activeTab,
  onTabChange,
  onSelectIssue,
  onCreateClick,
}: TeamViewProps) {
  const filtered =
    activeTab === "all"
      ? issues
      : issues.filter((i) => i.status === activeTab);

  const grouped = groupByStatus(filtered);

  return (
    <>
      <div className="team-header">
        <div className="team-header-dot" />
        <span className="team-header-name">Sandbox</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <button style={{ color: "var(--text-secondary)", padding: 4 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 4h12M4 8h8M6 12h4" />
            </svg>
          </button>
          <button style={{ color: "var(--text-secondary)", padding: 4 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="5" height="5" rx="1" />
              <rect x="9" y="2" width="5" height="5" rx="1" />
              <rect x="2" y="9" width="5" height="5" rx="1" />
              <rect x="9" y="9" width="5" height="5" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      <div className="tabs">
        {(["all", "active", "backlog"] as const).map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => onTabChange(tab)}
          >
            {tab === "all"
              ? "All Issues"
              : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button
          className="tab"
          onClick={onCreateClick}
          style={{ color: "var(--accent-blue)" }}
        >
          + New
        </button>
      </div>

      <div className="issue-list">
        {statusOrder.map((status) => {
          const group = grouped[status];
          if (!group || group.length === 0) return null;
          return (
            <div key={status} className="issue-group">
              <div className="issue-group-header">
                <StatusIcon status={status as Issue["status"]} />
                <span>{statusLabels[status]}</span>
                <span className="issue-group-count">{group.length}</span>
              </div>
              {group.map((issue) => (
                <div
                  key={issue.id}
                  className="issue-row"
                  onClick={() => onSelectIssue(issue)}
                >
                  <PriorityIcon priority={issue.priority} />
                  <span className="issue-identifier">{issue.identifier}</span>
                  <StatusIcon status={issue.status} />
                  <span className="issue-title">{issue.title}</span>
                  <span className="issue-date">
                    {formatDate(issue.created_at)}
                  </span>
                </div>
              ))}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div
            style={{
              padding: "40px 24px",
              textAlign: "center",
              color: "var(--text-secondary)",
            }}
          >
            No issues found. Create one to get started.
          </div>
        )}
      </div>
    </>
  );
}
