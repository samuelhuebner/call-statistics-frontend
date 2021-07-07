export interface Caller {
    id: number;
    phoneNumber?: string;
    accountNumber?: string;
    contactId?: number;
    firstContactDate: Date;
    lastContactDate?: Date;
    isExternal: number;
}