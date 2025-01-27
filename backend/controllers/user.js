
import User from "../models/User.js";

export const updateReportEmail = async (req, res) => {

    const userEmail = req.user.email;
    const reportSubscriptionEmail = req.body.reportSubscriptionEmail;

    if (reportSubscriptionEmail === null) {
        throw new Error("report subscription email doesn't exits or invalid");
    }


    try {

        const filter = {
            email: userEmail
        }


        const user = await User.findOneAndUpdate(
            filter,
            { reportSubscriptionEmail: reportSubscriptionEmail }
        );

        if (!user) {
            throw new Error("user don't exist in the db, failed to update report email");
        }


        return res.status(200).json({ message: "report subscription email updated succussfully" })


    } catch (error) {
        throw error;
    }

};


export const updateReportSubscription = async (req, res) => {

    const userEmail = req.user.email;

    const reportSubscriptionStatue = req.body.reportSubscriptionStatue;


    if (reportSubscriptionStatue === null) {
        throw new Error("report subscription statue doesn't provided");
    }



    try {

        const filter = {
            email: userEmail
        }

        const user = await User.findOneAndUpdate(
            filter,
            { reportSubscriptionStatue: reportSubscriptionStatue }
        );

        if (!user) {
            throw new Error("user don't exist in the db, failed to update report email");
        }

        return res.status(200).json({ message: "report subscription status updated succussfully" })

    } catch (error) {

        throw error;

    }

};


export const updateUserInfo = async (req, res) => {

    const userEmail = req.user.email;
   
    const {reportSubscriptionEmail , reportSubscriptionStatue } = req.body;
   


    if(!reportSubscriptionEmail || !reportSubscriptionStatue ){
        throw new Error("report email or subscribe weekly not provided");
    }

    try {

        const filter = {
            email: userEmail
        }

        const user = await User.findOneAndUpdate(
            filter,
            { reportSubscriptionEmail: reportSubscriptionEmail , reportSubscriptionStatue: reportSubscriptionStatue }
        );

        if (!user) {
            throw new Error("user don't exist in the db, failed to update user info");
        }

        return res.status(200).json({ message: "user info updated successfully" });

    } catch (error) {
        throw error;
    }

}