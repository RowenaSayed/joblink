import NumberOfUsers from "../../components/admin/admin_user_management/NumberOfUsers";
import UserManagementJobs from "../../components/admin/admin_user_management/UserManagementJobs";
import '../../assets/CSS/admin_user_managemanet.css'
export default function UserManagement() {
  return (
    <main className="mt-5">
      <div className="admins-jobs-managment-container">
        <NumberOfUsers />
        <UserManagementJobs />
      </div>
    </main>
  );
}
