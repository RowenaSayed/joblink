function TimeSlots() {
const hours = [];

    for (let h = 0; h < 24; h++) {
        const date = new Date();
        date.setHours(h, 0, 0, 0);

        const formatted = date.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
        });

        hours.push(formatted);
    }
    const amHours = hours.filter((time) => time.includes("AM"));
    const pmHours = hours.filter((time) => time.includes("PM"));
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();
    const today = date.getDay()

    return (
        <fieldset className="row w-100">
            <legend className="mb-3"><b>Available Slots for {days[today]}:</b></legend>

            <div className="row row-cols-lg-2 row-cols-1 border rounded p-3 ms-2">

                <div>
                    {
                        amHours.map((time) => (
                            <label key={time} style={{ display: "flex", alignItems: "center", gap: "10px", outline: "1px solid #284c8a", margin: "10px 0", cursor: "pointer" }} className="p-2 rounded time-box">
                                <input type="checkbox" className="form-check-input mt-0" value={time} />
                                {time}
                            </label>
                        ))
                    }
                </div>

                <div>
                    {
                        pmHours.map((time) => (
                            <label key={time} style={{ display: "flex", alignItems: "center", gap: "10px", outline: "1px solid #284c8a", margin: "10px 0", cursor: "pointer" }} className="p-2 rounded time-box">
                                <input type="checkbox" className="form-check-input mt-0" value={time} />
                                {time}
                            </label>
                        ))
                    }
                </div>

            </div>
        </fieldset>

    );
}

function Main() {
return (
    <>
    <main className="col-lg-6 col-12">
        <form className="mw-100">
            <TimeSlots />

            <div className="d-flex flex-column border rounded mt-5 p-4">
                <label className="form-label"> Name:</label>
                <input type="text" name="name" className="form-control" required />

                <label className="form-label"> Email:</label>
                <input type="email" name="email" className="mb-2 form-control" required />

                <label className="form-label">Notes:</label>
                <textarea name="notes" className="mb-4 form-control"></textarea>

                <button type="submit" className="btn btn-primary mb-3">Submit</button>
            </div>
        </form>
    </main>
    </>
);
}

export default Main;
