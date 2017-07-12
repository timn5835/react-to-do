import React, { Component } from 'react';
import Task from '../Components/Task';

class List extends Component {
	constructor() {
		super();
		this.state = {
			inputVal: '',
			tasks: []
		};

		this.getInput = this.getInput.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.renderTask = this.renderTask.bind(this);
		this.editTask = this.editTask.bind(this);
		this.startStopEditing = this.startStopEditing.bind(this);
		this.deleteTask = this.deleteTask.bind(this);
	}

	getInput(event) {
		this.setState({
			inputVal: event.target.value,
			tasks: this.state.tasks
		});
	}

	submitHandler(event) {
		event.preventDefault();
		let {tasks, inputVal} = this.state,
			tempInputVal = inputVal.trim();

		if(tempInputVal !== '') {
			// create new object from input value
			// update state
			// clear textfield and inputVal in state
			let newTasks = tasks;
			tasks.push({
				'value': tempInputVal,
				'isEditing': false
			});
			
			this.setState({
				inputVal: '',
				tasks: newTasks
			});
		}
		document.querySelector('input[type=text]').value = '';
	}

	editTask(key, value, label) {
		
		let {tasks, inputVal} = this.state,
			tempTasks = tasks;

		tempTasks[key].value = value;
		tempTasks[key].isEditing = false
		;
		this.setState({
			inputVal: inputVal,
			tasks: tempTasks
		});
	}

	renderTask(key, value) {
		return <Task key={key} id={key} value={value} editTask={this.editTask} isEditing={this.state.tasks[key].isEditing} startStopEditing={this.startStopEditing} deleteTask={this.deleteTask} />;
	}

	startStopEditing(key) {
		let tempTasks = this.state.tasks;
		tempTasks.filter((task, index) => { (index!==key) ? task.isEditing = false : task.isEditing = true; });

		this.setState({
			inputVal: this.state.inputVal,
			tasks: tempTasks
		});
	}

	deleteTask(key) {
		let tempTasks = this.state.tasks;
		tempTasks.splice(key,1);

		this.setState({
			inputVal: this.state.inputVal,
			tasks: tempTasks
		});
	}

	render() {
		let {submitHandler, getInput, renderTask} = this;
		return (
			<main className="List">
				<h1>Todo List</h1>
				<p>Go ahead and add a task below</p>

				<form action="#" onSubmit={submitHandler}>
					<input type="text" placeholder="Begin task..." onChange={getInput} />
					<input type="submit" />
				</form>

				<ul className="List">
					{this.state.tasks.map((task, index) => {
						return renderTask(index, task.value);
					})}
				</ul>
			</main>
		);
	}
}

export default List;