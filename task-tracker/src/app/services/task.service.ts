import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private taskSubject = new BehaviorSubject<Task[]>(this.loadTasks());

  constructor() {}

  getTasks(): Observable<Task[]> {
    return this.taskSubject.asObservable();
  }

  addTask(task: Task) {
    const tasks = this.loadTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  updateTask(updatedTask: Task): void {
    let tasks = this.loadTasks();
    const index = tasks.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      this.saveTasks(tasks);
    } else {
      console.error('Task not found');
    }
  }

  deleteTask(taskId: string): Observable<any> {
    const tasks = this.loadTasks();
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    this.saveTasks(updatedTasks);
    return of({ success: true });
  }

  private loadTasks(): Task[] {
    const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach((task: any) => {
      if (typeof task.assignees === 'string') {
        task.assignees = task.assignees.split(',');
      } else if (!task.assignees) {
        task.assignees = [];
      }
    });
    return tasks;
  }

  private saveTasks(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.taskSubject.next(tasks);
    console.log('Saved tasks:', tasks);
  }
}
