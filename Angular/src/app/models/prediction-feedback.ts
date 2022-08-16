export class PredictionFeedback{
    constructor(
        public wasCorrect: boolean,
        public description: string,
        public prediction: string
    ) {}
}