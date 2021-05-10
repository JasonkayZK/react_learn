import React from 'react';
import ReactDOM from 'react-dom';
import StaffRepo from "./repo/StaffRepo";

interface IStaffHeaderProps {
    sortStaff(sortType: number): StaffRepo;

    filterStaff(filterType: number): StaffRepo;

    searchStaff(keyword: string): StaffRepo;
}

interface IStaffHeaderState {

}

export default class StaffHeader extends React.Component<IStaffHeaderProps, IStaffHeaderState> {

    //排序
    handlerOrderChange() {
        let sel = ReactDOM.findDOMNode(this.refs.selOrder) as HTMLSelectElement;
        let selValue = sel.options[sel.selectedIndex].value;
        this.props.sortStaff(Number(selValue));
    }

    //筛选
    handlerIdChange() {
        let sel = ReactDOM.findDOMNode(this.refs.selId) as HTMLSelectElement;
        let selValue = sel.options[sel.selectedIndex].value;
        this.props.filterStaff(Number(selValue));
    }

    //search
    handlerSearch() {
        let bar = ReactDOM.findDOMNode(this.refs.searchBar);
        let value = bar.nodeValue;
        this.props.searchStaff(value);
    }

    render() {
        let style1 = {
            textAlign: "center" as const
        };

        return (
            <div>
                <h3 style={style1}>人员管理系统</h3>
                <table className="optHeader">
                    <tbody>
                    <tr>
                        <td className="headerTd"><input ref='searchBar' onChange={this.handlerSearch.bind(this)}
                                                        type='text' placeholder='Search...'/></td>
                        <td className="headerTd">
                            <label form='idSelect'>人员筛选</label>
                            <select id='idSelect' ref="selId" onChange={this.handlerIdChange.bind(this)}>
                                <option value='0'>全部</option>
                                <option value='1'>主任</option>
                                <option value='2'>老师</option>
                                <option value='3'>学生</option>
                                <option value='4'>实习</option>
                            </select>
                        </td>
                        <td>
                            <label form='orderSelect'>排列方式</label>
                            <select id='orderSelect' ref="selOrder" onChange={this.handlerOrderChange.bind(this)}>
                                <option value='0'>身份</option>
                                <option value='1'>年龄升</option>
                                <option value='2'>年龄降</option>
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}