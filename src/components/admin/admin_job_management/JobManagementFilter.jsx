function JobManagementFilter () {
    return (
        <div className="d-flex gap-3">
            <div>
                <label htmlFor="filter-by-name" className="fw-bold mb-1">Filter by name</label>
                <div className="dropdown mb-5" id="filter-by-name">
                    <button className="btn btn-transparent border border-secondary rounded dropdown-toggle text-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Select role
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">data analytics</a></li>
                        <li><a className="dropdown-item" href="#">cybersecurity</a></li>
                        <li><a className="dropdown-item" href="#">flutter</a></li>
                        <li><a className="dropdown-item" href="#">backend</a></li>
                        <li><a className="dropdown-item" href="#">frontend</a></li>
                    </ul>
                </div>
            </div>
            <div>
                <label htmlFor="filter-by-status" className="fw-bold mb-1">Filter by status</label>
                <div className="dropdown" id="filter-by-status">
                    <button className="btn btn-transparent border border-secondary rounded dropdown-toggle text-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Select status
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Active</a></li>
                        <li><a className="dropdown-item" href="#">Inactive</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default JobManagementFilter;