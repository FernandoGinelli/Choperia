// src/app/todo/todo.component.ts

import { Component, OnInit } from '@angular/core';
import { remult } from 'remult';
import { TasksController } from 'src/shared/TasksController';
import { Task } from '../../shared/Task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  taskRepo = remult.repo(Task)
  tasks: Task[] = []

  newTaskTitle = ""
  async addTask() {
    try {
      const newTask = await this.taskRepo.insert({ title: this.newTaskTitle})
      this.tasks.push(newTask)
      this.newTaskTitle = ""
    } catch (error: any) {
      alert(error.message)
    }
  }


async saveTask(task: Task) {
  try {
    await this.taskRepo.save(task)
  } catch (error: any) {
    alert(error.message)
  }
}
// src/app/todo/todo.component.ts

async deleteTask(task: Task) {
  await this.taskRepo.delete(task);
  this.tasks = this.tasks.filter(t => t !== task);
}

async setAllCompleted(completed: boolean) {
    await TasksController.setAllCompleted(completed);

};


ngOnInit() {
  this.taskRepo.find({
    limit: 20,
    orderBy: { completed:"desc" }
  }).then((items) => (this.tasks = items));
}


}



