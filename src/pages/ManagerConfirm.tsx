import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "../utils/notification";
interface TableRow {
  id: number;
  name: string;
  description: string;
  confirmation: boolean;
  approved: boolean;
}

const initialTableData: TableRow[] = [
  {
    id: 1,
    name: "PQM_Complaint FA Engineer",
    description: "Description for continue using license",
    confirmation: true,
    approved: false,
  },
  {
    id: 2,
    name: "PQM_Complaint Quality Analyst",
    description: "Description for continue using license",
    confirmation: true,
    approved: false,
  },
  {
    id: 3,
    name: "PQM_Dresden PEs",
    description: "Description for continue using license",
    confirmation: true,
    approved: false,
  },
];

export default function ManagerConfirm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = () => {
    console.log();
    setSubmitted(true);
    //Send data to backend here
    Toast.notifySuccess("Submitted successfully!");
    reset();
  };

  const [tableData, setTableData] = useState<TableRow[]>(initialTableData);

  const handleApprovedChange = (id: number) => {
    const updatedTableData = tableData.map((row) =>
      row.id === id ? { ...row, approved: !row.approved } : row
    );
    setTableData(updatedTableData);
  };
  return (
    <div className="container">
      <h5 className="py-3 pl-3">MANAGER CONFIRMATION PAGE</h5>
      {submitted ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <h1 className="">Thank you for your time!</h1>
        </div>
      ) : (
        <>
          <div className="container-fluid">
            <div className="row">
              <p className="col-md-2">NAME: </p>
              <p className="col-md-10">TERRY QUINLIVAN</p>
            </div>
            <div className="row">
              <p className="col-md-2">TITLE: </p>
              <p className="col-md-10">Sr Mgr, IT</p>
            </div>
            <div className="row">
              <p className="col-md-2"> DEPARTMENT: </p>
              <p className="col-md-10">
                {" "}
                REA/DO(ISD, Software & Digitalization)/ISD
              </p>
            </div>
            <div className="row fw-bold">
              <p className="col-md-2 font-weight-bold "> NOTES: </p>
              <p className="col-md-10 font-weight-bold">
                {" "}
                Please ensure accurate confirmation based on your current role
                and responsibilities. Your confirmation will assist in
                maintaining accurate user group privileges.
              </p>
            </div>
          </div>
          {/* ----------------------------------------------------------------- */}
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header d-flex" id="flush-headingOne">
                <button
                  className="accordion-button collapsed d-flex"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  <span className="text-success px-3" style={{fontSize:'0.7rem'}}>SUBMITTED</span>
                  <div className="fw-bold col-2">AN PHAM</div>
                  <span className="mx-5 col-2">IT ANALYST</span>
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body" >
                  {/* Content here */}
                  <table className="table">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">#</th>
                        <th scope="col">LICENSE NAME</th>
                        <th scope="col">DESCRIPTION</th>
                        <th scope="col">CONFIRMATION</th>
                        <th scope="col">APPROVED</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row) => (
                        <tr key={row.id} className="text-center">
                          <th scope="row">{row.id}</th>
                          <td>{row.name}</td>
                          <td>{row.description}</td>
                          <td className="text-center">
                            <input
                              type="checkbox"
                              checked={row.confirmation}
                              readOnly
                            />
                          </td>
                          <td className="text-center">
                            <input
                              type="checkbox"
                              checked={row.approved}
                              onChange={() => handleApprovedChange(row.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Accordion 2 */}
            <div className="accordion-item">
              <h2 className="accordion-header d-flex" id="flush-headingTwo">
                <button
                  className="d-flex accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  <span className="text-success px-3" style={{fontSize:'0.7rem'}}>SUBMITTED</span>
                  <div className="fw-bold col-2 ">THINH NGUYEN</div>
                  <div className="mx-5 col-2">IT ANALYST</div>
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body" >
                  {/* Another table or content here */}
                  {/* Content here */}
                  <table className="table">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">#</th>
                        <th scope="col">LICENSE NAME</th>
                        <th scope="col">DESCRIPTION</th>
                        <th scope="col">CONFIRMATION</th>
                        <th scope="col">APPROVED</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row) => (
                        <tr key={row.id} className="text-center">
                          <th scope="row">{row.id}</th>
                          <td>{row.name}</td>
                          <td>{row.description}</td>
                          <td className="text-center">
                            <input
                              type="checkbox"
                              checked={row.confirmation}
                              readOnly
                            />
                          </td>
                          <td className="text-center">
                            <input
                              type="checkbox"
                              checked={row.approved}
                              onChange={() => handleApprovedChange(row.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Accordion 3 */}
            <div className="accordion-item">
              <h2 className="accordion-header d-flex" id="flush-heading3">
                <button
                  className="d-flex accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapse3"
                  aria-expanded="false"
                  aria-controls="flush-collapse3"
                >
                  <span className="text-danger px-3" style={{fontSize:'0.7rem'}}>NO SUBMITTED</span>
                  <div className="fw-bold col-2">TIN NGUYEN</div>
                  <div className="mx-5 col-2">IT ANALYST</div>
                </button>
              </h2>
              <div
                id="flush-collapse3"
                className="accordion-collapse collapse"
                aria-labelledby="flush-heading3"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body" >
                  {/* Another table or content here */}
                  {/* Content here */}
                  <table className="table">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">#</th>
                        <th scope="col">LICENSE NAME</th>
                        <th scope="col">DESCRIPTION</th>
                        <th scope="col">CONFIRMATION</th>
                        <th scope="col">APPROVED</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row) => (
                        <tr key={row.id} className="text-center">
                          <th scope="row">{row.id}</th>
                          <td>{row.name}</td>
                          <td>{row.description}</td>
                          <td className="text-center">
                            <input
                              type="checkbox"
                              checked={!row.confirmation}
                              readOnly
                            />
                          </td>
                          <td className="text-center">
                            <input
                              type="checkbox"
                              checked={row.approved}
                              onChange={() => handleApprovedChange(row.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="container mt-5 pt-5">
            <div className="container d-flex ">
               <input type="checkbox" className="text-center mx-3" />
               <div className="">I have reviewed the confirmation details and made necessary approvals/rejections.</div>
            </div>
            <div className="d-flex justify-content-end">
               <button className="btn btn-primary px-4" onClick={onSubmit}>
                SUBMIT
               </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
