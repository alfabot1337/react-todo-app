import React, { Component } from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import ToDoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import AddItemPanel from '../add-item-panel/add-item-panel';

import './app.css';

export default class App extends Component {
    state = {
        toDoData: [
            { label: 'Kiss Alyona', id: 0, done: false, important: false },
            { label: 'Join EPAM', id: 1, done: false, important: true },
            { label: 'Smoke a sigarette', id: 2, done: false, important: false }
        ],
        term: '',
        prop: 'all'
    };

    deleteItem = (id) => {
        this.setState(({ toDoData }) => {
            const newArr = toDoData.filter((item) => item.id !== id);

            return {
                toDoData: newArr
            };
        });
    };

    createToDoItem(label) {
        const [{ id: newId }] = this.state.toDoData[0]
            ? this.state.toDoData.slice(-1)
            : [{ id: 0 }];

        // const newId = 1;
        return {
            label,
            id: newId + 1,
            done: false,
            important: false
        };
    }

    addItem = (text) => {
        if (!text) {
            alert('Nothing to add :(');
            return;
        }
        const newItem = this.createToDoItem(text);
        this.setState(({ toDoData }) => {
            const newToDoData = [...toDoData, newItem];

            return { toDoData: newToDoData };
        });
    };

    switchProp = (arr, id, property) => {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = { ...oldItem, [property]: !oldItem[property] };

        const newArr = [...arr];
        newArr.splice(idx, 1, newItem);

        return newArr;
    };

    onToggleDone = (id) => {
        this.setState(({ toDoData }) => {
            return {
                toDoData: this.switchProp(toDoData, id, 'done')
            };
        });
    };
    onToggleImportant = (id) => {
        this.setState(({ toDoData }) => {
            return {
                toDoData: this.switchProp(toDoData, id, 'important')
            };
        });
    };

    search = (items, term) => {
        return items.filter((item) =>
            item.label.toLowerCase().includes(term.toLowerCase())
        );
    };
    onChangeValue = (term) => {
        this.setState({
            term
        });
    };

    filter1 = (items, prop) => {
        switch (prop) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    };
    onFilterChange = (prop) => {
        this.setState({
            prop
        });
    };

    render() {
        const { toDoData, term, prop } = this.state;
        const doneCount = toDoData.filter((item) => item.done).length;
        const toDoCount = toDoData.length - doneCount;
        const itemsToVisible = this.filter1(this.search(toDoData, term), prop);

        return (
            <div className="todo">
                <AppHeader toDo={toDoCount} done={doneCount} />
                <div className="item-control d-flex">
                    <SearchPanel onChangeValue={this.onChangeValue} />
                    <ItemStatusFilter
                        prop={prop}
                        onFilterChange={this.onFilterChange}
                    />
                </div>
                <ToDoList
                    toDoData={itemsToVisible}
                    onDeleted={this.deleteItem}
                    onToggleDone={this.onToggleDone}
                    onToggleImportant={this.onToggleImportant}
                />
                <AddItemPanel onItemAdded={this.addItem} />
            </div>
        );
    }
}
