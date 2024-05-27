import { useParams } from "react-router-dom"
import { CreateComment } from "../../components/create-comment"
import { GoBack } from "../../components/go-back"
import { useAppSelector } from "../../hooks/redux"
import { Card, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { useContext } from "react"
import { ThemeContext } from "../theme-provider"

export const CurrentPost = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const data = useAppSelector(state => state.post.posts)
    const { theme } = useContext(ThemeContext)


    if (!data) {
        return <h2>Поста не существует</h2>;
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}
                className={`${theme} text-foreground`}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader>
                                Комментарии
                            </ModalHeader>
                            <ModalBody>
                                <div className="mt-10 ">
                                    {data
                                        ? data.map((comment) => (
                                            <Card key={comment.id} className="w-full" />
                                        ))
                                        : null}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <CreateComment onClose={onClose} />
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>

            </Modal>

        </>

    )
}