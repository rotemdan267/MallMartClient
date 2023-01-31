import { Employee } from "./Employee";
import { Region } from "./Region";

export interface EmployeeRegion {
    id: number;
    employee: Employee;
    region: Region;
}