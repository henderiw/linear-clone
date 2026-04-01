import express from "express";
import cors from "cors";
import pool, { initDb, getNextIdentifier } from "./db";

const app = express();
const PORT = parseInt(process.env.PORT || "3001");

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// List all issues
app.get("/api/issues", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM issues ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch issues" });
  }
});

// Get single issue
app.get("/api/issues/:identifier", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM issues WHERE identifier = $1",
      [req.params.identifier]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Issue not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch issue" });
  }
});

// Create issue
app.post("/api/issues", async (req, res) => {
  try {
    const { title, description, status, priority, assignee, labels, project } =
      req.body;
    const identifier = await getNextIdentifier();
    const result = await pool.query(
      `INSERT INTO issues (identifier, title, description, status, priority, assignee, labels, project)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        identifier,
        title,
        description || "",
        status || "backlog",
        priority || "none",
        assignee || "",
        labels || [],
        project || "",
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create issue" });
  }
});

// Update issue
app.patch("/api/issues/:identifier", async (req, res) => {
  try {
    const fields = req.body;
    const setClauses: string[] = [];
    const values: any[] = [];
    let i = 1;

    for (const [key, value] of Object.entries(fields)) {
      if (
        [
          "title",
          "description",
          "status",
          "priority",
          "assignee",
          "labels",
          "project",
        ].includes(key)
      ) {
        setClauses.push(`${key} = $${i}`);
        values.push(value);
        i++;
      }
    }

    if (setClauses.length === 0) {
      res.status(400).json({ error: "No valid fields to update" });
      return;
    }

    setClauses.push(`updated_at = NOW()`);
    values.push(req.params.identifier);

    const result = await pool.query(
      `UPDATE issues SET ${setClauses.join(", ")} WHERE identifier = $${i} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Issue not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update issue" });
  }
});

// Delete issue
app.delete("/api/issues/:identifier", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM issues WHERE identifier = $1 RETURNING *",
      [req.params.identifier]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Issue not found" });
      return;
    }
    res.json({ deleted: true, issue: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete issue" });
  }
});

async function start() {
  await initDb();

  // Seed sample data if empty
  const count = await pool.query("SELECT COUNT(*) FROM issues");
  if (parseInt(count.rows[0].count) === 0) {
    const id1 = await getNextIdentifier();
    const id2 = await getNextIdentifier();
    await pool.query(
      `INSERT INTO issues (identifier, title, description, status, priority) VALUES
       ($1, 'Sample Issue 1', 'This is a sample issue for testing.', 'backlog', 'urgent'),
       ($2, 'Sample Issue 2', 'Another sample issue.', 'backlog', 'none')`,
      [id1, id2]
    );
    console.log(`Seeded sample issues: ${id1}, ${id2}`);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend running on http://0.0.0.0:${PORT}`);
  });
}

start().catch(console.error);
