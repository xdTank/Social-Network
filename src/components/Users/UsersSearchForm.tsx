import { Field, Form, Formik } from "formik"
import { FilterType } from "../../redux/usersReducer"
import React, { FC } from "react"
import s from './Users.module.css'
import { useSelector } from "react-redux"
import { getUsersFilter } from "../../redux/usersSelectors"

const usersSearchFormValidate = (values: any) => {
    const error = {}
    return error
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
// type FormType = {
//     term: string,
//     friend: 'true' | 'false' | 'null'
// }

export const UsersSearchForm: FC<PropsType> = React.memo((props) => {
    const filter = useSelector(getUsersFilter)
    let submit = (values: FilterType, { setSubmitting }: { setSubmitting: (setSubmitting: boolean) => void }) => {
        // let filter: FilterType = {
        //     term: values.term,
        //     friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        // }
        props.onFilterChanged(values)
        setSubmitting(false)
    }
    return <div>
        <Formik
            initialValues={{ term: filter.term, friend: filter.friend }}
            enableReinitialize={true}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form className={s.searchBox}>
                    <div className={s.selectBox}>
                        <Field className={s.select} name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                    </div>
                    <div className={s.search}>
                        <Field type="text" name="term" placeholder={'Search'} autocomplete="off" />
                        <i className='bx bx-search'></i>
                    </div>
                    <div>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
})