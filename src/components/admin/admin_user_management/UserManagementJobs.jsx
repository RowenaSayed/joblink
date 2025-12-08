import AvailableJobs from './AvailableJobsUserManagement';
import UserManagementFilter from './UserManagementFilter';
function UserManagementJobs () {
    const jobs = [
        { jobName : "data Analytics", company: "Future Academy", jobStatus: "Active" },
        { jobName : "internship-cybersecurity", company: "Next Academy", jobStatus: "Active" },
        { jobName : "flutter", company: "Future Academy", jobStatus: "Active" },
        { jobName : "backend", company: "Next Academy", jobStatus: "Inactive" },
        { jobName : "frontend", company: "CLS", jobStatus: "Active" }
    ];
    return (
        <section className='mt-5'>
            <UserManagementFilter />
            <div className="jobs-area border border-secondary rounded pt-3 px-3">
                <div className='d-flex w-100 ps-4 border-bottom flex-wrap'>
                    <p style={{width: "25%"}} className='text-start'>NAME</p>
                    <p style={{width: "25%"}} className='text-start'>COMPANY</p>
                    <p style={{width: "25%"}} className='text-start ps-4'>STATUS</p>
                    <p style={{width: "25%"}} className='text-center'>ACTIONS</p>
                </div>
                {
                    jobs.map((job, idx) => (
                        <AvailableJobs 
                            key={idx}
                            jobName={job.jobName}
                            company={job.company}
                            jobStatus={job.jobStatus}
                        />
                    ))
                }
            </div>
            <div className="d-flex justify-content-center mx-auto my-5 align-items-center w-50">
                    <div id="prev" className="btn"><i className="bi bi-chevron-left"></i>Previous</div>
                    <div>
                        <button className="jobs-btns bg-transparent border border-secondary rounded btn-job-active py-2 px-3 me-2" style={{padding: "7px 15px"}}>1</button>
                        <button className="jobs-btns bg-transparent border border-secondary rounded py-2 px-3" style={{padding: "7px 15px"}}>2</button>
                    </div>
                    <div id="next" className="btn">Next<i className="bi bi-chevron-right"></i></div>
            </div>
        </section>
    )
}

export default UserManagementJobs;