import React, { useEffect } from "react"
import { useAppSelector } from "../../hooks/redux";
import { authApi } from "../../api/auth-api";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Checkbox, Image } from "@nextui-org/react";
import { ErrorMessage } from "../error-message";
import { Input } from "../input";

interface Login {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
export const Login = () => {
    const { error, captchaUrl } = useAppSelector(state => state.auth);
    const [login] = authApi.useLoginMutation();
    const { handleSubmit, register, control } = useForm<Login>()
    const navigate = useNavigate()
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const onSubmit = async (data: Login) => {
        try {
            await login(data)
        } catch (err) {
        }
    }
    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [isAuth, navigate])


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 items-center m-2"
        >
            <h1 className="text-3xl font-bold m-6">Login</h1>
            <Input
                control={control}
                name="email"
                label="Email"
                type="email"
                required="Обязательное поле"
            />
            <Input
                control={control}
                name="password"
                label="Password"
                type="password"
                required="Обязательное поле"
            />
            <div className="flex items-center justify-between text-sm gap-10 ">
                <Checkbox  {...register('rememberMe')}>
                    Запомнить меня
                </Checkbox>
                <Link to={''}>
                    Забыли пароль?
                </Link>
            </div>
            {error && <ErrorMessage error={error} />}
            {
                captchaUrl && (
                    <>
                        <Image src={captchaUrl} sizes="50px" />
                        <Input
                            control={control}
                            name="captcha"
                            label="Enter captcha"
                            type="captcha"
                            required="Обязательное поле"

                        />
                    </>
                )
            }
            <Button fullWidth color="primary" type="submit">
                Login
            </Button>
            <p className="text-center text-small">
                Нет аккаутна?{" "}
                <Link
                    to={'https://social-network.samuraijs.com/signUp'}
                    className="cursor-pointer text-blue-400"
                >
                    Зарегистрируйтесь
                </Link>
            </p>
        </form >
    )
}
