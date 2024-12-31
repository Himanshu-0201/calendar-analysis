import { useSelector } from "react-redux";
import CheckBox from "../../Ui/CheckBox/CheckBox.tsx";



const Table = ({ events, importantUrgentCheckedBoxChangeHandler }) => {

    const tableEventsData = events ? events : [];


    const tableDate = tableEventsData.map((event, index) => {
        return (
            <tr key={index}>
                <td className="border border-slate-300 text-center p-4">{event.eventName}</td>
                <td className="border border-slate-300 text-center p-4">{event.totalTimeSpend}</td>
                <td className="border border-slate-300 text-center p-4">  {/* Important */}
                    <CheckBox
                        isChecked={event.isImportant}
                        onChange={(e) => { importantUrgentCheckedBoxChangeHandler(e, event.eventName, "important") }}
                    />
                </td>
                <td className="border border-slate-300 text-center p-4"> {/* Urgent */}
                    <CheckBox
                        isChecked={event.isUrgent}
                        onChange={(e) => { importantUrgentCheckedBoxChangeHandler(e, event.eventName, "urgent") }}
                    />
                </td>
            </tr>
        )
    })

    return (

        (
            tableEventsData.length > 0 ? (
                <table className="min-w-full border-collapse border border-slate-400 _table">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-slate-300 text-center p-4">Activity</th>
                            <th className="border border-slate-300 text-center p-4">Duration</th>
                            <th className="border border-slate-300 text-center p-4">Important</th>
                            <th className="border border-slate-300 text-center p-4">Urgent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableDate}
                    </tbody>
                </table>
            ) :
                (<p className="text-center p-4 text-gray-500 border border-slate-300">No events available to display.</p>)
        )
    );

}


export default Table;