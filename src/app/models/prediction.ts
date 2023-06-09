export class Prediction {
    constructor(
        public imageChecksum: string,
        public timestamp: string,
        public predictionName: string,
        public predictionScore: number,
        public learnMoreLink: string
    ) {}
}

