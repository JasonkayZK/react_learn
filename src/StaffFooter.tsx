import React from 'react';
import ReactDOM from 'react-dom';
import Staff from "./repo/Staff";

interface IStaffFooterProps {
    addStaffItem(item: Staff): void;
}

interface IStaffFooterState {

}

export default class StaffFooter extends React.Component<IStaffFooterProps, IStaffFooterState> {
    handlerAddClick(evt: React.MouseEvent) {
        evt.preventDefault();
        let item = new Staff();
        let addForm = ReactDOM.findDOMNode(this.refs.addForm) as HTMLFormElement;

        let sex: HTMLSelectElement;
        let id: HTMLSelectElement;

        if ("querySelector" in addForm) {
            sex = addForm.querySelector('#staffAddSex');
        }
        if ("querySelector" in addForm) {
            id = addForm.querySelector('#staffAddId');
        }
        if ("querySelector" in addForm) {
            item.name = addForm.querySelector('#staffAddName').nodeValue.trim();
        }
        if ("querySelector" in addForm) {
            item.age = Number(addForm.querySelector('#staffAddAge').nodeValue.trim());
        }
        if ("querySelector" in addForm) {
            item.description = addForm.querySelector('#staffAddDescription').nodeValue.trim();
        }
        item.sex = sex.options[sex.selectedIndex].value;
        item.id = id.options[id.selectedIndex].value;

        /*
         *表单验证
         */
        if (item.name == '' || item.description == '') {
            let tips = ReactDOM.findDOMNode(this.refs.tipsUnDone) as HTMLElement;
            tips.style.display = 'block';
            setTimeout(function () {
                tips.style.display = 'none';
            }, 1000);
            return;
        }
        //非负整数
        let numReg = /^\d+$/;
        if (!numReg.test(String(item.age)) || item.age > 150) {
            let tips = ReactDOM.findDOMNode(this.refs.tipsUnAge) as HTMLElement;
            tips.style.display = 'block';
            setTimeout(function () {
                tips.style.display = 'none';
            }, 1000);
            return;
        }

        this.props.addStaffItem(item);
        addForm.reset();

        //此处应在返回添加成功信息后确认
        let tips = ReactDOM.findDOMNode(this.refs.tips) as HTMLElement;
        tips.style.display = 'block';
        setTimeout(function () {
            tips.style.display = 'none';
        }, 1000);
    }

    render() {
        let style1 = {
            textAlign: 'center' as const
        }

        return (
            <div>
                <h4 style={style1}>人员新增</h4>
                <hr/>
                <form ref='addForm' className="addForm">
                    <div>
                        <label form='staffAddName' style={{'display': 'block'}}>姓名</label>
                        <input ref='addName' id='staffAddName' type='text' placeholder='Your Name'/>
                    </div>
                    <div>
                        <label form='staffAddAge' style={{'display': 'block'}}>年龄</label>
                        <input ref='addAge' id='staffAddAge' type='text' placeholder='Your Age(0-150)'/>
                    </div>
                    <div>
                        <label form='staffAddSex' style={{'display': 'block'}}>性别</label>
                        <select ref='addSex' id='staffAddSex'>
                            <option value='男'>男</option>
                            <option value='女'>女</option>
                        </select>
                    </div>
                    <div>
                        <label form='staffAddId' style={{'display': 'block'}}>身份</label>
                        <select ref='addId' id='staffAddId'>
                            <option value='主任'>主任</option>
                            <option value='老师'>老师</option>
                            <option value='学生'>学生</option>
                            <option value='实习'>实习</option>
                        </select>
                    </div>
                    <div>
                        <label form='staffAddDescription' style={{'display': 'block'}}>个人描述</label>
                        <textarea ref='addDescription' id='staffAddDescription' />
                    </div>
                    <p ref="tips" className='tips'>提交成功</p>
                    <p ref='tipsUnDone' className='tips'>请录入完整的人员信息</p>
                    <p ref='tipsUnAge' className='tips'>请录入正确的年龄</p>
                    <div>
                        <button onClick={this.handlerAddClick.bind(this)}>提交</button>
                    </div>
                </form>
            </div>
        )
    }
}
