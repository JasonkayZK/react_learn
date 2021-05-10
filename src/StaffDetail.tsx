import React from 'react';
import ReactDOM from 'react-dom';
import Staff from "./repo/Staff";
import StaffRepo from "./repo/StaffRepo";

interface IStaffDetailProps {
    staffDetail: Staff;


    editDetail(item: Staff): StaffRepo;

    closeDetail(): StaffRepo;
}

interface IStaffDetailState {

}

export default class StaffDetail extends React.Component<IStaffDetailProps, IStaffDetailState> {
    name?: string
    age?: number
    sex?: string
    id?: string
    description?: string
    key?: number

    handlerEdit() {
        let item = new Staff();
        let editTable = ReactDOM.findDOMNode(this.refs.editTabel);

        let sex: HTMLSelectElement;
        let id: HTMLSelectElement;

        if ("querySelector" in editTable) {
            sex = editTable.querySelector('#staffEditSex');
        }
        if ("querySelector" in editTable) {
            id = editTable.querySelector('#staffEditId') as HTMLSelectElement;
        }
        if ("querySelector" in editTable) {
            item.name = editTable.querySelector('#staffEditName').nodeValue.trim();
        }
        if ("querySelector" in editTable) {
            item.age = Number(editTable.querySelector('#staffEditAge').nodeValue.trim());
        }
        if ("querySelector" in editTable) {
            item.description = editTable.querySelector('#staffEditDescription').nodeValue.trim();
        }
        item.sex = sex.options[sex.selectedIndex].value;
        item.id = id.options[id.selectedIndex].value;
        item.key = this.props.staffDetail.key;

        // 表单验证
        if (item.name == '' || item.description == '') {
            let tips = ReactDOM.findDOMNode(this.refs.DtipsUnDone) as HTMLElement;
            tips.style.display = 'block';
            setTimeout(function () {
                tips.style.display = 'none';
            }, 1000);
            return;
        }
        //非负整数
        let numReg = /^\d+$/;
        // @ts-ignore
        if (!numReg.test(String(item.age)) || parseInt(item.age) > 150) {
            let tips = ReactDOM.findDOMNode(this.refs.DtipsUnAge) as HTMLElement;
            tips.style.display = 'block';
            setTimeout(function () {
                tips.style.display = 'none';
            }, 1000);
            return;
        }

        this.props.editDetail(item);

        // 此处应在返回修改成功信息后确认
        let tips = ReactDOM.findDOMNode(this.refs.Dtips) as HTMLElement;
        tips.style.display = 'block';
        setTimeout(function () {
            tips.style.display = 'none';
        }, 1000);
    }

    handlerClose() {
        this.props.closeDetail();
    }

    componentDidUpdate() {
        if (this.props.staffDetail == null) {
        } else {
            let selSex = ReactDOM.findDOMNode(this.refs.selSex) as HTMLSelectElement;
            for (let i = 0; i < selSex.options.length; i++) {
                if (selSex.options[i].value == this.props.staffDetail.sex) {
                    selSex.options[i].selected = Boolean('selected');
                    break;
                }
            }
            let selId = ReactDOM.findDOMNode(this.refs.selId) as HTMLSelectElement;
            for (let i = 0; i < selId.options.length; i++) {
                if (selId.options[i].value == this.props.staffDetail.id) {
                    selId.options[i].selected = Boolean('selected');
                    break;
                }
            }
        }
    }

    render() {
        let staffDetail = this.props.staffDetail;
        if (!staffDetail) {
            return null;
        }

        let style1 = {
            textAlign: 'center' as const
        }

        return (
            <div className="overLay">
                <h4 style={style1}>点击'完成'保存修改,点击'关闭'放弃未保存修改并退出.</h4>
                <hr/>
                <table ref="editTable">
                    <tbody>
                    <tr>
                        <th>姓名</th>
                        <td><input id='staffEditName' type="text" defaultValue={staffDetail.name}/></td>
                    </tr>
                    <tr>
                        <th>年龄</th>
                        <td><input id='staffEditAge' type="text" defaultValue={staffDetail.age}/></td>
                    </tr>
                    <tr>
                        <th>性别</th>
                        <td>
                            <select ref='selSex' id='staffEditSex'>
                                <option value="男">男</option>
                                <option value="女">女</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>身份</th>
                        <td>
                            <select ref="selId" id='staffEditId'>
                                <option value="主任">主任</option>
                                <option value="老师">老师</option>
                                <option value="学生">学生</option>
                                <option value="实习">实习</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>个人描述</th>
                        <td><textarea id='staffEditDescription'
                                      defaultValue={staffDetail.description}/></td>
                    </tr>
                    </tbody>
                </table>
                <p ref='Dtips' className='tips'>修改成功</p>
                <p ref='DtipsUnDone' className='tips'>请录入完整的人员信息</p>
                <p ref='DtipsUnAge' className='tips'>请录入正确的年龄</p>
                <button onClick={this.handlerEdit.bind(this)}>完成</button>
                <button onClick={this.handlerClose.bind(this)}>关闭</button>
            </div>
        );
    }

}