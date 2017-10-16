import { Component, OnInit } from '@angular/core';
import { dia, shapes } from 'jointjs';
import * as $ from 'jquery';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  ngOnInit() {

    const graph = new dia.Graph();
    const paper = new dia.Paper({
      el: $('#paper'),
      width: 1000,
      height: 600,
      gridSize: 1,
      model: graph
    });


    const source = new shapes.basic.Rect({
      position: { x: 50, y: 50 },
      size: { width: 140, height: 70 },
      attr: {
        rect: {
          fill: {
            type: 'linearGradient',
            stops: [
              { offset: '0%', color: '#f7a07b' },
              { offset: '100%', color: '#fe8550' }
            ],
            attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
          },
          stroke: '#ed8661',
          'stroke-width': 2
        },
        text: {
          text: 'Source',
          fill: '#f0f0f0',
          'font-size': 18,
          'font-weight': 'lighter',
          'font-letiant': 'small-caps'
        }
      }
    });

    const target = source.clone();
    (target as any).translate(750, 400).attr('text/text', 'Target');

    const link = new dia.Link({
      source: { id: source.id },
      target: { id: target.id },
      router: { name: 'manhattan' },
      connector: { name: 'rounded' },
      attrs: {
        '.connection': {
          stroke: '#333333',
          'stroke-width': 3
        },
        '.marker-target': {
          fill: '#333333',
          d: 'M 10 0 L 0 5 L 10 10 z'
        }
      }
    });

    const obstacle = source.clone();
    (obstacle as any).translate(300, 100).attr({
      text: {
        text: 'Obstacle',
        fill: '#eee'
      },
      rect: {
        fill: {
          stops: [{ color: '#b5acf9' }, { color: '#9687fe' }]
        },
        stroke: '#8e89e5',
        'stroke-width': 2
      }
    });

    const obstacles = [
      obstacle,
      obstacle.clone(),
      (obstacle as any).translate( 200, 100 ),
      obstacle.clone(),
      (obstacle as any).translate( -200, 150 )
    ];

    graph.addCells(obstacles).addCells([source, target, link]);

    link.toBack();
    graph.on('change:position', function(cell) {

      // has an obstacle been moved? Then reroute the link.
      // if (_.contains(obstacles, cell)) paper.findViewByModel(link).update();
    // });

    $('.router-switch').on('click', function(evt) {

      const router = $(evt.target).data('router');
      const connector = $(evt.target).data('connector');

      if (router) {
        link.set('router', { name: router });
      } else {
        link.unset('router');
      }

      link.set('connector', { name: connector });
    });
  });
}}
