export class Location {
  constructor(
    // For sorting
    public dateActual: string,
    // For display
    public dateView: string,
    public name: string,
    public image: string[],
    public description: string
  ) {}
}

