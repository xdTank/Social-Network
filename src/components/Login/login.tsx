import React, { FC } from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { GetStringKeys, Input, createField } from "../../FormsControl/FormsControl";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";
import { Navigate, Route, Routes } from "react-router-dom";
import style from "../../FormsControl/FormsControl.module.css"
import s from './login.module.css'
import { AppStateType } from "../../redux/reduxStore";

type LoginFormOwnProps = {
    captchaUrl: string | null
}
type LoginFormType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesKeysType = GetStringKeys<LoginFormType>

const LoginForm: FC<InjectedFormProps<LoginFormType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <div className={s.wrapper}>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className={s.inputBox}>{createField<LoginFormValuesKeysType>("Email", "email", [required], Input)} <i className='bx bxs-user'></i></div>
                <div className={s.inputBox}>{createField<LoginFormValuesKeysType>("Password", "password", [required], Input, { type: "password" })} <i className='bx bxs-lock-alt'></i></div>
                <div className={s.rememberForgot}>{createField<LoginFormValuesKeysType>(undefined, "rememberMe", [], Input, { type: "checkbox" }, "Remember me")}
                    <a href="#">Forgot password?</a>
                </div>
                {captchaUrl && <img src={captchaUrl} />}
                {captchaUrl && createField<LoginFormValuesKeysType>("Symbols from image", "captcha", [required], Input)}

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

type MapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}



const LoginReduxForm = reduxForm<LoginFormType, LoginFormOwnProps>({
    form: 'Login'
})(LoginForm)

const Login: FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = (formData: any) => {
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
const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps, { login })(Login)