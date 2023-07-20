import './Dashboard.css';
import React, {useState} from "react";
import {CloseOutlined} from '@ant-design/icons';
import GenUtils from "../utils/GenUtils";
import {Checkbox} from "antd/lib";
import {CheckboxChangeEvent} from "antd/es/checkbox";


interface TodoItem {
    message: string;
    checked: boolean;
}

const Dashboard = () => {
    const [todos, setTodos] = useState<TodoItem[]>([])
    const [newItem, setNewItem] = useState('' as string)
    const [checked, setChecked] = useState(false)

    const [completedButton, setCompletedButton] = useState(false)
    const [activeButton, setActiveButton] = useState(false)

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && newItem.trim() !== "") {
            setTodos([...todos, {message: newItem, checked: false}]);
            setNewItem("");
        }
    };
    console.log(todos)

    const DeleteItem = (index: number) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    const onChange = (e: CheckboxChangeEvent, index: any) => {
        const newTodos = [...todos];
        newTodos[index].checked = e.target.checked;
        setTodos(newTodos);
    }
    const applyFilters = (todo: any) => {
        if (!completedButton && !activeButton) {
            return todo;
        }
        if (completedButton) {
            return todo.checked;
        }
        if (activeButton) {
            return !todo.checked
        }
        return todo;
    }
    const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);

    return (
        <div className={'container'}>
            <div className={'header'}>
                todos
            </div>
            <input
                value={newItem}
                className={'input'}
                placeholder='What needs to be done?'
                onChange={(e) =>
                    setNewItem(e.target.value)
                }
                onKeyPress={handleKeyPress}
            />
            {
                todos.filter(applyFilters).map((todo, index) => (
                    <div
                        key={index}
                        className={'listItem'}
                        onMouseEnter={() => setHoveredItemIndex(index)}
                        onMouseLeave={() => setHoveredItemIndex(null)}
                    >
                        <Checkbox
                            checked={todo.checked}
                            style={{
                                flex: 1,
                                justifyContent: 'flex-start',
                                display: 'flex',
                                gap: 10,
                                borderRadius: '50%',
                            }}
                            onChange={(e) => {
                                onChange(e, index)
                            }}
                        >{GenUtils.capitalizeFirstLetter(todo.message)}</Checkbox>
                        {hoveredItemIndex === index &&
                            <CloseOutlined
                            onClick={() => DeleteItem(index)}
                            style={{color: 'IndianRed', padding:'0 10px'}}/>
                        }
                    </div>
                ))}
            {todos.length ?
                <div className={'filters'}>
                    <p style={{position: 'absolute'}}>{todos.length} items left</p>
                    <div style={{display: 'flex', justifyContent: 'center', flex: 1}}>
                        <button
                            className={'filterButtons' + (!activeButton && !completedButton ? ' active' : '')}
                            onClick={() => {
                                setCompletedButton(false)
                                setActiveButton(false)
                            }}
                        >All
                        </button>
                        <button
                            className={'filterButtons' + (activeButton ? ' active' : '')}
                            onClick={() => {
                                setActiveButton(v => !v)
                                setCompletedButton(false)
                            }}
                        >Active
                        </button>
                        <button
                            className={'filterButtons' + (completedButton ? ' active' : '')}
                            onClick={() => {
                                setCompletedButton(v => !v)
                                setActiveButton(false)
                            }}>Completed
                        </button>
                    </div>
                </div>
                : null
            }
        </div>
    )
};

export default Dashboard;