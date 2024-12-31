// you con remove this file from the repo, it is not used in the project

const CheckBox = ({isChecked}) => {

    const handleChange = () => {}


    return (
        <input
            type="checkbox"
            className="cursor-pointer"
            checked= {isChecked}
            onChange={handleChange}
        />
    )
}

export default CheckBox;