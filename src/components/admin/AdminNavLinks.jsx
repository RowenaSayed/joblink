function AdminNavLinks() {
    return (
        <ul className="navbar-nav mx-auto gap-lg-2">
            <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/admin/user-management">User Mangement</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/admin/job-management">Job Mangement</Link>
            </li>
            
        </ul>
    )
}

export default AdminNavLinks;