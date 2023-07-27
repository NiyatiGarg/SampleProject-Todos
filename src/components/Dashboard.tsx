import React, {useState} from "react";
import GenUtils from "../utils/GenUtils";

import {CloseOutlined, DownOutlined} from '@ant-design/icons';
import {Checkbox} from "antd/lib";
import {CheckboxChangeEvent} from "antd/es/checkbox";

import './Dashboard.css';

interface TodoItem {
    key: number;
    message: string;
    checked: boolean;
}

const Dashboard = () => {
    const [todos, setTodos] = useState<TodoItem[]>([])
    const [newItem, setNewItem] = useState('' as string)
    const [checked, setChecked] = useState(false)

    const [dropdownOpen, setDropdownOpen] = useState(true);
    const [completedButton, setCompletedButton] = useState(false)
    const [activeButton, setActiveButton] = useState(false)

    const [editing, setEditing] = useState(false);
    const [newInputValue, setNewInputValue] = useState('')


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && newItem.trim() !== "") {
            setTodos([...todos, {key: Date.now(),message: newItem, checked: false}]);
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
    const [doubleClickedItemIndex, setDoubleClickedItemIndex] = useState<number | null>(null);

    const ClearCompleted = (todos: any) => {
        const active = todos.filter((todo: any) => !todo.checked)
        const newTodos = [...todos];
        newTodos.splice(active, active.length);
        setTodos(active);
    }

    const UpdateItem = (key: number, newMessage: string) => {
        const newTodos = [...todos];
        const selectedTodo = todos.find(t => t.key === key);
        let index = -1;
        if (selectedTodo) {
            index = todos.indexOf(selectedTodo);
            newTodos.splice(index, 1, { ...selectedTodo, message: newMessage , key: key});
            setTodos(newTodos);
            setEditing(false);
        }
        if (newMessage.trim() === "") {
            // Don't update the item if the new message is empty or contains only whitespaces
            return;
        }
    }

    return (
        <div className={'container'}>
            <div className={'header'}>
                todos
            </div>
            <div className={'content-parent'}>
                <div className={'input-parent'}>
                    <DownOutlined className={'icon'} onClick={() => setDropdownOpen(prevState => !prevState)}/>
                    <input
                        className={'input'}
                        value={newItem}
                        placeholder='What needs to be done?'
                        onChange={(e) =>
                            setNewItem(e.target.value)
                        }
                        onKeyPress={handleKeyPress}
                    />
                </div>
                {dropdownOpen && <div>
                    {
                        todos.filter(applyFilters).map((todo, index) => (
                            <div
                                key={todo.key}
                                className={todo.checked && !editing ? 'completed' : 'listItem'}
                                onMouseEnter={() => setHoveredItemIndex(index)}
                                onMouseLeave={() => setHoveredItemIndex(null)}
                                onClick={()=> {
                                    if (index !== doubleClickedItemIndex) {
                                        setEditing(false);
                                    }
                                }
                                }
                                onDoubleClick={() => {setEditing(true)
                                    setDoubleClickedItemIndex(index)}}
                            >{
                                doubleClickedItemIndex === index && editing ?
                                <input
                                    className={'edit-input'}
                                    placeholder={todo.message}
                                    value={newInputValue}
                                    onChange={(e) => setNewInputValue(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            UpdateItem(todo.key, newInputValue);
                                        }
                                    }}
                                /> :
                                <div style={{display:'flex', width: '100%', alignItems: 'center'}}>
                                    <Checkbox
                                        checked={todo.checked}
                                        style={{
                                            justifyContent: 'flex-start',
                                            gap: 10,
                                            borderRadius: '50%',
                                        }}
                                        onChange={(e) => {
                                            onChange(e, index)
                                        }}
                                    />
                                    <p style={{display:'flex', flex:1 }}>{GenUtils.capitalizeFirstLetter(todo.message)}</p>
                                    {hoveredItemIndex === index &&
                                    <CloseOutlined
                                        onClick={() => DeleteItem(index)}
                                        style={{color: 'IndianRed', padding: '0 10px'}}/>
                                    }
                                </div>
                            }
                            </div>
                        ))
                    }
                    {todos.length ?
                        <div className={'filters'}>
                            <p style={{
                                position: 'absolute',
                                padding: 5
                            }}>{todos.filter(todo => !todo.checked).length} items
                                left</p>
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
                            {
                                todos.filter(todo => todo.checked).length ?
                                    <button className={'filterButtons'}
                                            onClick={() => ClearCompleted(todos)}>
                                        Clear completed
                                    </button> : ''
                            }
                        </div>
                        : null
                    }
                </div>
                }
            </div>
        </div>
    )
};

export default Dashboard;