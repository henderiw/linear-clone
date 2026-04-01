import { useState, useEffect, useCallback } from "react";
import { Issue } from "./types/issue";
import { fetchIssues, createIssue, updateIssue, deleteIssue } from "./api";
import Sidebar from "./components/Sidebar";
import TeamView from "./components/TeamView";
import IssueDetail from "./components/IssueDetail";
import CreateIssueModal from "./components/CreateIssueModal";

type View = "list" | "detail";

export default function App() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [view, setView] = useState<View>("list");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "backlog">(
    "all"
  );

  const loadIssues = useCallback(async () => {
    try {
      const data = await fetchIssues();
      setIssues(data);
    } catch (err) {
      console.error("Failed to load issues:", err);
    }
  }, []);

  useEffect(() => {
    loadIssues();
  }, [loadIssues]);

  const handleSelectIssue = (issue: Issue) => {
    setSelectedIssue(issue);
    setView("detail");
  };

  const handleBack = () => {
    setView("list");
    setSelectedIssue(null);
    loadIssues();
  };

  const handleCreateIssue = async (data: {
    title: string;
    description: string;
    status: Issue["status"];
    priority: Issue["priority"];
  }) => {
    await createIssue(data);
    await loadIssues();
  };

  const handleUpdateIssue = async (
    identifier: string,
    data: Partial<Issue>
  ) => {
    const updated = await updateIssue(identifier, data);
    setSelectedIssue(updated);
    await loadIssues();
  };

  const handleDeleteIssue = async (identifier: string) => {
    await deleteIssue(identifier);
    handleBack();
  };

  return (
    <div className="app-layout">
      <Sidebar onCreateClick={() => setShowCreateModal(true)} />
      <div className="main-content">
        {view === "list" ? (
          <TeamView
            issues={issues}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onSelectIssue={handleSelectIssue}
            onCreateClick={() => setShowCreateModal(true)}
          />
        ) : selectedIssue ? (
          <IssueDetail
            issue={selectedIssue}
            onBack={handleBack}
            onUpdate={handleUpdateIssue}
            onDelete={handleDeleteIssue}
          />
        ) : null}
      </div>
      {showCreateModal && (
        <CreateIssueModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateIssue}
        />
      )}
    </div>
  );
}
