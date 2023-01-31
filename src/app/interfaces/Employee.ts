import { User } from "./User";
import { Job } from "../enums/Job";
import { EmployeeRegion } from "./EmployeeRegion";

export interface Employee {
    id: number;
    user: User;
    manager: Employee;
    jobTitle: Job;
    deliveryRegions: EmployeeRegion[];
    employees: Employee[];
}