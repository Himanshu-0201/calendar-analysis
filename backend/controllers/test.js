
import { join } from "path";
import { cwd } from "process";


const eventsData = [{
    eventName: "DSA",
    totalTimeSpend: "10 hr 20 min",
    percentage: "10%"
}, {
    eventName: "Project",
    totalTimeSpend: "10 hr 20 min",
    percentage: "10%"
}, {
    eventName: "Reading",
    totalTimeSpend: "10 hr 20 min",
    percentage: "10%"

}, {
    eventName: "Sport",
    totalTimeSpend: "10 hr 20 min",
    percentage: "10%"

}, {
    eventName: "Talk",
    totalTimeSpend: "10 hr 20 min",
    percentage: "10%"

}, {
    eventName: "Entairtainement",
    totalTimeSpend: "10 hr 20 min",
    percentage: "10%"

}]

import User from "../models/User.js";

export const testSingIn = async (req, res) => {

    const userName = "User name";
    const userEmail = "himanshu123@gmail.com";
    const access_token = "hikasjbufjidbjidufhehf8qwefqergedewd";
    const refresh_token = "dufguergfq0efu";

    try {

        let user = await User.findOne({ userEmail });

        if (!user) {

            user = new User({
                username: userName,
                email: userEmail,
                accessToken: access_token,
                refreshToken: refresh_token,
            })

            await user.save();
        }
        else {

        }

        res.send("user succussfully signed in");

    } catch (error) {
        console.error('Error storing user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }


}

const userName = "Himanshu Nagar"

export const Test = async (req, res) => {

    const query = req.query;
    console.log(query);

    const date = query.date;
    const currDate = new Date(date);

    // console.log(currDate);

    res.send({ userName: userName, events: eventsData });


}

export const testSignOutFun = (req, res) => {


    res.clearCookie('token');
    res.status(200).send({ message: 'Successfully signed out.' });

}





export const testSuccSignIn = (req, res) => {
    res.send("You successsfully sign in ");
}

export const testSuccSignOut = (req, res) => {
    res.send("your have successfull signed out");
}

export const testServer = (req, res) => {
    res.send("Your server is running at port 3000");
}
