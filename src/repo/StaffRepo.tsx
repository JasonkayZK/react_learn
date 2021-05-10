import Staff from "./Staff";

export default class StaffRepo {
    allStaff: Staff[];
    staff: Staff[];
    // 0-身份 1-年龄升 2-年龄降
    sortType: number = 0;
    // 0-all 1-主任 2-老师 3-学生 4-实习
    filterType: number = 0;
    // 搜索关键字
    keyword: string = '';

    constructor() {
        // 模拟数据库
        this.allStaff = [
            new Staff('张三', 20, '男', '主任', '我是一匹来自远方的狼。'),
            new Staff('赵静', 21, '女', '学生', '我是一匹来自远方的狼。'),
            new Staff('王二麻', 20, '女', '学生', '我是一匹来自远方的狼。'),
            new Staff('李晓婷', 20, '女', '实习', '我是一匹来自远方的狼。'),
            new Staff('张春田', 20, '男', '实习', '我是一匹来自远方的狼。'),
            new Staff('刘建国', 20, '男', '主任', '我是一匹来自远方的狼。'),
            new Staff('张八', 20, '男', '老师', '我是一匹来自远方的狼。'),
            new Staff('李四', 20, '男', '老师', '我是一匹来自远方的狼。'),
            new Staff('王五', 20, '男', '主任', '我是一匹来自远方的狼。'),
            new Staff('赵六', 20, '男', '实习', '我是一匹来自远方的狼。'),
            new Staff('孙七', 20, '男', '实习', '我是一匹来自远方的狼。'),
        ];
        this.staff = [];
        this.sortType = 0;
        this.filterType = 0;
        this.keyword = '';
        this._sortStaff(this.sortType);
        this._filterStaff(this.filterType);
    }

    // 增
    public addStaffItem(item: Staff): StaffRepo {
        this.allStaff.push(item);
        //排序 筛选 搜索过滤
        this._sortStaff(this.sortType);
        this._filterStaff(this.filterType);
        this._searchStaff(this.keyword);
        return this;
    }

    // 删
    public removeStaffItem(key: number): StaffRepo {
        this.allStaff = this.allStaff.filter(item => {
            return item.key != key;
        });

        // 筛选 搜多过滤
        this._filterStaff(this.filterType);
        this._searchStaff(this.keyword);

        return this;
    }

    // 改
    public editStaffItem(item: Staff) {
        this.allStaff.forEach(staffItem => {
            if (staffItem.key == item.key) {
                staffItem.name = item.name;
                staffItem.sex = item.sex;
                staffItem.age = item.age;
                staffItem.id = item.id;
                staffItem.description = item.description;
            }
        });
        this._sortStaff(this.sortType);
        this._filterStaff(this.filterType);
        this._searchStaff(this.keyword);
        return this;
    }

    public filterStaff(filterType: number): StaffRepo {
        this._filterStaff(filterType);
        this._searchStaff(this.keyword);
        return this;
    }

    public sortStaff(sortType: number): StaffRepo {
        this._sortStaff(sortType);
        this._filterStaff(this.filterType);
        this._searchStaff(this.keyword);
        return this;
    }

    public searchStaff(keyword: string): StaffRepo {
        this._filterStaff(this.filterType);
        this._searchStaff(keyword);
        return this;
    }

    // 筛选
    _filterStaff(filterType: number) {
        this.filterType = filterType;
        switch (filterType) {
            case 0:
                this.staff = this.allStaff;
                break;
            case 1:
                this.staff = this.allStaff.filter(item => {
                    return item.id == '主任';
                });
                break;
            case 2:
                this.staff = this.allStaff.filter(item => {
                    return item.id == '老师';
                });
                break;
            case 3:
                this.staff = this.allStaff.filter(item => {
                    return item.id == '学生';
                });
                break;
            case 4:
                this.staff = this.allStaff.filter(item => {
                    return item.id == '实习';
                });
                break;
            default:
                break;
        }
    }

    // 排序
    _sortStaff(sortType: number) {
        this.sortType = sortType;
        switch (sortType) {
            case 0: // 身份
                this.allStaff.forEach(item => {
                    switch (item.id) {
                        case '主任':
                            item.id = '1';
                            break;
                        case '老师':
                            item.id = '2';
                            break;
                        case '学生':
                            item.id = '3';
                            break;
                        case '实习':
                            item.id = '4';
                            break;
                        default:
                            break;
                    }
                });
                this.allStaff.sort(function (item1, item2) {
                    if (item1.id < item2.id)
                        return -1;
                    else if (item1.id > item2.id)
                        return 1;
                    else
                        return 0;
                });
                this.allStaff.forEach(item => {
                    switch (item.id) {
                        case '1':
                            item.id = '主任';
                            break;
                        case '2':
                            item.id = '老师';
                            break;
                        case '3':
                            item.id = '学生';
                            break;
                        case '4':
                            item.id = '实习';
                            break;
                        default:
                            break;
                    }
                });
                break;
            case 1: //年龄升
                this.allStaff.sort(function (item1, item2) {
                    if (item1.age < item2.age)
                        return -1;
                    else if (item1.age > item2.age)
                        return 1;
                    else
                        return 0;
                });
                break;
            case 2: //年龄降
                this.allStaff.sort(function (item1, item2) {
                    if (item1.age < item2.age)
                        return 1;
                    else if (item1.age > item2.age)
                        return -1;
                    else
                        return 0;
                });
                break;
            default:
                break;
        }
    }

    // 搜索
    _searchStaff(keyword: string) {
        this.keyword = keyword;
        //在staff中搜索
        this.staff = this.staff.filter(item => {
            return item.name.indexOf(keyword) != -1 ||
                (item.age + '').indexOf(keyword) != -1 ||
                item.id.indexOf(keyword) != -1 ||
                item.sex.indexOf(keyword) != -1;
        });
    }

}
