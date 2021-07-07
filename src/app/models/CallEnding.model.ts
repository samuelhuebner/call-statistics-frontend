import { KeyEndedReason } from './KeyEndedReason.model';

export interface CallEnding {
    id: number;
    callId: string;
    callEndingTime: Date;
    keyEndedReasonId: number;
    keyEndedReason: KeyEndedReason;
}