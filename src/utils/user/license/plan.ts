import { Feature } from "./feature";

export class Plan {
    constructor(
        public id: number,
        public productId: string,
        public name: string,
        public description: string,
        public price: string,
        public priceId: string,
        public lookupKey: string | undefined,
        public features: Feature[],
        public storage: number
    ) {}
}