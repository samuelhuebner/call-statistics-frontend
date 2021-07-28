import { CallDestination } from './CallDestination.model';

export interface CallRinging {
    id: number;
    callId: string;
    callRingingTime: Date;
    destinationId: number;
    callDestination: CallDestination;
}
