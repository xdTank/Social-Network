import React from "react";
import style from './FormsControl.module.css'
import { Field } from "redux-form";

export const TextArea = ({ input, meta: { touched, error }, ...props }) => {
    const hasError = touched && error
    return (
        <div className={style.formContol + " " + (hasError ? style.error : "")}>
            <div>
                <textarea {...input} {...props} />  
            </div>

            {hasError && <span>{error}</span>}
        </div>
    )
}
export const Input = ({ input, meta: { touched, error }, ...props }) => {
    const hasError = touched && error
    return (
        <div className={style.formContol + " " + (hasError ? style.error : "")}>
            <div>
                <input {...input} {...props} />
            </div>

            {hasError && <span>{error}</span>}
        </div>
    )
}

export const createField = (placeholder, name, validators, component, props = {}, text = "") => {
    return <div>
        <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props} /> {text}
    </div>
}