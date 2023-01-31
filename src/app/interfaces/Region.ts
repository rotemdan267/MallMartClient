import { EmployeeRegion } from "./EmployeeRegion";

export interface Region {
    id: number;
    name: string;
    employees: EmployeeRegion[];
}