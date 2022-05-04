export type User = {
    name: string;
    role: number;
};

export type UserShip = {
    id: number;
    name: string;
};

export type Ship = {
    id: number;
    name: string;
    description: string;
};

export type Zapis = {
    id: number;
    ship: number;
    user_name: string;
    text: string;
};
