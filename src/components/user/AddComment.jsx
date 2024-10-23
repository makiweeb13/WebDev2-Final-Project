import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

function AddComment({ postId, parentId }) {
    const [ value, setValue ] = useState('')
    const label = parentId ? 'reply' : 'comment';

     const onSubmit = async (value) => {
        try {
            const values = { post_id: postId, content: value };
            if (parentId) {
                values.parent_id = parentId;
            }
            const response = await fetch('http://localhost:5000/add-comment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(values)
            })
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                setValue('')
            } else {
                console.error('Adding comment failed', data.message);
            }
        } catch(err) {
            console.error('Adding comment request failed:', err)
        }
    }
   
    return (
        <div className="add-comment">
            <textarea 
                name="comment-content" 
                id="comment-content" 
                rows="2" 
                placeholder={`Write a ${label}...`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
            </textarea>
            <button onClick={() => onSubmit(value)}><FontAwesomeIcon icon={faPaperPlane} /></button>
        </div>
    )
}

export default AddComment;