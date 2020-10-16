export interface Call {
    id: number,
    callId: string,
    callStatus: string,
    callInitiationId?: number,
    callDirection: string,
    callInitiation?: {
        id: number,
        callId: string,
        callInitiationTime: Date
    },
    callerId?: number,
    caller?:{
        id: number,
        phoneNumber?: string,
        contact_id?: number,
        firstContactDate: Date,
        lastContactDate?: Date
    }
}