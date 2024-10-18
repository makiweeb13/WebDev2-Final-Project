import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from 'formik';
import { userSchema } from '../schemas/signup-schema';

function Signup() {
    const navigate = useNavigate();

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.message)
            resetForm()
            setSubmitting(false)
            navigate('/login')
        })
        .catch(err => {
            console.error(err);
        })
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: userSchema,
        onSubmit
    })

    return (
        <div className="page">
            <Link to="/"><FontAwesomeIcon icon={faArrowLeft} className="menu-icon"/></Link>
            <form onSubmit={handleSubmit} >
                <input 
                    type="username" 
                    name="username" 
                    placeholder="username" 
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.username && touched.username ? 'input-error' : ''}
                />
                <br />
                { errors.username && touched.username && <p className='error-message'>{errors.username}</p> }
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="email" 
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email && touched.email ? 'input-error' : ''}
                />
                <br />
                { errors.email && touched.email && <p className='error-message'>{errors.email}</p> }
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="password" 
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.password && touched.password ? 'input-error' : ''}
                />
                <br />
                 { errors.password && touched.password && <p className='error-message'>{errors.password}</p> }
                <input 
                    type="password" 
                    name="confirmPassword" 
                    id="confirm-password" 
                    placeholder="confirm password" 
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}
                />
                <br />
                { errors.confirmPassword && touched.confirmPassword && <p className='error-message'>{errors.confirmPassword}</p> }
                <br />
                <button type="submit">Sign Up</button>
                <p>Already have an account? <Link to="/login" className="link">Login</Link></p>
            </form>
        </div>
        
    )
}

export default Signup;