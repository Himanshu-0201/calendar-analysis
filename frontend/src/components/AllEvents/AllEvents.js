import { useSelector } from "react-redux";
import LayOut from "../LayOut/LayOut";
import Table from "../Table/Table";



const AllEvents = () => {

    const events = useSelector(state => state.userInfo.events);


    return (

        <>
            <LayOut>
                <Table
                    events={events}
                />
            </LayOut>

        </>

    );
};



export default AllEvents;