import React from 'react';
import style from './Auth.module.scss';
import Form from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap';
import {Formik} from 'formik';
import {Navigate, NavLink} from 'react-router-dom';
import {RootState, useAppDispatch} from '../../store/store';
import {loginThunk} from '../../store/reducers/authReducer';
import {useSelector} from 'react-redux';

export const Login: React.FC = () => {
    const isAuth = useSelector<RootState,boolean>(state => state.auth.isAuth);
    if(isAuth) return <Navigate to={'/content'}/>
    return (
        <div className={style.auth}>
            <div className={style.item}>
                <h3>Sign In</h3>
                <LoginForm/>
            </div>
        </div>
    )
}

const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch();
    return (
        <Formik
            initialValues={{email: '', password: '', name: ''}}
            validate={values => {
                const errors = {email: '', password: '', name: ''};
                if (!values.name) {
                    errors.name = 'Name is required';
                }
                if (!values.password) {
                    errors.password = 'Password is required';
                }

                if (!values.email) {
                    errors.email = 'Email is required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
              }) => (
                <form className={style.form} onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(loginThunk({...values}));
                }}>
                    <Form.Group className={style.group}>
                        <Form.Control
                            required
                            className={`${style.input} ${!!errors.email && touched.email && style.error}`}
                            type="email"
                            name="email"
                            placeholder="Email*"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {!!errors.email && touched.email &&
                            <Form.Text className={style.errorText}>{errors.email}</Form.Text>}
                    </Form.Group>

                    <Form.Group className={style.group}>
                        <Form.Control
                            required
                            className={`${style.input} ${!!errors.password && touched.password && style.error}`}
                            type="password"
                            name="password"
                            placeholder="Password*"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {!!errors.password && touched.password &&
                            <Form.Text className={style.errorText}>{errors.password}</Form.Text>}
                    </Form.Group>

                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className={style.button}
                        variant="primary">
                        Sing In
                    </Button>


                    <NavLink to="/registration">Create an account</NavLink>
                </form>
            )}
        </Formik>
    )
}