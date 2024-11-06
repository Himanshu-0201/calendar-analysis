import { useEffect } from "react";


const useOutSideClick = (ref, callback)=>{


    useEffect(()=>{

        const handleClickOutside = (event)=>{

            if(ref.current && !ref.current.contains(event.target)){
                callback(); //Call the callback if clicked outside
            }
        }


        document.addEventListener("mousedown", handleClickOutside);

        return ()=>{

            document.removeEventListener("mousedown", handleClickOutside);

        }

    }, []);


};


export default useOutSideClick;