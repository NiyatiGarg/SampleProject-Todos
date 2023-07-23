import './Dashboard.css';
import React, {useState} from "react";
import {CloseOutlined, DownOutlined} from '@ant-design/icons';
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

    const [dropdownOpen, setDropdownOpen] = useState(true);
    const [completedButton, setCompletedButton] = useState(false)
    const [activeButton, setActiveButton] = useState(false)

    const [editing, setEditing] = useState(false);
    const [newInputValue, setNewInputValue] = useState('')


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
    const [doubleClickedItemIndex, setDoubleClickedItemIndex] = useState<number | null>(null);

    const ClearCompleted = (todos: any) => {
        const active = todos.filter((todo: any) => !todo.checked)
        const newTodos = [...todos];
        newTodos.splice(active, active.length);
        setTodos(active);
    }

    const UpdateItem = (index: number, newMessage: string) => {
        const newTodos = [...todos];
        newTodos[index].message = newMessage;
        setTodos(newTodos);
        setEditing(false);
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
                                key={index}
                                className={todo.checked ? 'completed' : 'listItem'}
                                onMouseEnter={() => setHoveredItemIndex(index)}
                                onMouseLeave={() => setHoveredItemIndex(null)}
                                onDoubleClick={() => {setEditing(true)
                                    setDoubleClickedItemIndex(index)}}
                            >{
                                doubleClickedItemIndex === index && editing ?
                                <input
                                    style={{
                                        display: 'flex',
                                        padding: '14px',
                                        margin: '0 -5px 0 25px',
                                        border: '1px solid #a09f9f',
                                        boxShadow: 'inset 0px 0px 2px 2px rgba(0.1, 0.1, 0.1, 0.1)',
                                        width: '100%'

                                    }}
                                    value={newInputValue}
                                    onChange={(e) => setNewInputValue(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            UpdateItem(index, newInputValue);
                                        }
                                    }}
                                /> :
                                <div style={{display:'flex'}}>
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
                                    >

                                        {GenUtils.capitalizeFirstLetter(todo.message)}
                                    </Checkbox>
                                    {hoveredItemIndex === index && !editing &&
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