import { useEffect, useState } from "react";
import {
  getSSBStages,
  createSSBStage,
  updateSSBStage,
  deleteSSBStage,
  getSSBTests,
  createSSBTest,
  updateSSBTest,
  deleteSSBTest,
  getSSBResources,
  createSSBResource,
  deleteSSBResource,
} from "../../../services/ssbService";

export default function SSBManager() {
  const [stages, setStages] = useState([]);
  const [tests, setTests] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editStage, setEditStage] = useState(null);
  const [editTest, setEditTest] = useState(null);

  const [stageForm, setStageForm] = useState({
    stageName: "",
    dayNumber: "",
    description: "",
  });
  const [testForm, setTestForm] = useState({
    testName: "",
    description: "",
    tips: "",
    stageId: "",
  });
  const [resourceForm, setResourceForm] = useState({
    title: "",
    description: "",
    url: "",
    resourceType: "PDF",
    stageId: "",
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [stagesRes, testsRes, resourcesRes] = await Promise.all([
        getSSBStages(),
        getSSBTests(),
        getSSBResources().catch(() => ({ data: [] })),
      ]);
      setStages(stagesRes.data || []);
      setTests(testsRes.data || []);
      setResources(resourcesRes.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ========== STAGE CRUD ==========
  const resetStageForm = () => {
    setStageForm({ stageName: "", dayNumber: "", description: "" });
    setEditStage(null);
  };

  const handleStageSubmit = async (e) => {
    e.preventDefault();
    if (!stageForm.stageName) return;

    try {
      const payload = {
        stageName: stageForm.stageName,
        dayNumber: parseInt(stageForm.dayNumber) || 0,
        description: stageForm.description,
      };

      if (editStage) {
        await updateSSBStage(editStage.id, payload);
        alert("Stage updated!");
      } else {
        await createSSBStage(payload);
        alert("Stage created!");
      }
      resetStageForm();
      loadData();
    } catch (err) {
      alert(err.response?.data || "Operation failed");
    }
  };

  const handleDeleteStage = async (id, name) => {
    if (!window.confirm(`Delete stage "${name}"?`)) return;
    try {
      await deleteSSBStage(id);
      loadData();
    } catch (err) {
      alert(err.response?.data || "Cannot delete stage with linked tests");
    }
  };

  // ========== TEST CRUD ==========
  const resetTestForm = () => {
    setTestForm({ testName: "", description: "", tips: "", stageId: "" });
    setEditTest(null);
  };

  const handleTestSubmit = async (e) => {
    e.preventDefault();
    if (!testForm.testName || !testForm.stageId) {
      alert("Test name and Stage are required");
      return;
    }

    try {
      const payload = {
        testName: testForm.testName,
        description: testForm.description,
        tips: testForm.tips,
        stage: { id: parseInt(testForm.stageId) },
      };

      if (editTest) {
        await updateSSBTest(editTest.id, payload);
        alert("Test updated!");
      } else {
        await createSSBTest(payload);
        alert("Test added!");
      }
      resetTestForm();
      loadData();
    } catch (err) {
      alert(err.response?.data || "Failed to add/update test");
    }
  };

  const handleDeleteTest = async (id, name) => {
    if (!window.confirm(`Delete test "${name}"?`)) return;
    try {
      await deleteSSBTest(id);
      loadData();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // ========== RESOURCE CRUD ==========
  const resetResourceForm = () => {
    setResourceForm({
      title: "",
      description: "",
      url: "",
      resourceType: "PDF",
      stageId: "",
    });
  };

  const handleResourceSubmit = async (e) => {
    e.preventDefault();
    if (!resourceForm.title || !resourceForm.url || !resourceForm.stageId) {
      alert("Title, URL, and Stage are required");
      return;
    }

    try {
      const payload = {
        title: resourceForm.title,
        description: resourceForm.description,
        url: resourceForm.url,
        resourceType: resourceForm.resourceType,
        stage: { id: parseInt(resourceForm.stageId) },
      };

      await createSSBResource(payload);
      alert("Resource added!");
      resetResourceForm();
      loadData();
    } catch (err) {
      alert(err.response?.data || "Failed to add resource");
    }
  };

  const handleDeleteResource = async (id, title) => {
    if (!window.confirm(`Delete resource "${title}"?`)) return;
    try {
      await deleteSSBResource(id);
      loadData();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const resourceTypes = [
    "PDF",
    "Video",
    "Website",
    "Document",
    "E-Book",
    "Lecture Notes",
  ];

  // Reads stage name from a nested stage object returned by the API
  const getStageName = (stageObj) => {
    if (!stageObj) return "—";
    return stageObj.stageName || `Stage ${stageObj.id}` || "—";
  };

  if (loading && stages.length === 0) {
    return <div className="admin-page">Loading SSB Data...</div>;
  }

  return (
    <div className="admin-page">
      <h2>SSB Command Center</h2>

      {/* ========== STAGES SECTION ========== */}
      <div className="admin-section">
        <h3>{editStage ? "Edit Stage" : "Add New Stage"}</h3>
        <form onSubmit={handleStageSubmit} className="admin-form-grid">
          <div className="admin-field">
            <label>Stage Name</label>
            <input
              type="text"
              placeholder="e.g., Screening Test"
              value={stageForm.stageName}
              onChange={(e) =>
                setStageForm({ ...stageForm, stageName: e.target.value })
              }
              required
            />
          </div>
          <div className="admin-field">
            <label>Day Number (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={stageForm.dayNumber}
              onChange={(e) =>
                setStageForm({ ...stageForm, dayNumber: e.target.value })
              }
            />
          </div>
          <div className="admin-field admin-field-span">
            <label>Description</label>
            <textarea
              rows="3"
              value={stageForm.description}
              onChange={(e) =>
                setStageForm({ ...stageForm, description: e.target.value })
              }
            />
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn-primary">
              {editStage ? "Update Stage" : "Create Stage"}
            </button>
            {editStage && (
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={resetStageForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-section">
        <h3>SSB Stages</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Stage Name</th>
                <th>Day</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stages.map((stage) => (
                <tr key={stage.id}>
                  <td>{stage.id}</td>
                  <td>{stage.stageName}</td>
                  <td>{stage.dayNumber || "-"}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => {
                        setEditStage(stage);
                        setStageForm({
                          stageName: stage.stageName,
                          dayNumber: stage.dayNumber || "",
                          description: stage.description || "",
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() =>
                        handleDeleteStage(stage.id, stage.stageName)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========== TESTS SECTION ========== */}
      <div className="admin-section">
        <h3>{editTest ? "Edit Test" : "Add New Test"}</h3>
        <form onSubmit={handleTestSubmit} className="admin-form-grid">
          <div className="admin-field">
            <label>Test Name</label>
            <input
              placeholder="e.g., TAT, WAT, SRT"
              value={testForm.testName}
              onChange={(e) =>
                setTestForm({ ...testForm, testName: e.target.value })
              }
              required
            />
          </div>
          <div className="admin-field">
            <label>Associated Stage</label>
            <select
              value={testForm.stageId}
              onChange={(e) =>
                setTestForm({ ...testForm, stageId: e.target.value })
              }
              required
            >
              <option value="">Select Stage</option>
              {stages.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.stageName}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-field admin-field-span">
            <label>Description</label>
            <textarea
              rows="3"
              value={testForm.description}
              onChange={(e) =>
                setTestForm({ ...testForm, description: e.target.value })
              }
            />
          </div>
          <div className="admin-field admin-field-span">
            <label>Tips</label>
            <textarea
              rows="2"
              value={testForm.tips}
              onChange={(e) =>
                setTestForm({ ...testForm, tips: e.target.value })
              }
            />
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn-primary">
              {editTest ? "Update Test" : "Add Test"}
            </button>
            {editTest && (
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={resetTestForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-section">
        <h3>Tests</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test.id}>
                  <td>{test.testName}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => {
                        setEditTest(test);
                        setTestForm({
                          testName: test.testName,
                          description: test.description || "",
                          tips: test.tips || "",
                          stageId: test.stage?.id || "",
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDeleteTest(test.id, test.testName)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========== RESOURCES SECTION ========== */}
      <div className="admin-section">
        <h3>Add New Resource (PDF, Video, Website)</h3>
        <form onSubmit={handleResourceSubmit} className="admin-form-grid">
          <div className="admin-field admin-field-span">
            <label>Title</label>
            <input
              placeholder="Resource title"
              value={resourceForm.title}
              onChange={(e) =>
                setResourceForm({ ...resourceForm, title: e.target.value })
              }
              required
            />
          </div>
          <div className="admin-field admin-field-span">
            <label>URL / Link</label>
            <input
              type="text"
              placeholder="https://..."
              value={resourceForm.url}
              onChange={(e) =>
                setResourceForm({ ...resourceForm, url: e.target.value })
              }
              required
            />
          </div>
          <div className="admin-field">
            <label>Associated Stage</label>
            <select
              value={resourceForm.stageId}
              onChange={(e) =>
                setResourceForm({ ...resourceForm, stageId: e.target.value })
              }
              required
            >
              <option value="">Select Stage</option>
              {stages.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.stageName}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-field">
            <label>Resource Type</label>
            <select
              value={resourceForm.resourceType}
              onChange={(e) =>
                setResourceForm({
                  ...resourceForm,
                  resourceType: e.target.value,
                })
              }
            >
              {resourceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-field admin-field-span">
            <label>Description</label>
            <textarea
              rows="2"
              value={resourceForm.description}
              onChange={(e) =>
                setResourceForm({
                  ...resourceForm,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn-primary">
              Add Resource
            </button>
          </div>
        </form>
      </div>

      <div className="admin-section">
        <h3>SSB Resources ({resources.length})</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((res) => (
                <tr key={res.id}>
                  <td>
                    {res.title}
                    <br />
                    <small>{res.description?.substring(0, 50)}</small>
                  </td>
                  <td>{res.resourceType}</td>
                  <td>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-edit"
                    >
                      View
                    </a>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDeleteResource(res.id, res.title)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
