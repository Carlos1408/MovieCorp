export interface Cinema {
    _id?: string;
    name: string;
    address: string;
    imagePath: string;
    movies_ids?: String[];
    rooms_ids?: String[];
    createdAt?: string;
    updateAt?: string;
}
