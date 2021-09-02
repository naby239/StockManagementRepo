import { StockAccessory } from "./stockAccessory";
import { StockImage } from "./stockImage";

export interface StockItem {
    id?: number;
    registrationNumber: string;
    make: string;
    model: string;
    modelYear: number;
    mileage: number;
    color: string;
    vIN: string;
    retailPrice: number;
    costPrice: number;
    accessories: StockAccessory[];
    stockImages: StockImage[];
    dateCreated?: Date;
    dateUpdated?: Date;
}