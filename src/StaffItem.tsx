import React from 'react';
import Staff from "./repo/Staff";
import StaffRepo from "./repo/StaffRepo";

interface IStaffItemProps {
    item?: Staff;

    removeStaffItem?(key: number): StaffRepo;

    detailStaffItem?(key: number): StaffRepo;
}

interface IStaffItemState {

}

export default class StaffItem extends React.Component<IStaffItemProps, IStaffItemState> {

    constructor(props: {} | Readonly<{}>) {
        super(props);
    }

    // Delete
    handleDelete() {
        this.props.removeStaffItem(this.props.item.key);
    }

    // Detail
    handleDetail() {
        this.props.detailStaffItem(this.props.item.key);
    }

    render() {
        return (
            <tr
                style={{'cursor': 'pointer'}}
            >
                <td className='itemTd'>{this.props.item.name}</td>
                <td className='itemTd'>{this.props.item.age}</td>
                <td className='itemTd'>{this.props.item.id}</td>
                <td className='itemTd'>{this.props.item.sex}</td>
                <td className='itemTd'>
                    <a className="itemBtn" onClick={this.handleDelete.bind(this)}>删除</a>
                    <a className="itemBtn" onClick={this.handleDetail.bind(this)}>详情</a>
                </td>
            </tr>
        );
    }

}