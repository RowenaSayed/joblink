import UserCard from "./UserCard";
function NumberOfUsers () {
    return (
        <section className="d-flex flex-column ">
            <div className="d-flex justify-content-sm-start justify-content-center mb-3">
                <h3 className="fw-bold">User Management</h3>
            </div>
            <div className="row row-cols-lg-4 row-cols-1 gap-5">
                <UserCard />
            </div>
        </section>
    )
}

export default NumberOfUsers;