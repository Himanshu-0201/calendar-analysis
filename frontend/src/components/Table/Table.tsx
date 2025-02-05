import React from "react";
import CheckBox from "../../Ui/CheckBox/CheckBox.tsx";


type TableProps = {
    events: {
        eventName: string,
        totalTimeSpend: string,
        isImportant: boolean,
        isUrgent: boolean
    }[],
    importantUrgentCheckedBoxChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, eventName: string, type: string) => void,
    rowClickHandler: (eventName: string) => void
}

const Table: React.FC<TableProps> = ({ events, importantUrgentCheckedBoxChangeHandler, rowClickHandler }) => {

    const clickHandler = (e: React.MouseEvent<HTMLTableRowElement>, title: string) => {

        const target = e.target as HTMLInputElement; // Type assertion
        if (target.type || target.type === "checkbox") return;

        rowClickHandler(title)

    }

    const tableEventsData = events ? events : [];


    const tableDate = tableEventsData.map((event, index) => {
        return (
            <tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={(e) => { clickHandler(e, event.eventName); }}>
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

                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-slate-400 _table text-sm sm:text-base">
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
                </div>
            ) :
                (<p className="text-center p-4 text-gray-500 border border-slate-300">No events available to display.</p>)
        )
    );

}


export default Table;