import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {ReviewsInitialStateType} from '../../../store/reducers/reviewsReducer';
import {Formik} from 'formik';
import {Button, Form} from 'react-bootstrap';
import style from './Reviews.module.scss';
import {Navigate} from 'react-router-dom';

export const CreateReviewForm: React.FC<CreateReviewFormPropsType> = ({callBack}) => {
    const {categories} = useSelector<RootState, ReviewsInitialStateType>(state => state.reviewReducer);
    return (
        <Formik
            initialValues={{title: '', category: categories[0], description: '', hashtags: ''}}
            validate={values => {
                const errors = {title: '', description: '', hashtags: ''};
                if (values.title.length === 0 || values.title.length > 100) {
                    errors.title = 'Title length must be greater than 0 and less than 100!'
                }

                if (values.description.length === 0 || values.description.length > 5000) {
                    errors.description = 'Description length must be greater than 0 and less than 5000!'
                }

                if (values.hashtags.length !== 0) {
                    values.hashtags.trim().split(' ').forEach(h => {
                        if (!(/^#[\w]{1,}$/gi).test(h)) errors.hashtags = 'Hashtag must start with # and has minimum 1 character';
                    })
                }

                if (!!errors.title || !!errors.description || !!errors.hashtags) return errors;
            }}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                const isReset = callBack(values).isReset;
                setSubmitting(false);

                if (isReset) {
                    resetForm({
                        values: {
                            title: '',
                            description: '',
                            category: categories[0],
                            hashtags: ''
                        }
                    })
                }
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
                <Form className={style.form} onSubmit={handleSubmit}>
                    <Form.Group className={style.group}>
                        <Form.Label className={style.label}>Title for your review:</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="Max 100 characters"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={!!errors.title && touched.title ? style.errorInput : ''}
                        />
                        {!!errors.title && touched.title &&
                            <Form.Text className={style.errorText}>{errors.title}</Form.Text>}
                    </Form.Group>
                    <Form.Group className={style.group}>
                        <Form.Label className={style.label}>Choose category:</Form.Label>
                        <Form.Select name="category" value={values.category} onChange={handleChange}>
                            {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className={style.group}>
                        <Form.Label className={style.label}>Description:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            className={!!errors.description && touched.description ? style.errorInput : ''}
                            name="description"
                            placeholder={`Min 1 character\nMax 5000 characters`}
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {!!errors.description && touched.description &&
                            <Form.Text className={style.errorText}>{errors.description}</Form.Text>}
                    </Form.Group>
                    <Form.Group className={style.group}>
                        <Form.Label className={style.label}>Hashtags:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={1}
                            name="hashtags"
                            value={values.hashtags}
                            className={!!errors.hashtags && touched.hashtags ? style.errorInput : ''}
                            placeholder="#hashtags..."
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {!!errors.hashtags && touched.hashtags &&
                            <Form.Text className={style.errorText}>{errors.hashtags}</Form.Text>}
                    </Form.Group>
                    <Button type="submit" className={style.btn} disabled={isSubmitting}>Publish</Button>
                </Form>
            )}
        </Formik>
    )
}

type CreateReviewFormPropsType = {
    callBack: (values: CreateReviewValuesType) => { isReset: boolean }
}

export type CreateReviewValuesType = { title: string, category: string, description: string, hashtags: string }