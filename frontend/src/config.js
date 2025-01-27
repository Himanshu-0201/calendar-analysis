
// config.js


// const BASE_URL = "http://localhost:8000"

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const event_details_update_api=`${BASE_URL}/update-event-details`;

export const update_user_info_url = `${BASE_URL}/update-userinfo`;



const config = {
    BASE_URL: BASE_URL, // Base URL for your backend
    test  : {
        eventsData : `${BASE_URL}/test`
    },

    eventsData : `${BASE_URL}/get-day-events`,
    signOut : `${BASE_URL}/auth/sign-out`,
    signIn : `${BASE_URL}/auth/sign-in`
};

export default config;
