export interface Color {
  colorCode: string;
  colorName: string;
}

export interface Brand {
  id: string;
  logoSrc: string;
  name: string;
}

export interface Product {
  id: string;
  nameWithoutBrand: string;
  name: string;
  image: string;
  sizesAvailable: Record<string, unknown>; 
  colors: Color[];
  descriptionHtmlSimple: string;
  suggestedRetailPrice: number;
  brand: Brand;
  listPrice: number;
  finalPrice: number;
}
