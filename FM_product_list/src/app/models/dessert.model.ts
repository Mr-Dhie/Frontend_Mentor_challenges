export interface Image{
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;    
}

export interface DessertModel {
    id: string;
    name: string;
    category: string;
    price: number;
    image: Image
}
