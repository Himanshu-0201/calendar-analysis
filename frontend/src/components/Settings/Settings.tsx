
import React, { FormEvent } from "react";
import { Form } from "react-router-dom"; // Replace "some-library" with the actual library or file path
import { FaEdit } from "react-icons/fa";
import OverLay from "../../Ui/Overlay/Overlay.tsx";
import axios from "axios";
import { update_user_info_url } from "../../config.js";
import { useError } from "../../hooks/useError.ts";
import SettingsLoader from "../../Ui/Loader/SettingLoader.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store.ts";
import { updateUserSettings } from "../../features/userInfoSlice/userInfoSlice.ts";

interface SettingsProps {
    onCloseSettings: () => void;
}


const Settings: React.FC<SettingsProps> = ({ onCloseSettings }) => {

    const userEmail = useSelector((state: RootState) => state.userInfo.userEmail);
    const reportSubscriptionEmail = useSelector((state: RootState) => state.userInfo.reportSubscriptionEmail);
    const reportSubscriptionStatue = useSelector((state: RootState) => state.userInfo.reportSubscriptionStatue);

    const dispatch = useDispatch();

    const [isReportEmailEnabled, setIsReportEmailEnabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const { throwError = (error: any) => console.error("throwError is undefined", error) } = useError();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const reportSubscriptionEmail = (e.target as HTMLFormElement).reportSubscriptionEmail.value;
        const reportSubscriptionStatue = (e.target as HTMLFormElement).reportSubscriptionStatue.checked;

        try {

            const response = await axios.patch(
                update_user_info_url,
                {
                    reportSubscriptionEmail,
                    reportSubscriptionStatue
                },
                {
                    withCredentials: true,  // Include cookies in the request
                    headers: {
                        'Content-Type': 'application/json',  // Set Content-Type header if needed
                    },
                }
            );

            if (response.status === 200) {
                onCloseSettings();
            }

            dispatch(updateUserSettings({reportSubscriptionEmail : reportSubscriptionEmail, reportSubscriptionStatue }));
            setLoading(false);

        } catch (error) {

            throwError(error);
        }


    }

    const handleEnableReportEmail = () => {
        setIsReportEmailEnabled(true);
    }
    return (

        <>

            {loading && <SettingsLoader />}
            <OverLay onClose={onCloseSettings}>

                <Form
                    method="post"
                    className="p-6 bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Settings</h2>

                    {/* Your Email */}
                    <div className="mb-4">
                        <label
                            htmlFor="your-email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Your Email
                        </label>
                        <input
                            id="your-email"
                            name="yourEmail"
                            type="email"
                            defaultValue={userEmail}
                            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            disabled={true}
                        />
                    </div>

                    {/* Report Subscription Email */}
                    <div className="mb-4">
                        <label
                            htmlFor="report-email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Your Report Subscription Email
                        </label>
                        <div className="relative">
                            <input
                                id="report-email"
                                name="reportSubscriptionEmail"
                                type="email"
                                defaultValue={reportSubscriptionEmail}
                                className="w-full px-4 py-2 pr-10 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                                disabled={!isReportEmailEnabled}
                            />
                            {/* Edit Icon inside the input field */}
                            <FaEdit
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                                size={20}
                                onClick={handleEnableReportEmail} // Replace with your edit logic
                            />
                        </div>
                    </div>

                    {/* Subscribe Checkbox */}
                    <div className="flex items-center mb-6">
                        <input
                            id="weekly-report"
                            name="reportSubscriptionStatue"
                            type="checkbox"
                            defaultChecked={reportSubscriptionStatue}
                            className="h-5 w-5 text-blue-600 cursor-pointer focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                            htmlFor="weekly-report"
                            className="ml-3 text-sm font-medium text-gray-700"
                        >
                            Subscribe to receive weekly reports
                        </label>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                        >
                            Save Settings
                        </button>
                    </div>
                </Form>
            </OverLay>

        </>


    )
};


export default Settings;