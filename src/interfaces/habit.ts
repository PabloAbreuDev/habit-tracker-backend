export interface IHabit {
    _id?: string;
    name: string;
    description: string;
    status?: "ACTIVE" | "INACTIVE";
    completeDays?: number[]; // Dias em que foi completo
    owner: string;
}
