import React, {Component} from 'react';
import {addTask, getTasks, updateTask, deleteTask} from './services/taskServices';

class Tasks extends Component {
    state = { taskjs: [],currentTask: ""}

    async componentDidMount(){
        try {
            const {data} = await getTasks();
            this.setState({tasks:data});
        } catch (error) {
            console.log(error);
        }
    }
    
    handleChange = ({currentTarget: input}) => {
        this.setState({currentTask: input.value});
    }

    handleSubmit = async () =>{
        e.preventDefault();
        const orginalTasks = this.state.tasks
        try {
            const {data} = await addTask({task : this.state.currentTask});
            const tasks = orginalTasks;
            tasks.push(data);
            this.setState({tasks, currentTask: ""});
        } catch (error) {
            console.log(error)
        }
    }

    handleUpdate = async (currentTask) => {
        const orginalTasks = this.state.tasks;
        try {
            const tasks = [...orginalTasks];
            const index = tasks.findIndex((task) => task._id===currentTask);
            tasks[index] = {...tasks[index]};
            tasks[index].completed = !tasks[index].completed;
            this.setState({tasks});
            await updateTask(currentTask, {completed:tasks[index].completed})
        } catch (error) {
            this.setState({tasks:orginalTasks});
            console.log(error);
        }
    }

    handleDelete = async(currentTask) => {
        const orginalTasks = this.state.tasks;
        try {
            const tasks = orginalTasks.filter(
                (task) => task._id !== currentTask
            );
            this.setState({tasks});
            await deleteTask(currentTask);
        } catch (error) {
            this.setState({tasks:orginalTasks});
            console.log(error);
        }
    }

}

export default Tasks;