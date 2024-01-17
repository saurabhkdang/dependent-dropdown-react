import {React, useEffect, useState} from 'react'

const DynamicForm = () => {
    
    const [formFields, setFormFields] = useState([]);
    const [selectedValues, setSelectedValues] = useState({});
    
    useEffect(() => {
        fetchFormFields();
    }, []);
    
    const fetchFormFields = () => {
        fetch("http://localhost/hrdb/public/api/getFields")
        .then((response) => response.json())
        .then((data) => setFormFields(data))
        .catch((error) => console.error('Error fetching form fields:', error));
    }

    const nestedLevel = (prevFields, data, id) => {
        return prevFields.map((f) => {
            if(f.id === id) {
                return { ...f, sub: data };
            }

            if(f.sub && Array.isArray(f.sub)) {
                const updatedData = nestedLevel(f.sub, data, id);
                return {...f, sub: updatedData}
            }

            if(data.length===0) {
                let newObj = f;
                delete newObj.sub;
                return newObj;
            }

            return f;

        })
    }

    const handleFieldChange = (field, value) => {
        setSelectedValues((prevValues) => ({ ...prevValues, [field.id]: value }));
        
        if (field) {
            if(field.options) {
                const selectFieldOption = field.options.find((o) => o.value == value )
    
                if(selectFieldOption && selectFieldOption.next) {
                    fetch(`${selectFieldOption.next}`)
                    .then((response) => response.json())
                    .then((data) => {
                        // console.log('DATA',formFields);
                        // Update the form fields with the fetched data
                        setFormFields((prevFields) =>{
                            console.log(prevFields);
                            //prevFields.map((f) => (f.id === field.id ? { ...f, sub: data } : f))
                            return nestedLevel(prevFields, data, field.id);
                        }
                        );
                    })
                    .catch((error) => console.error('Error fetching dependent fields:', error));
                }else{
                    setFormFields((prevFields) =>{
                        console.log(prevFields);
                        return nestedLevel(prevFields, [], field.id);
                    });
                }
            }
        } 
    };

    const Field = (field) => {
    
        switch (field.type) {
            case "text":
                return <input type='text' className='form-control'
                key={field.id}
                value={selectedValues[field.id] || ''}
                onChange={(e) => handleFieldChange(field, e.target.value)}/>
            case "select":
                return (
                    <>
                        <select className='form-control'
                        key={field.id}
                        value={selectedValues[field.id] || ''}
                        onChange={(e) => handleFieldChange(field, e.target.value)}>
                            <option value="">Select...</option>
                            {field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                {option.label}
                                </option>
                            ))}
                        </select>
                        {
                            field.sub &&
                            field.sub.map((s) => Field(s))
                        }
                    </>
                ) 
            default:
                break;
        }
    }

    return (
        <div>
            {JSON.stringify(formFields)}
            {
                formFields.length &&
                formFields.map((field) => Field(field))
            }
        </div>
    )
}

export default DynamicForm