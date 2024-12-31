import React from "react";


type CheckBoxProps = {
    isChecked: boolean,
    onChange : (event: React.ChangeEvent<HTMLInputElement>) => void; // I don't know what function passed here, and how
}

const CheckBox : React.FC<CheckBoxProps> = ({ isChecked, onChange}) => {


    return (
        <input
            type="checkbox"
            className="cursor-pointer"
            checked={isChecked}
            onChange={onChange}
        />
    )
};


export default CheckBox;