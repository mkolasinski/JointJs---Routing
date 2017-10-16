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

    let graph = new dia.Graph();
    let paper = new dia.Paper({
      el: $('#paper'),
      width: 1000,
      height: 600,
      gridSize: 1,
      model: graph
    });

    let source = new shapes.basic.Rect({
      position: { x: 100, y: 100 },
      size: { width: 140, height: 70 },
      attrs:
      {
        rect: {
          fill: '#f2c9d6',
          stroke: '#ff93b5',
          rx: 15,
          ry: 15
        },
        text: {
          text: 'Source',
          'font-size': 14,
          'font-weight': 'bolder',
          'font-family': 'sans-serif'
        }
      }
    });

    let target = new shapes.basic.Rect({
      position: { x: 750, y: 400 },
      size: { width: 140, height: 70 },
      attrs:
      {
        rect: {
          fill: '#ff93b5',
          stroke: '#f2c9d6',
          rx: 15,
          ry: 15
        },
        text: {
          text: 'Target',
          'font-size': 14,
          'font-weight': 'bolder',
          'font-family': 'sans-serif'
        }
      }
    });
    // const target = source.clone();
    // (target as any).translate(750, 400).attr('text/text', 'Target');

    let link = new dia.Link({
      source: { id: source.id },
      target: { id: target.id },
      attrs: {
        '.connection': {
          stroke: '#333333',
          'stroke-width': 1
        },
        '.marker-target': {
          fill: '#333333',
          d: 'M 10 0 L 0 5 L 10 10 z'
        },
        '.marker-source': {
          fill: '#333333',
          d: 'M 10 0 L 5 L 10 10 z'
        },
      },
      smooth: true
    });

    let obstacle = source.clone();
    (obstacle as any).translate(300, 100).attr({
      // 'rect/filter': { name: 'dropShadow', args: { dx: 2, dy: 3, blur: 5 } },
      text: {
        text: 'Obstacle',
        fill: 'white',
        'font-size' : 13,
        'font-weight' : 'bold'
      },
      rect: {
        fill: '#A6D3D0',
        stroke: '#065DDC',
        'stroke-width': 2.5
      }
    });

    let obstacles = [
      obstacle,
      obstacle.clone(),
      (obstacle as any).translate( 200, 100 ),
      obstacle.clone(),
      (obstacle as any).translate( -200, 100 )
    ];

    graph.addCell(obstacles).addCells([source, target, link]);

    link.toBack();
    graph.on('change:position', function(cell) {

      // has an obstacle been moved? Then reroute the link.
      // if (_.contains(obstacles, cell)) paper.findViewByModel(link).update();
    // });

    $('.router-switch').on('click', function(evt) {

      let router = $(evt.target).data('router');
      let connector = $(evt.target).data('connector');

      if (router) {
        link.set('router', { name: router });
      } else {
        link.unset('router');
      }
      link.set('connector', { name: connector });
    });
  });
}}