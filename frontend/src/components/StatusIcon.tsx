import { Issue } from "../types/issue";

export default function StatusIcon({
  status,
  size = 14,
}: {
  status: Issue["status"];
  size?: number;
}) {
  if (status === "done") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 14 14"
        fill="none"
        style={{ flexShrink: 0 }}
      >
        <circle cx="7" cy="7" r="6.5" fill="var(--status-done)" />
        <path
          d="M4 7l2.2 2.2L10 5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <span
      className={`issue-status-icon ${status}`}
      style={{ width: size, height: size }}
    />
  );
}
