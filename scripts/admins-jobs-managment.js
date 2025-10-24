let totalJobs = document.getElementById("total-jobs");
let activeJobs = document.getElementById("active-jobs");
let inActiveJobs = document.getElementById("inactive-jobs");

let numberOfTotalJobs = 7;
let numberOfActiveJobs = 5;
let numberOfInactveJobs = 2;

totalJobs.textContent = numberOfTotalJobs
activeJobs.textContent = numberOfActiveJobs
inActiveJobs.textContent = numberOfInactveJobs



let jobsArea = document.querySelector(".jobs-area");
let jobs = [
    {
        jobName : "data Analytics",
        company: "Future Academy",
        status: "Active",
    },
    {
        jobName : "internship-cybersecurity",
        company: "Next Academy",
        status: "Active",
    },
    {
        jobName : "flutter",
        company: "Future Academy",
        status: "Active",
    },
    {
        jobName : "backend",
        company: "Next Academy",
        status: "Inactive",
    },
    {
        jobName : "frontend",
        company: "CLS",
        status: "Active",
    }
];

let jobStatus = document.querySelector(".job-status");
function displayJobs() {
        jobsArea.innerHTML = `
            <div class="d-flex border-bottom justify-content-between">
                <p style="width: 25%">NAME</p>
                <p style="width: 25%">COMPANY</p>
                <p style="width: 50%">STATUS</p>
                <p><p>
                <p>ACTIONS</p>
            </div>
            `
        // jobsArea.innerHTML = `
            
        for(let i = 0; i < jobs.length; i++) {
            
            jobsArea.innerHTML += 
            `
            <div class="d-flex justify-content-between border-bottom p-2" style="align-items-center !important">
                <p style="width: 25%" class="pt-2">${jobs[i].jobName}</p>
                <p style="width: 25%" class="pt-2">${jobs[i].company}</p>
                <p style="width: 25%" class="job-status pt-2">${jobs[i].status}</p>
                <button class="jobs-btn px-4 fw-bold border-1 border-secondary rounded bg-transparent">View Details</button>
                <button class="jobs-btn px-4 fw-bold border-1 border-secondary rounded bg-transparent">Deactive</button>
            </div>
            `
        }
    
}

window.onload = displayJobs();




let jobBtns = document.querySelectorAll(".job-btns");
jobBtns.forEach((jobBtn) => {
    jobBtn.addEventListener("click", function() {
        jobBtns.forEach(btn => btn.classList.remove("btn-job-active"));
        jobBtn.classList.add("btn-job-active")
        // displayJobs();
})
})