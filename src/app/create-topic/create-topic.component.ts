import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'app/services/data.service';
import { Router } from '@angular/router';
import { INewTopic } from "app/models/new-topic.model";

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {
  newOption: string;
  newTopic: INewTopic;  

  constructor(
    private _data: DataService,
    private _router: Router
    ) { }

  ngOnInit() {
  }

  addOption(e): void {
    e.preventDefault();
    this.newTopic.options.push(this.newOption);
    this.newOption = '';
  }

  submitForm(): void {
    this._data.addNewTopic(this.newTopic);
    this.newTopic = {
      topicTitle: '',
      topicQuestion: '',
      options: []
    };
    this._router.navigate(['/home']);
  }

  removeOption(e): void {
    e.preventDefault();
    this.newTopic.options.pop();
  }

}
