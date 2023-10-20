export interface ICartProduct {
    _id: string;
    image: string;
    inStock: number;
    price: number;
    size?: ISizes;
    slug: string;
    title: string;
    gender: 'men' | 'women' | 'kid' | 'unisex';
    quantity: number;
}

export type ISizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
