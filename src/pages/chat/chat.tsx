// import React, { useState } from "react"
// import { useAuthGuard } from "../../hooks/useAuthGuard"
// import { GoBack } from "../../components/go-back"
// import { MessageField } from "../../components/Chat/MessageField"
// import { useQuery } from "react-query"
// import { MessageType } from "."
// import { Message } from "../../components/Chat/Message"

// const Chat = ({ id }: { id: string }) => {
//     const [messages, setMessages] = useState<MessageType[]>([])

//     const { } = useQuery({
//         queryKey: ['messages', id],
//         enabled: !!id,
//     })

//     useAuthGuard()
//     return (
//         <div className="flex-grow flex justify-between flex-col">
//             <GoBack />
//             <div className="overflow-y-auto overflow-x-hidden h-[60vh]">
//                 {messages && messages.map((m, index) => <Message key={index} message={m} />)}
//             </div>
//             <div className="">
//                 <MessageField sendMessage={sendMessage} />
//             </div>
//         </div>
//     )
// }

// export default Chat