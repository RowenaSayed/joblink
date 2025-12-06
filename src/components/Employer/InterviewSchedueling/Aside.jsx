import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function Aside() {
const [date, setDate] = useState(new Date());

return (
    <aside style={{ height: "100vh" }} className="col-5 d-flex flex-column p-4 border rounded border-success interview-sidebar">
        <div className="mx-auto">
            <div className="schedule-overview-title">
                <h2 className="fw-bold">Schedule Overview</h2>
                <p className="text-secondary">Manage your calendar and candidates.</p>
                </div>

                <div>
                <h4>Select Date</h4>
                <Calendar
                    onChange={setDate}
                    value={date}
                />
                <p className="mt-2">Selected Date: {date.toDateString()}</p>
            </div>
        </div>
    </aside>
);
}

export default Aside;
