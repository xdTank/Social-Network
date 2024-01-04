import React from "react";
import style from './FormsControl.module.css'

export const TextArea = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={style.formContol + " " + (hasError ? style.error : "")}>
            <div>
                <textarea {...input} {...props} />
            </div>

            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
export const Input = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={style.formContol + " " + (hasError ? style.error : "")}>
            <div>
                <input {...input} {...props} />
            </div>

            {hasError && <span>{meta.error}</span>}
        </div>
    )
}