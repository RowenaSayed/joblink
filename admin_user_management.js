let totalJobs = document.getElementById("total-jobs");
let activeJobs = document.getElementById("active-jobs");
let inActiveJobs = document.getElementById("inactive-jobs");

let numberOfTotalJobs = 7;
let numberOfActiveJobs = 5;
let numberOfInactveJobs = 2;

totalJobs.textContent = numberOfTotalJobs;
activeJobs.textContent = numberOfActiveJobs;
inActiveJobs.textContent = numberOfInactveJobs;

let jobsArea = document.querySelector(".jobs-area");
let jobs = [
  {
    jobName: "data Analytics",
    email: "alice.j@example.com",
    role: "Employer",
    status: "Active",
  },
  {
    jobName: "internship-cybersecurity",
    email: "bob.s@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    jobName: "flutter",
    email: "charlie.b@example.com",
    role: "Job Seeker",
    status: "Active",
  },
  {
    jobName: "backend",
    email: "diana.m@example.com",
    role: "Employer",
    status: "Inactive",
  },
  {
    jobName: "frontend",
    email: "eve.d@example.com",
    role: "Job Seeker",
    status: "Active",
  },
  {
    jobName: "flutter",
    email: "charlie.b@example.com",
    role: "Job Seeker",
    status: "Active",
  },
];

let jobStatus = document.querySelector(".job-status");
function displayJobs() {
  jobsArea.innerHTML = `
         <div class="d-flex border-bottom justify-content-between">
            <p class="text-center name col">NAME</p>
            <p class="text-center email col">EMAIL</p>
            <p class="text-center role col">ROLE</p>
            <p class="text-center status col">STATUS</p>
            <p class="action col">ACTIONS</p>
        </div>`;
  // jobsArea.innerHTML = `
  jobs.forEach((element) => {
    jobsArea.innerHTML += `
       <div class="d-flex justify-content-between border-bottom p-2 align-items-center">
                <p class="pt-2 text-center name col">${element.jobName}</p>
                <p class="pt-2 text-center email col">${element.email}</p>
                <p class="pt-2 text-center role col">${element.role}</p>
                <p class="job-status pt-2 text-center status col">${element.status}</p>
                <div class="action col">
                    <button class="jobs-btn p-lg-2 px-sm-1 fw-bold border-1 border-secondary rounded bg-transparent my-sm-2">View Details</button>
                    <button class="jobs-btn p-lg-2 px-sm-1 fw-bold  border-1 border-secondary rounded bg-transparent my-sm-2">Deactive</button>
                </div>
            </div>
            `;
  });
}

window.onload = displayJobs();

let jobBtns = document.querySelectorAll(".job-btns");
jobBtns.forEach((jobBtn) => {
  jobBtn.addEventListener("click", function () {
    jobBtns.forEach((btn) => btn.classList.remove("btn-job-active"));
    jobBtn.classList.add("btn-job-active");
    // displayJobs();
  });
});
