import { Card, CardBody, CardFooter, CardHeader, Tab, Tabs } from "@nextui-org/react"
import { useState } from "react"
import { useAuthGuard } from "../../hooks/useAuthGuard"
import { Login } from "../../feauters/user/login"
import { Register } from "../../feauters/user/register"

export const Auth = () => {
  const [selected, setSelected] = useState("login")

  useAuthGuard()

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
              <Card className="max-w-full w-[340px] h-[450px]">
                  <CardHeader>
                      <h2 className="text-xl font-bold text-center text-default-400 m-2 justify-center items-center flex gap-2 w-full">
                          {selected === "login" ? "Авторизация" : "Регистрация"}
                        </h2>
                  </CardHeader>
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              selectedKey={selected}
              onSelectionChange={(key) => setSelected(key as string)}
            >
              <Tab key="login" title="Вход">
                <Login setSelected={setSelected} />
              </Tab>
              <Tab key="sign-up" title="Регистрация">
                <Register setSelected={setSelected} />
              </Tab>
            </Tabs>
                  </CardBody>
                      
        </Card>
      </div>
    </div>
  )
}