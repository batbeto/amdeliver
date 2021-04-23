export enum OrderStatus{
    PENDING, CONCLUSED
}

export type Order = {
    id?: number;
	moment: Date;
	qtd: number;
	total: number;
    status: OrderStatus;
}

type EventId ={
    id: number;
}

export type OrderPayload = {
    events: EventId[];
} & Order;
