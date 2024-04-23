import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FilterValues, Task, TaskStatus } from '../../model/task';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  taskStatuses: string[] = [
    'Открыто',
    'Выполняется',
    'Готово',
    'Заблокировано',
  ];
  private tasks: Task[] = [];
  displayedColumns: string[] = [
    'title',
    'priority',
    'status',
    'deadline',
    'assignees',
    'actions',
  ];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource();
  filterValues: FilterValues = {};

  @ViewChild(MatSort, { static: true })
  sort: MatSort | undefined; 

  constructor(
    private taskService: TaskService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.dataSource.filterPredicate = this.createFilter();
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.dataSource.data = tasks;
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
      console.log('Loaded tasks:', tasks);
    });
  }

  createFilter(): (data: Task, filter: string) => boolean {
    let filterFunction = (data: Task, filter: string): boolean => {
      let searchTerms = JSON.parse(filter);
      return (
        data.title.toLowerCase().includes(searchTerms.title || '') &&
        (searchTerms.status
          ? data.status.toString().toLowerCase().includes(searchTerms.status)
          : true) &&
        (searchTerms.priority
          ? data.priority
              .toString()
              .toLowerCase()
              .includes(searchTerms.priority)
          : true) &&
        (searchTerms.assignee
          ? data.assignees.includes(searchTerms.assignee)
          : true)
      );
    };
    return filterFunction;
  }

  applyFilter(event: Event, filterField: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValues[filterField] = filterValue.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  clearFilter() {
    this.filterValues = {};
    this.dataSource.filter = '';
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
        this.dataSource.data = this.tasks;
        console.log('Task deleted successfully');
      },
      error: (error) => console.error('Error deleting task:', error),
    });
  }

  navigateToCreateTask() {
    this.router.navigate(['/create']);
  }
  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return '';
    }
  }
}
