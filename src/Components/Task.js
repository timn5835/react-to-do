import React, { Component } from 'react';

class Task extends Component {
	constructor(props) {
		super(props);
		this.state= {
			val: props.value
		}

		this.getInput = this.getInput.bind(this);
	}

	getInput(event) {
		this.setState({
			val: event.target.value
		});
	}

	render() {
		let {id, editTask, value, isEditing, startStopEditing, deleteTask} = this.props,
			{val} = this.state,
			{getInput} = this;

		return (
			<li>
				<div>
					<span  className={(isEditing) ? 'editing' : ''} onClick={ () => {startStopEditing(id); this.textField.value=value} } ref={(span) => this.taskLabel = span}>{value}</span>
					<input type="text" onChange={getInput} ref={(input) => this.textField = input}/>
					<div>
						<button onClick={() => editTask(id, val, this.taskLabel)}>save</button>
						<button onClick={() => startStopEditing(-1) }>cancel</button>
						<button onClick={() => deleteTask(id)}>delete</button>
					</div>
				</div>
			</li>
		);
	}
}

export default Task;