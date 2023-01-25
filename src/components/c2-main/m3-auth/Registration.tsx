import React from 'react';
import style from './Auth.module.scss';
import Form from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap';
import {Formik} from 'formik';
import {Navigate, NavLink} from 'react-router-dom';
import {RootState, useAppDispatch} from '../../../store/store';
import {registrationThunk} from '../../../store/reducers/authReducer';
import {useSelector} from 'react-redux';
import {SocialBar} from './SocialBar';
import {useT} from '../../../i18n';

export const Registration: React.FC = () => {
    const isAuth = useSelector<RootState,boolean>(state => state.authReducer.isAuth);
    const isDarkTheme = useSelector<RootState, boolean>(state => state.appReducer.isDarkTheme);
    const t = useT();
    if(isAuth) return <Navigate to={'/content'}/>
    return (
        <div className={isDarkTheme ? style.auth : `${style.auth} ${style.light}`}>
            <div className={style.item}>
                <h3>{t('SIGN_UP_TEXT')}</h3>
                <RegistrationForm/>
                <SocialBar/>
            </div>
        </div>
    )
};

const RegistrationForm: React.FC = () => {
    const t = useT();
    const dispatch = useAppDispatch();
    return (
        <Formik
            initialValues={{email: '', password: '', name: ''}}
            validate={values => {
                const errors = {email: '', password: '', name: ''};
                if (!values.name) {
                    errors.name = t('NAME_REQUIRED');
                }
                if (!values.password) {
                    errors.password = t('PASS_REQUIRED');
                }

                if (!values.email) {
                    errors.email = t('EMAIL_REQUIRED');
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = t('NOT_VALID_EMAIL');
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
                            placeholder={t('NAME_TEXT')}
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
                            placeholder={t('EMAIL_TEXT')}
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
                            placeholder={t('PASS_TEXT')}
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
                        {t('SIGN_UP_TEXT')}
                    </Button>


                    <NavLink to="/login">
                        {t('HAVE_ACCOUNT_TEXT')}
                    </NavLink>
                </form>
            )}
        </Formik>
    )
}