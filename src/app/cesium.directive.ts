import { Directive, ElementRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Viewer } from 'cesium';

import { Balloons } from './_models/balloon.model';
import {
  EditBalloon,
  SavingAfterEdit,
} from './home/side-bar/state/balloons.actions';
import PositionProperty from 'cesium/Source/DataSources/PositionProperty';
import * as balloonsSelector from '../app/home/side-bar/balloons.state';
import * as focusSelector from '../app/home/side-bar/focus-state/focus-balloons.state';

@Directive({
  selector: '[appCesium]',
})
export class CesiumDirective implements OnInit {
  viewer: Viewer;
  balloons: Balloons[] = [];
  store$ = this.store.select(balloonsSelector.selectFeatureBalloons);
  focus$ = this.store.select(focusSelector.selectFocusFeature);
  focusOnBalloon: Balloons = null;
  focusCicked: boolean;
  constructor(private el: ElementRef, private store: Store) {}

  ngOnInit(): void {
    this.viewer = new Cesium.Viewer(this.el.nativeElement, {
      shouldAnimate: true,
    });

    console.log('in ng of cesium');
    this.store$.subscribe((data) => {
      // this.focus$.subscribe((data) => {
      //   this.focusCicked = data.focusClicked;
      // });
      if (!this.focusCicked) {
        console.log('focus not clicked');
        this.viewer.entities.removeAll();
      }
      this.balloons = data.balloons;
      this.balloons.forEach((balloon) => {
        console.log(`in forech loop cesium directive`);

        //Set bounds of our simulation time
        const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
        const stop = Cesium.JulianDate.addSeconds(
          start,
          360,
          new Cesium.JulianDate()
        );
        //Make sure viewer is at the desired time.
        this.viewer.clock.startTime = start.clone();
        this.viewer.clock.stopTime = stop.clone();
        this.viewer.clock.currentTime = start.clone();
        this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
        this.viewer.clock.multiplier = 10;

        //Set timeline to simulation bounds
        this.viewer.timeline.zoomTo(start, stop);

        //Compute the entity position property.
        const position = this.computeCirclularFlight(
          balloon.longitude,
          balloon.longitude,
          0.01,
          balloon.altitude
        );
        //Actually create the entity
        const entity = this.viewer.entities.add({
          //Set the entity availability to the same interval as the simulation time.
          availability: new Cesium.TimeIntervalCollection([
            new Cesium.TimeInterval({
              start: start,
              stop: stop,
            }),
          ]),

          //Use our computed positions
          position: position,
          name: balloon.name,
          description: balloon.description,
          //position: Cesium.Cartesian3.fromDegrees(-114.0, 40.0, 300000.0),
          ellipsoid: {
            radii: new Cesium.Cartesian3(
              balloon.type,
              balloon.type,
              balloon.type
            ),
            material: Cesium.Color[balloon.color],
          },
          //Automatically compute orientation based on position movement.
          orientation: new Cesium.VelocityOrientationProperty(position),
        });
        //console.log(position);
        this.viewer.zoomTo(entity);
      });
    });
    // this.focus$.subscribe((data) => {
    //   this.focusOnBalloon = Object.assign({}, data.focusOn);
    //   console.log(this.focusOnBalloon?.name);
    //   if (this.focusOnBalloon !== undefined) {
    //     console.log('VVVV');
    //     const entity = this.viewer.entities.getById(this.focusOnBalloon.name);
    //     ////////////////////////////////////////////////////////////////////////
    //     //DYNAMIC UPDATE OF LATITUDE ALTITUDE LONGITUDE
    //     this.focusOnBalloon.altitude = '222';
    //     this.focusOnBalloon.longitude = '1';
    //     this.focusOnBalloon.latitude = '1';
    //     //////////////////////////////////////////////////////////////////////////

    //     // this.focusOnBalloon.altitude = Cesium.Cartographic.fromCartesian(
    //     //   this.viewer.entities
    //     //     .getById(this.focusOnBalloon.name).position.
    //     //     .position?.getValue(this.viewer.clock.currentTime)
    //     // );
    //     console.log(this.focusOnBalloon);
    //     this.store.dispatch(EditBalloon({ balloon: this.focusOnBalloon }));
    //     //this.viewer.scene.drillPick();
    //     this.store.dispatch(SavingAfterEdit({ balloon: this.focusOnBalloon }));
    //   }
    // });

    //Set the random number seed for consistent results.
  }

  computeCirclularFlight(
    lon: string,
    lat: string,
    radius: number,
    height: string
  ) {
    const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
    const property = new Cesium.SampledPositionProperty();
    for (let i = 0; i <= 360; i += 45) {
      const radians = Cesium.Math.toRadians(i);
      const time = Cesium.JulianDate.addSeconds(
        start,
        i,
        new Cesium.JulianDate()
      );
      const position = Cesium.Cartesian3.fromDegrees(
        Number(lon) + radius * 1.5 * Math.cos(radians),
        Number(lat) + radius * Math.sin(radians),
        Number(height) * 500 + 1750
      );
      property.addSample(time, position);
      this.viewer.entities.add({
        position: position,
        point: {
          pixelSize: 8,
          color: Cesium.Color.TRANSPARENT,
          outlineColor: Cesium.Color.YELLOW,
          outlineWidth: 3,
        },
      });
      //Also create a point for each sample we generate.
    }
    return property;
  }
}
