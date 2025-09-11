export interface Message{
    senderId: string
    senderName?: string | null
    senderEmail?: string
    senderPhone ?: string
    text: string
    timestamp: string
}