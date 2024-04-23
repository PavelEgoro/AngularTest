import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskService } from './services/task.service';

@NgModule({
  declarations: [
    AppComponent,
    TaskEditComponent,
    TaskDetailComponent,
    TasksComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [TaskService],
  bootstrap: [AppComponent],
})
export class AppModule {}
