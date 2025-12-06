function JobManagementCards() {

    return (
        <>
            {
                jobsStatusData.map((job) => {
                    return (
                        <>
                            <div className="jobs-status border border-secondary rounded p-4 d-flex align-items-start justify-content-between">
                                <div className="d-flex flex-column">
                                    <p>{job.title}</p>
                                    <p className="fw-bold fs-2">{job.count}</p>
                                </div>
                                <div>
                                    <i className={job.icon}></i>
                                </div>
                            </div>
                        </>
                    )
                })
            }
        </>
    )
}

export default JobManagementCards;