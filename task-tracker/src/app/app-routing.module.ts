import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TasksComponent } from './components/tasks/tasks.component';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent, data: { title: 'Список Задач' } },
  {
    path: 'task/:id',
    component: TaskDetailComponent,
    data: { title: 'Детали Задачи' },
  },
  {
    path: 'edit/:id',
    component: TaskEditComponent,
    data: { title: 'Редактировать Задачу' },
  },
  {
    path: 'create',
    component: TaskEditComponent,
    data: { title: 'Создать Задачу' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
