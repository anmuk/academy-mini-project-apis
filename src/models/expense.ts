// export interface Expense {
// 	id: number;
// 	date: string;
// 	description: string;
// 	user: string;
// }


export class Expense {
    constructor(
        public readonly id: number,
        public readonly date: string,
        public readonly description: string,
        public readonly user: string,
    ){
        if (id <= 0) throw new Error("id must be greater than 0");
        if (!date.trim()) throw new Error("Date cannot be empty");
        if (!description.trim()) throw new Error("Description cannot be empty");
        if (!user.trim()) throw new Error("User cannot be empty");
    }
}

