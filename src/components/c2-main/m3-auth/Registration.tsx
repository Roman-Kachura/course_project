import React from 'react';
import style from './Auth.module.scss';
import Form from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap';
import {Formik} from 'formik';
import {Navigate, NavLink} from 'react-router-dom';
import {RootState, useAppDispatch} from '../../../store/store';
import {registrationThunk} from '../../../store/reducers/authReducer';
import {useSelector} from 'react-redux';
import {LangType} from '../../../store/reducers/appReducer';
import {SocialBar} from './SocialBar';

export const Registration: React.FC = () => {
    const isAuth = useSelector<RootState,boolean>(state => state.authReducer.isAuth);
    const isDarkTheme = useSelector<RootState, boolean>(state => state.appReducer.isDarkTheme);
    const language = useSelector<RootState, LangType>(state => state.appReducer.language);
    if(isAuth) return <Navigate to={'/content'}/>
    return (
        <div className={isDarkTheme ? style.auth : `${style.auth} ${style.light}`}>
            <div className={style.item}>
                <h3>{language === 'RU' ? 'Зарегистрироваться' : 'Sing Up'}</h3>
                <RegistrationForm/>
                <SocialBar/>
            </div>
        </div>
    )
};

const RegistrationForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const language = useSelector<RootState, LangType>(state => state.appReducer.language);
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
                    dispatch(registrationThunk({...values}));
                }}>
                    <Form.Group className={style.group}>
                        <Form.Control
                            required
                            className={`${style.input} ${!!errors.name && touched.name && style.error}`}
                            type="text"
                            name="name"
                            placeholder={language === 'RU' ? 'Имя*' : 'Name*'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        {!!errors.name && touched.name &&
                            <Form.Text className={style.errorText}>{errors.name}</Form.Text>}
                    </Form.Group>

                    <Form.Group className={style.group}>
                        <Form.Control
                            required
                            className={`${style.input} ${!!errors.email && touched.email && style.error}`}
                            type="email"
                            name="email"
                            placeholder={language === 'RU' ? 'Пароль*' : 'Password*'}
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
                            placeholder={language === 'RU' ? 'Пароль*' : 'Password*'}
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
                        {language === 'RU' ? 'Зарегистрироваться' : 'Sing Up'}
                    </Button>


                    <NavLink to="/login">
                        {language === 'RU' ? 'Уже есть аккаунт?' : 'Do you have an account?'}
                    </NavLink>
                </form>
            )}
        </Formik>
    )
}