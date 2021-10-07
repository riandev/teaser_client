import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { CSVLink } from "react-csv";

const LeadGenerate = () => {
  const [initialLeads, setInitialLeads] = useState([]);
  const [regenerate, setRegenerate] = useState([]);
  const [initialUpdateStatus, setInitialUpdateStatus] = useState(false);
  const [regenerateUpdateStatus, setRegenerateUpdateStatus] = useState(false);
  const [initialDate, setInitialDate] = useState("");
  const [regenDate, setRegenDate] = useState("");
  const manageInitialDate = (e) => {
    const d = new Date(e.target.value);
    let dt = d.getDate();
    let mn = d.getMonth() + 1;
    let yy = d.getFullYear();
    setInitialDate(
      yy + "-" + (mn <= 9 ? "0" + mn : mn) + "-" + (dt <= 9 ? "0" + dt : dt)
    );
  };

  const manageRegenDate = (e) => {
    const d = new Date(e.target.value);
    let dt = d.getDate();
    let mn = d.getMonth() + 1;
    let yy = d.getFullYear();
    setRegenDate(
      yy + "-" + (mn <= 9 ? "0" + mn : mn) + "-" + (dt <= 9 ? "0" + dt : dt)
    );
  };

  const generateInitial = () => {
    fetch("http://192.168.10.11:5030/initialLead?initDate=" + initialDate)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setInitialLeads(
          data
            .map((x) => {
              return [...x.initLeads];
            })
            .flat()
            .map((a) => {
              return { ...a, for_d: "d" };
            })
        );
      });
  };

  let headers = [
    { label: "ID", key: "ID" },
    { label: "data_date", key: "data_date" },
    { label: "r_name", key: "r_name" },
    { label: "Consumer_No", key: "Consumer_No" },
  ];

  const updateInitialLeads = () => {
    fetch("http://192.168.10.11:5030/updateInitialLead", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(initialLeads),
    })
      .then((res) => res.json())
      .then((data) => setInitialUpdateStatus(data));
  };

  const regenerateLeads = () => {
    fetch("http://192.168.10.11:5030/regenerate?regenDate=" + regenDate)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRegenerate(
          data
            .map((x) => {
              return [...x.newLead];
            })
            .flat()
            .map((a) => {
              return { ...a, for_d: "d" };
            })
        );
      });
  };

  const regenerateUpdate = () => {
    fetch("http://192.168.10.11:5030/regenerateUpdate", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regenerate),
    })
      .then((res) => res.json())
      .then((data) => setRegenerateUpdateStatus(data));
  };

  return (
    <div className="d-flex justify-content-around">
      <div>
        <h4 className="text-secondary">Process For Initial Lead</h4>
        <div className="mt-2">
          <Card style={{ width: "22rem" }}>
            <Card.Body>
              <h5 className="mt-3">Generate Initial Leads</h5>
              <input
                onChange={manageInitialDate}
                className="form-control"
                placeholder="yyyy/mm/dd"
                name="date"
                type="date"
                required
              />
              <div className="mt-3 d-flex justify-content-between">
                <button onClick={generateInitial} className="btn btn-primary">
                  Generate
                </button>
                <p>{initialLeads.length > 0 ? "Done" : "Pending"}</p>
              </div>
              <h5 className="mt-3">Update Initial Leads For CRM</h5>
              <div
                onClick={updateInitialLeads}
                className="mt-3 d-flex justify-content-between"
              >
                <button className="btn btn-info">Update</button>
                <p>
                  {initialUpdateStatus.message === true ? "Done" : "Pending"}
                </p>
              </div>
              <h5 className="mt-3">Download Initial Leads For Dialer</h5>
              <div className="mt-3 d-flex justify-content-between">
                <button className="btn btn-outline-primary">
                  <CSVLink
                    headers={headers}
                    title="Export data to CSV"
                    filename="JTI_Teaser_InitialLead.csv"
                    data={initialLeads}
                  >
                    Download
                  </CSVLink>
                </button>
                <p>{initialLeads.length > 0 ? "Ready" : "Pending"}</p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      {/* Regenerate Leads */}
      <div>
        <h4 className="text-secondary">Process For Regenerate Lead</h4>
        <div className="mt-2">
          <Card style={{ width: "28rem" }}>
            <Card.Body>
              <h5 className="mt-3">Regenerate Leads</h5>
              <input
                onChange={manageRegenDate}
                className="form-control"
                placeholder="yyyy/mm/dd"
                name="date"
                type="date"
                required
              />
              <div className="mt-3 d-flex justify-content-between">
                <button onClick={regenerateLeads} className="btn btn-primary">
                  Regenerate
                </button>
                <p>{regenerate.length > 0 ? "Done" : "Pending"}</p>
              </div>
              <h5 className="mt-3">Update Regenerated Leads For CRM</h5>
              <div className="mt-3 d-flex justify-content-between">
                <button onClick={regenerateUpdate} className="btn btn-info">
                  Update
                </button>
                <p>
                  {regenerateUpdateStatus.message === true ? "Done" : "Pending"}
                </p>
              </div>
              <h5 className="mt-3">Download Regenerated Leads For Dialer</h5>
              <div className="mt-3 d-flex justify-content-between">
                <button className="btn btn-outline-primary">
                  <CSVLink
                    headers={headers}
                    title="Export data to CSV"
                    filename="JTI_Teaser_regenerateLead.csv"
                    data={regenerate}
                  >
                    Download
                  </CSVLink>
                </button>
                <p>{regenerate.length > 0 ? "Ready" : "Pending"}</p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeadGenerate;
