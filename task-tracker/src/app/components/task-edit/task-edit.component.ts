import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task, TaskPriority, TaskStatus } from '../../model/task';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup;
  task: Task | undefined;
  isNewTask: boolean = true;
  priorities = Object.values(TaskPriority);
  statuses = Object.values(TaskStatus);

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.taskForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: [''],
      deadline: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      assignees: [''],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isNewTask = false;
        this.taskService.getTasks().subscribe((tasks: Task[]) => {
          this.task = tasks.find((t) => t.id === id);
          if (this.task) {
            if (typeof this.task.deadline === 'string') {
              this.task.deadline = new Date(this.task.deadline);
            }
            this.taskForm.setValue({
              id: this.task.id,
              title: this.task.title,
              description: this.task.description,
              deadline: this.task.deadline.toISOString().substring(0, 10),
              priority: this.task.priority,
              status: this.task.status,
              assignees: this.task.assignees.join(', '),
            });
          }
        });
      }
    });
  }

  onSubmit() {
    console.log(this.taskForm.value);
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value;
      newTask.assignees =
        typeof newTask.assignees === 'string'
          ? newTask.assignees.split(',').map((a: string) => a.trim())
          : newTask.assignees;
      newTask.deadline = new Date(newTask.deadline);

      if (this.isNewTask) {
        newTask.id = this.generateId();
        this.taskService.addTask(newTask);
      } else {
        this.taskService.updateTask(newTask);
      }

      this.router.navigate(['/tasks']);
    }
  }
  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
}
