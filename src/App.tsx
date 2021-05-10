import React from 'react';
import StaffHeader from './StaffHeader';
import StaffItemPanel from './StaffItemPanel';
import StaffFooter from './StaffFooter';
import StaffDetail from './StaffDetail';

import Staff from "./repo/Staff";
import StaffRepo from "./repo/StaffRepo";

import './App.css';


class myState {
    staffRepo: StaffRepo
    staffDetail: Staff

    constructor(staffRepo: StaffRepo, staffDetail: Staff) {
        this.staffRepo = staffRepo;
        this.staffDetail = staffDetail;
    }
}

class App extends React.Component<{}, myState> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            staffRepo: new StaffRepo(),
            staffDetail: null,
        };
    }

    //增
    addStaffItem(item: Staff): StaffRepo {
        this.setState({
            staffRepo: this.state.staffRepo.addStaffItem(item)
        });
        return this.state.staffRepo;
    }

    // 删
    removeStaffItem(key: number): StaffRepo {
        this.setState({
            staffRepo: this.state.staffRepo.removeStaffItem(key)
        });
        return this.state.staffRepo;
    }

    /* 详情 */

    // 打开
    detailStaffItem(key: number): StaffRepo {
        this.setState({
            staffDetail: this.state.staffRepo.staff.filter(item => {
                return item.key == key;
            })[0]
        });
        return this.state.staffRepo;
    }

    // 关闭
    closeDetail(): StaffRepo {
        this.setState({
            staffDetail: null
        });
        return this.state.staffRepo;
    }

    // 编辑
    editDetail(item: Staff): StaffRepo {
        this.setState({
            staffRepo: this.state.staffRepo.editStaffItem(item)
        });
        return this.state.staffRepo;
    }

    /* 排序 */
    public sortStaff(sortType: number): StaffRepo {
        this.setState({
            staffRepo: this.state.staffRepo.sortStaff(sortType)
        });
        return this.state.staffRepo;
    }

    /*
     * 筛选
     */
    public filterStaff(filterType: number): StaffRepo {
        this.setState({
            staffRepo: this.state.staffRepo.filterStaff(filterType)
        });
        return this.state.staffRepo;
    }

    /* 搜索 */
    public searchStaff(keyword: string): StaffRepo {
        this.setState({
            staffRepo: this.state.staffRepo.searchStaff(keyword)
        });
        return this.state.staffRepo;
    }

    render() {
        return (
            <div className="App">
                <StaffHeader sortStaff={this.sortStaff.bind(this)}
                             filterStaff={this.filterStaff.bind(this)}
                             searchStaff={this.searchStaff.bind(this)}/>
                <StaffItemPanel items={this.state.staffRepo.staff}
                                removeStaffItem={this.removeStaffItem.bind(this)}
                                detailStaffItem={this.detailStaffItem.bind(this)}/>
                <StaffFooter addStaffItem={this.addStaffItem.bind(this)}/>
                <StaffDetail staffDetail={this.state.staffDetail}
                             closeDetail={this.closeDetail.bind(this)}
                             editDetail={this.editDetail.bind(this)}/>
            </div>
        );
    }

}

export default App;
