export interface Message{
    senderId: string
    senderName?: string | null
    senderEmail?: string
    text: string
    timestamp: string
}