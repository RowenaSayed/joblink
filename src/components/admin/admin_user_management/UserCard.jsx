function UserCard () {
    const jobsData = [
        { id: 1, jobTitle: 'Total Jobs', numberOfJobs: 7, jobIcon: 'bi bi-calendar'},
        { id: 2, jobTitle: 'Active Jobs', numberOfJobs: 5, jobIcon: 'bi bi-shield-check'},
        { id: 3, jobTitle: 'Inactive Jobs', numberOfJobs: 2, jobIcon: 'bi bi-shield-x'},
    ]
    return (
        <>
            {
                jobsData.map(job => (
                    <div key={job.id} className="col">
                        <div className="jobs-status border border-secondary rounded rounded-4 p-4 d-flex align-items-start justify-content-between modern-shadow">
                            <div className="d-flex flex-column">
                                <p>{job.jobTitle}</p>
                                <p className="fw-bold fs-2" title="total jobs">{job.numberOfJobs}</p>
                            </div>
                            <div>
                                <i className={job.jobIcon}></i>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
export default UserCard;
