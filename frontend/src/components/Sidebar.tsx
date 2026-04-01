interface SidebarProps {
  onCreateClick: () => void;
}

export default function Sidebar({ onCreateClick }: SidebarProps) {
  return (
    <nav className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-item" style={{ marginBottom: 8 }}>
          <span style={{ width: 20, height: 20, borderRadius: 4, background: '#2d2d35', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="white">
              <path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" opacity="0.8" />
            </svg>
          </span>
          <span style={{ fontSize: 13, fontWeight: 500 }}>Transparent...</span>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-item">
          <span className="sidebar-item-icon">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="3" width="12" height="10" rx="1.5" />
              <path d="M2 6h12" />
            </svg>
          </span>
          <span>Inbox</span>
          <span className="sidebar-badge">6</span>
        </div>
        <div className="sidebar-item">
          <span className="sidebar-item-icon">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="8" cy="5" r="3" />
              <path d="M2 14c0-3 2.5-5 6-5s6 2 6 5" />
            </svg>
          </span>
          <span>My Issues</span>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Workspace</div>
        <div className="sidebar-item">
          <span className="sidebar-item-icon">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M8 3v10" />
            </svg>
          </span>
          <span>Initiatives</span>
        </div>
        <div className="sidebar-item">
          <span className="sidebar-item-icon">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="12" height="12" rx="2" />
            </svg>
          </span>
          <span>Projects</span>
        </div>
        <div className="sidebar-item">
          <span className="sidebar-item-icon">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="8" cy="8" r="5" />
              <circle cx="8" cy="8" r="1.5" />
            </svg>
          </span>
          <span>Views</span>
        </div>
        <div className="sidebar-item">
          <span className="sidebar-item-icon">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="4" cy="8" r="1.5" />
              <circle cx="8" cy="8" r="1.5" />
              <circle cx="12" cy="8" r="1.5" />
            </svg>
          </span>
          <span>More</span>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Favorites</div>
        <div className="sidebar-item">
          <span className="sidebar-team-dot" style={{ background: "#ff9800" }} />
          <span>Tadas's Issues</span>
        </div>
        <div className="sidebar-item">
          <span className="sidebar-team-dot" style={{ background: "#9c27b0" }} />
          <span>Ready To Assign</span>
        </div>
        <div className="sidebar-item">
          <span className="sidebar-team-dot" style={{ background: "#e91e63" }} />
          <span>Non-ideas - Unassig...</span>
        </div>
        <div className="sidebar-item">
          <span className="sidebar-team-dot" style={{ background: "#2196f3" }} />
          <span>Ideas</span>
        </div>
        <div className="sidebar-item">
          <span className="sidebar-team-dot" style={{ background: "#888899" }} />
          <span>Mike's Issues</span>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Your teams</div>
        <div className="sidebar-item">
          <span className="sidebar-team-dot" style={{ background: "#5e6ad2" }} />
          <span>Pulse</span>
        </div>
        <div className="sidebar-item" style={{ fontWeight: 500 }}>
          <span className="sidebar-team-dot" style={{ background: "#4caf50" }} />
          <span>Sandbox</span>
          <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-muted)' }}>&#9662;</span>
        </div>
        <div className="sidebar-item active" style={{ paddingLeft: 28 }}>
          <span>Issues</span>
        </div>
        <div className="sidebar-item" style={{ paddingLeft: 28 }}>
          <span>Projects</span>
        </div>
        <div className="sidebar-item" style={{ paddingLeft: 28 }}>
          <span>Views</span>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Try</div>
        <div className="sidebar-item">
          <span className="sidebar-item-icon">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="8" cy="8" r="6" />
              <path d="M8 4v4l2.5 2.5" />
            </svg>
          </span>
          <span>Cycles</span>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div className="sidebar-section">
        <button
          className="sidebar-item"
          onClick={onCreateClick}
          style={{ width: "100%", textAlign: "left" }}
        >
          <span className="sidebar-item-icon" style={{ color: "var(--accent-blue)" }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3v10M3 8h10" />
            </svg>
          </span>
          <span style={{ color: "var(--accent-blue)" }}>New Issue</span>
        </button>
      </div>
    </nav>
  );
}
