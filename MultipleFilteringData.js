import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";

const BrPostApi = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState({
    applicationType: "",
    applicantName: "",
    district: "",
    localityName: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await axios.post(
      "https://backend.ts-bpass.com/api/v1/citizen_search/search_by_params",
      {},
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    console.log(data.data.data);
    setApplications(data.data.data.applications);
  };

  const changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const clickSearchApplications = () => {
    console.log(search);
    const filteredApplications = applications.filter(
      (each) =>
        (search.applicationType
          ? each.application_type === search.applicationType
          : true) &&
        (search.applicantName
          ? each.applicant_name === search.applicantName
          : true) &&
        (search.district ? each.district_name === search.district : true) &&
        (search.localityName ? each.locality === search.localityName : true)
    );
    console.log(filteredApplications);
    setApplications(filteredApplications);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome to Website</h1>
      <div>
        <input
          type="text"
          className="m-2"
          placeholder="Application Type"
          name="applicationType"
          value={search.applicationType}
          onChange={changeHandler}
        />
        <input
          type="text"
          className="m-2"
          placeholder="Applicant Name"
          name="applicantName"
          value={search.applicantName}
          onChange={changeHandler}
        />
        <input
          type="text"
          className="m-2"
          placeholder="District"
          name="district"
          value={search.district}
          onChange={changeHandler}
        />
        <input
          type="text"
          className="m-2"
          placeholder="Locality"
          name="localityName"
          value={search.localityName}
          onChange={changeHandler}
        />
        <button
          className="btn btn-primary m-2"
          onClick={clickSearchApplications}
        >
          Search
        </button>
      </div>
      <Table applications={applications} />
      {/* {applications.map((each, index) => (
        <h1 key={index}> {each.application_id}</h1>
      ))} */}
    </div>
  );
};
export default BrPostApi;
