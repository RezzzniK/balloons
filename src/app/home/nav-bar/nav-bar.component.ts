import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { LogOut } from 'src/app/login/state/login.actions';
import { RemoveBaloons } from '../side-bar/state/balloons.actions';
import { RequestsService } from 'src/app/_services/requests.service';
import * as loginSelectors from '../../login/logInn.state';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  imagePath = '../../../assets/devalore.png';
  username$ = this.store.select(loginSelectors.selectFeatureUser);
  constructor(private store: Store, private httpService: RequestsService) {}

  ngOnInit(): void {
    // console.log(
    this.username$.pipe(
      map((data) => {
        console.log(data.username);
      })
    );
    // );
  }
  LogOut() {
    this.store.dispatch(LogOut());
    this.store.dispatch(RemoveBaloons());
  }
}
