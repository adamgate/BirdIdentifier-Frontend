export class Prediction {
    constructor(
        public imageChecksum: string,
        public timestamp: string,
        public predictionName: string,
        public predictionScore: number,
        public exactLink: string,
        public searchLink: string
    ) {}
}