
import store from "../app/store.ts";
import { userSingOut } from "../features/userInfoSlice/userInfoSlice.ts";
import { clearData as clearWeekData } from "../features/weekEventsSlice/weekEventsSlice.ts";
import { clearData as  clearDayData } from "../features/dayEventsSlice/dayEventsSlice.ts";


export const handleSingOut = ()=>{

    store.dispatch(clearDayData());
    store.dispatch(clearWeekData());
    store.dispatch(userSingOut());

};