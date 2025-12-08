function AvailableJobs ( {jobId, jobName, company, jobStatus} ) {
    return (
        <div className="d-flex justify-content-between border-bottom p-2 align-items-center flex-wrap flex-lg-nowrap">
            <p style={{width: "25%"}} className="pt-2">{jobName}</p>
            <p style={{width: "25%"}} className="pt-2">{company}</p>
            <p style={{width: "25%"}} className="job-status pt-2">{jobStatus}</p>
            <button className="jobs-btn px-4-lg px-2 fw-bold border-1 border-secondary rounded bg-transparent">View Details</button>
            <button className="jobs-btn px-4 fw-bold border-1 border-secondary rounded bg-transparent">Deactive</button>
        </div>
    )
}

export default AvailableJobs;