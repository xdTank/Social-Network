import { Card, CardBody } from "@nextui-org/react"
import { Login } from "../../components/login"

export const Auth = () => {


    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col">
                <Card className="max-w-full w-[340px] h-[450px]">
                    <CardBody className="overflow-hidden">
                        <Login />
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}