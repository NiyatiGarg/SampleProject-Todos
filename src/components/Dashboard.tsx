import './Dashboard.css';
import React, {useState} from "react";
// import {DeleteOutlined} from "@ant-design/icons";
import {CloseOutlined} from '@ant-design/icons';

const Dashboard = () => {
    const [newItem, setNewItem] = useState('')
    const [todos, setTodos] = useState([] as string[])

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            setTodos([...todos, newItem]);
            setNewItem('');
        }
    };

    return (
        <div className={'container'}>
            <div className={'header'}>
                todos
            </div>
            <input
                value={newItem}
                className={'input'}
                placeholder='What needs to be done?'
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            {
                todos.map((todos, index) => (
                    <div
                        key={index}
                        // style={{display: 'flex'}}
                        className={'listItem'}
                    >
                        <div style={{flex: 0, padding: 10}}>o</div>
                        <p style={{flex: 1}}>{todos}</p>
                        <CloseOutlined style={{color: 'IndianRed', padding: 10}}/>
                    </div>
                ))
            }
        </div>
    )
};

export default Dashboard;