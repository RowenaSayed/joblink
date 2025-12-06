import React, { useEffect, useState } from "react";

export default function ViewCompanyProfile() {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const companyId = "692a5418d580651b42437e78";
    fetch(`https://joblink-server-app.vercel.app/api/company/${companyId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCompany(data.company);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!company) return <div>No company found</div>;

  return (
      <>
  
        <div className="container  py-5 px-3 px-md-4 mb-5">
  
          <div className="card cardContent shadow-sm w-100 mb-4">
            <div className="card-body">
              <div className="content d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                <div className="mb-3 mb-md-0">
                  <h5 className="card-title fw-bold">Company Information</h5>
                </div>
              </div>
  
              <hr />
  
              <div className="content">
                <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start mb-4">
                  <div className="position-relative">
                    <img
                      className="logo rounded shadow-sm"
                      src={company.logo}
                      alt="company logo"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
  
                <form >
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">
                        Company Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={company.name}
                        readOnly={true}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">Industry</label>
                      <input
                        type="text"
                        className="form-control"
                        name="industry"
                        value={company.industry}
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">Website</label>
                      <input
                        type="url"
                        className="form-control"
                        name="website"
                        value={company.website}
                        
                        placeholder="https://example.com"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={company.location}
                       
                        placeholder="City, Country"
                        readOnly
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Company Description
                      </label>
                      <textarea
                        className="form-control"
                        style={{ height: "150px", resize: "vertical" }}
                        name="description"
                        value={company.description}
                        
                        placeholder="Describe your company culture, mission, and values..."
                        readOnly
                      ></textarea>
                    </div>
  
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
  
      </>
    );
}
