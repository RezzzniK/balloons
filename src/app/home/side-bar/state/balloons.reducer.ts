import { createReducer, on } from '@ngrx/store';

import { BalloonsService } from '../../../_services/balloons.service';

import { Balloons } from 'src/app/_models/balloon.model';
import {
  EditBalloon,
  SavingAfterEdit,
  getBalloons,
  showBalloons,
  CreateNewBalloon,
  CallingForCreate,
  RemoveBaloons,
  getUserId,
  SendingUpdateToBalloon,
} from '../state/balloons.actions';

export interface balloonState {
  user_id: string;
  balloons: Balloons[];
  balloonToEdit: Balloons;
  editMode: boolean;
  createMode: boolean;
  updatedBalloon: Balloons;
}
export const baloonsFeatureKey = 'balloon';
export const initialState: balloonState = {
  //initial state of app before any actions to be dispatched
  user_id: undefined,
  balloons: [],
  balloonToEdit: undefined,
  editMode: false,
  createMode: false,
  updatedBalloon: undefined,
};
export const balloonReducer = createReducer(
  initialState,
  on(getUserId, (state, action) => ({
    ...state,
    user_id: action.user_id,
  })),
  on(getBalloons, (state, action) => ({
    ...state,
    // user_id: action.user_id,
  })),
  on(showBalloons, (state, action) => ({
    ...state,
    balloons:
      state.balloons.length === 0
        ? [...state.balloons.concat(action.balloons)]
        : [...action.balloons],
    // state.balloons.length === action.balloons.length
    //   ? [...state.balloons]
    //   : [...state.balloons.concat(action.balloons)],
  })),
  on(EditBalloon, (state, action) => ({
    ...state,
    editMode: true,
    balloonToEdit: action.balloon,
    //balloons: [...state.balloons, action.balloon],
    createMode: false,
  })),
  on(SavingAfterEdit, (state, action) => ({
    ...state,
    balloons: [
      ...state.balloons.map(
        (ball) => {
          if (ball._id === state.balloonToEdit._id) {
            const newBall: Balloons = {
              _id: ball._id, // === null ? uuidv4() : ball._id
              user_id: ball.user_id,
              altitude: action.balloon.altitude,
              description: action.balloon.description,
              color: action.balloon.color,
              latitude: action.balloon.latitude,
              longitude: action.balloon.longitude,
              name: action.balloon.name,
              type: action.balloon.type,
            };
            return newBall;
          }
          return ball;
        }
        // ? action.balloon : ball
      ),
    ],
    updatedBalloon: state.balloons.find(
      (x) => x._id === state.balloonToEdit._id
    ),
    balloonToEdit: undefined,

    editMode: false,
    createMode: false,
  })),
  on(SendingUpdateToBalloon, (state, action) => ({
    ...state,
    updatedBalloon: undefined,
  })),
  on(CallingForCreate, (state) => ({
    ...state,
    editMode: false,
    createMode: true,
  })),
  on(CreateNewBalloon, (state, action) => ({
    ...state,
    balloons: [...state.balloons, action.balloon],

    balloonToEdit: null,
    editMode: false,
    createMode: false,
  })),
  on(RemoveBaloons, (state) => ({
    ...state,
    balloons: [],
    balloonToEdit: null,
    editMode: false,
    createMode: false,
  }))
);
