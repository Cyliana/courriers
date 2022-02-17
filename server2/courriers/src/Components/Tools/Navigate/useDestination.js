import { useNavigate } from "react-router-dom";


function useDestination(url)
{
    const destination = useNavigate();
    destination(url);
}

export default useDestination;