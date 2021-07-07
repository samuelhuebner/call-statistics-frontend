import { CallInitiation } from './CallInitiation.model';
import { CallPickup } from './CallPickup.model';
import { CallRinging } from './CallRinging.model';
import { CallEnding } from './CallEnding.model';
import { Caller } from './Caller.model';

export interface Call {
    id: number;
    callId: string;
    wasSuccessful: number;
    calledNumber?: string;
    endingReason: string;

    callStatus: string;
    callDirection: string;
    callerId?: number;

    callInitiationId?: number;
    callRingingId?: number;
    callPickupId?: number;
    callTransferId?: number;
    callEndingId?: number;

    callInitiation?: CallInitiation;
    callRinging?: CallRinging;
    callPickup?: CallPickup;
    callEnding?: CallEnding;
    caller?: Caller;

    callRingingTime: string;
    callTalkingTime?: string;
}