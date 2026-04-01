import { Issue } from "../types/issue";

const priorityColors: Record<Issue["priority"], string> = {
  urgent: "var(--priority-urgent)",
  high: "var(--priority-high)",
  medium: "var(--priority-medium)",
  low: "var(--priority-low)",
  none: "var(--priority-none)",
};

export default function PriorityIcon({
  priority,
  size = 16,
}: {
  priority: Issue["priority"];
  size?: number;
}) {
  if (priority === "urgent") {
    return (
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 2,
            background: "var(--priority-urgent)",
          }}
        />
      </div>
    );
  }

  if (priority === "none") {
    return (
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <line
            x1="3"
            y1="12"
            x2="13"
            y2="12"
            stroke={priorityColors.none}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="2 2"
          />
        </svg>
      </div>
    );
  }

  const barHeights = [3, 5, 8, 11];
  const filled =
    priority === "high" ? 3 : priority === "medium" ? 2 : priority === "low" ? 1 : 0;
  const color = priorityColors[priority];

  return (
    <div
      className="priority-bars"
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {barHeights.map((h, i) => (
        <span
          key={i}
          className="priority-bar"
          style={{
            height: h,
            background: i < filled ? color : "var(--border-color)",
          }}
        />
      ))}
    </div>
  );
}
