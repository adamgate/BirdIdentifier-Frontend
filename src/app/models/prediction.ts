export class Prediction {
  constructor(
    public timestamp: string,
    public name: string,
    public score: number,
    public learnMoreLink: string
  ) { }
}
