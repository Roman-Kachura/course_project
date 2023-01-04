import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store/store';
import {Formik} from 'formik';
import {Button, Form} from 'react-bootstrap';
import style from './Create.module.scss';

export const CreateReviewForm: React.FC<CreateReviewFormPropsType> = ({callBack, values}) => {
    const categories = useSelector<RootState, string[]>(state => state.categoriesReducer.categories);
    return (
        <Formik
            initialValues={values ? values : {name: '', product: '', category: categories[0], description: '', hashtags: ''}}
            validate={values => {
                const errors = {name: '', product: '', description: '', hashtags: ''};
                if (values.name.length === 0 || values.name.length > 100) {
                    errors.name = 'Title length must be greater than 0 and less than 100!'
                }

                if (values.product.length === 0 || values.product.length > 100) {
                    errors.product = 'Product length must be greater than 0 and less than 100!'
                }

                if (values.description.length === 0 || values.description.length > 5000) {
                    errors.description = 'Description length must be greater than 0 and less than 5000!'
                }

                if (values.hashtags.length > 1) {
                    values.hashtags.trim().split(' ').forEach(h => {
                        if (!(/^#[\w]{1,}$/gi).test(h)) errors.hashtags = 'Hashtag must start with # and has minimum 1 character';
                    })
                }

                if (!!errors.product || !!errors.name || !!errors.description || !!errors.hashtags) return errors;
            }}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                const isReset = callBack(values).isReset;
                setSubmitting(false);

                if (isReset) {
                    resetForm({
                        values: {
                            name: '',
                            product: '',
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
                    <div className={style.groupOne}>
                        <Form.Group className={style.group}>
                            <Form.Label className={!!errors.name && touched.name ? style.errorText : style.label}>
                                Title for your review:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Max 100 characters"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={!!errors.name && touched.name ? style.errorInput : ''}
                            />
                            {!!errors.name && touched.name &&
                                <Form.Text className={style.errorText}>{errors.name}</Form.Text>}
                        </Form.Group>
                        <Form.Group className={style.group}>
                            <Form.Label
                                className={!!errors.product && touched.product ? style.errorText : style.label}>
                                Product name:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="product"
                                placeholder="Max 100 characters"
                                value={values.product}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={!!errors.product && touched.product ? style.errorInput : ''}
                            />
                            {!!errors.product && touched.product &&
                                <Form.Text className={style.errorText}>{errors.product}</Form.Text>}
                        </Form.Group>

                    </div>
                    <div className={style.groupTwo}>
                        <Form.Group className={style.group}>
                            <Form.Label className={style.label}>Choose category:</Form.Label>
                            <Form.Select name="category" value={values.category} onChange={handleChange}>
                                {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className={style.group}>
                            <Form.Label
                                className={!!errors.hashtags && touched.hashtags ? style.errorText : style.label}>
                                Hashtags:
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="hashtags"
                                value={values.hashtags}
                                className={!!errors.hashtags && touched.hashtags ? style.errorInput : ''}
                                placeholder="#hashtags..."
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{resize: 'none'}}
                            />
                            {!!errors.hashtags && touched.hashtags &&
                                <Form.Text className={style.errorText}>{errors.hashtags}</Form.Text>}
                        </Form.Group>
                    </div>
                    <Form.Group className={style.description}>
                        <Form.Label
                            className={!!errors.description && touched.description ? style.errorText : style.label}>
                            Description:
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={8}
                            className={!!errors.description && touched.description ? style.errorText : ''}
                            name="description"
                            placeholder={`Min 1 character\nMax 5000 characters`}
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {!!errors.description && touched.description &&
                            <Form.Text className={style.errorText}>{errors.description}</Form.Text>}
                    </Form.Group>
                    <Button type="submit" className={style.btn} disabled={isSubmitting}>Publish</Button>
                </Form>
            )}
        </Formik>
    )
}

type CreateReviewFormPropsType = {
    callBack: (values: CreateReviewValuesType) => { isReset: boolean }
    values?: CreateReviewValuesType
}

export type CreateReviewValuesType = {
    name: string,
    product: string,
    category: string,
    description: string,
    hashtags: string
}