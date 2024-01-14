import React from "react";
import { reduxForm } from "redux-form";
import { Input, createField } from "../../FormsControl/FormsControl";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";
import { Navigate, Route, Routes } from "react-router-dom";
import style from "../../FormsControl/FormsControl.module.css"
import s from './login.module.css'


const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <div className={s.wrapper}>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className={s.inputBox}>{createField("Email", "email", [required], Input)} <i class='bx bxs-user'></i></div>
                <div className={s.inputBox}>{createField("Password", "password", [required], Input, { type: "password" })} <i class='bx bxs-lock-alt'></i></div>
                <div className={s.rememberForgot}>{createField(null, "rememberMe", [], Input, { type: "checkbox" }, "Remember me")}
                    <a href="#">Forgot password?</a>
                </div>
                {captchaUrl && <img src={captchaUrl} />}
                {captchaUrl && createField("Symbols from image", "captcha", [required], Input)}

                {error && <div className={style.formSummaryError}>{error}</div>}
                <div>
                    <button>Login</button>
                </div>
                <div className={s.registerLink}>
                    <p>Don't have an account? <a href="#">Register</a></p>
                </div>
            </form>
        </div>
    )
}

const LoginReduxForm = reduxForm({
    form: 'Login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Routes>
            <Route path="*" element={<Navigate to={"/profile"} />
            } />
        </Routes>
    }
    return <div className={s.login}>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps, { login })(Login)