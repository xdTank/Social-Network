
let subscribers = {
    'messages-received': [] as SubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}


let ws: WebSocket | null = null
type EventsNameTypes = 'messages-received' | 'status-changed'

const closeHandler = () => {
    notifySubscribers('pending')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
}
const openHandler = () => {
    notifySubscribers('ready')
}
const errorHandler = () => {
    notifySubscribers('error')
    console.error('Refresh page')
}
const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}
const notifySubscribers = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}
function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribers('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}


export const chatAPI = {
    start() {
        createChannel()

    },
    stop() {
        if (ws && ws.readyState === WebSocket.OPEN) {
            subscribers["messages-received"] = []
            subscribers['status-changed'] = []
            cleanUp()
            ws?.close()

        }
    },
    subscribe(eventName: EventsNameTypes, callback: SubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNameTypes, callback: SubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

export type ChatMessageAPIType = {
    timestamp: any
    message: string
    photo: string
    userId: number
    userName: string
}
export type StatusType = 'pending' | 'ready' | 'error'

type SubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
