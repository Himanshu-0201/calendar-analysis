import { useState } from "react";

const Test = () => {
    const [value, setValue] = useState({
        startDate: null,
        endDate: null,
    });

    return (

        <input type="date" />

    );
};

export default Test;
