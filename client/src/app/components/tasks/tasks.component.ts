import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import {Task} from '../../../task';

@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: 'tasks.component.html'
})

export class TasksComponent {
  tasks: Task[];
  title: string;
  constructor(private taskService: TaskService) {
    this.taskService.getTask().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  addTask(event: any) {
    //alert('add Task');
    event.preventDefault();
    //console.log(this.title);
    
    var newTask = {
      title: this.title,
      isDone: false

    }


    //this.taskService.addTask(newTask).subscribe();
    //this.tasks.push(newTask);
    this.taskService.addTask(newTask)
      .subscribe(task => {
        this.tasks.push(task);
        this.title = '';
      });
  }

  deleteTask(id: any) {
    //this.taskService.deleteTask(id)
    var tasks = this.tasks;
    //this.taskService.deleteTask(id).subscribe(data => {
    this.taskService.deleteTask(id)
      .subscribe(data => {
        if (data['n'] == 1) {
          for (var i = 0; i < tasks.length; i++) {
            if (tasks[i]['_id'] == id) {
              tasks.splice(i, 1);
            }
          }
        }
      })

  }

  updateStatus(task:any){
    var _task = {
        _id:task._id,
        title: task.title,
        isDone: !task.isDone
    };

    this.taskService.updateStatus(_task).subscribe(data => {
        task.isDone = !task.isDone;
    });
    }

  // updateStatus(task: any) {
  //   //var tasks = this.tasks;
  //   var _task = {
  //     _id: task._id,
  //     title: task.title,
  //     isDone: !task.isDone
  //   }
  //
  //   this.taskService.updateStatus(_task)
  //     .subscribe(data => {
  //       task.isDone = !task.isDone
  //     });
  // }
};
