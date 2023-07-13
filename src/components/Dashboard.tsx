import './Dashboard.css';
import React, {useState} from "react";
import {} from ''

const Dashboard = () => {
    const [newItem, setNewItem] = useState('')
    const [todos, setTodos] = useState([] as string[])

    const handleKeyPress = (event: any) => {
        console.log(event)
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
            <input className={'input'} placeholder='What needs to be done?'
                   onChange={(e) => setNewItem(e.target.value)}
                   onKeyPress={handleKeyPress}
            />

            {
                todos.map((todos, index) => (
                    <div key={index}>
                        {todos}
                        <DeleteOutlined />
                    </div>
                ))
            }

        </div>
    )
}

export default Dashboard;