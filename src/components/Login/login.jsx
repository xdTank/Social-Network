import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../../FormsControl/FormsControl";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";
import { Navigate, Route, Routes } from "react-router-dom";
import styles from "../../FormsControl/FormsControl.module.css"


const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder="Email" name="email" validate={[required]} component={Input} />
            </div>
            <div>
                <Field placeholder="Password" name="password" type={'password'} validate={[required]} component={Input} />
            </div>
            <div>
                <Field type={"checkbox"} name="rememberMe" component={Input} /> remember me
            </div>
            {props.error && <div className={styles.formSummeryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'Login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (FormData) => {
        props.login(FormData.email, FormData.password, FormData.rememberMe)
    }

    if (props.isAuth) {
        return <Routes>
            <Route path="*" element={<Navigate to={"/profile"} />
            } />
        </Routes>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, { login })(Login)