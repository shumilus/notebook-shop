export class Goods {
  public name: string;
  public description: string;
  public imagePath: string;
  public pages: string;
  public coverMaterial: string;
  public price: string;
  public id: number;

  constructor(name: string, description: string, imagePath: string, pages: string, coverMaterial: string, price: string) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.pages = pages;
    this.coverMaterial = coverMaterial;
    this.price = price;
  }
}
