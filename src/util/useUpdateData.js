import { useState, useEffect } from "react";

const useUpdateData = (id, name, values) => {
    const [ data, setData ] = useState(null)

    useEffect( async () => {
        try {
            const response = await fetch(`http://localhost:5000/${name}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(values)
            })
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                setData(data.updatedData)
            } else {
                console.error(`${name} update failed:`, data.message);
            }
        } catch(err) {
            console.error(`${name} update request failed`, err)
        }
    }, [id, name, values])
    
    return data;
}

export default useUpdateData;