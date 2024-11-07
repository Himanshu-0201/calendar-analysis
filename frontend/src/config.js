
// config.js


// const BASE_URL = "http://localhost:8000"

const BASE_URL = process.env.REACT_APP_BASE_URL;

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
