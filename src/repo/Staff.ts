let staffItemKey = 0;

export default class Staff {
    name?: string
    age?: number
    sex?: string
    id?: string
    description?: string
    key?: number

    constructor(name?: string, age?: number, sex?: string, id?: string, description?: string) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.id = id;
        this.description = description;
        this.key = staffItemKey++;
    }

}
