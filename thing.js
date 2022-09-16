#!/usr/bin/env node
import pkg from 'blessed';
const { screen: _screen, box: _box} = pkg;
import chalk from 'chalk';
import BlessedContrib from 'blessed-contrib';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';

var thing = chalk.blue('Hello') + ' World' + chalk.red('!')
// Create a screen object.
var screen = _screen({
  fastCSR: true

});
 
screen.title = 'my window title';
 
// Create a box perfectly centered horizontally and vertically.
var box = _box({
  bottom:0,
  left:'center',
  width: '50%',
  height: '20%',
  content: thing,
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    // fg: 'white',
    // bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});
 
// Append our box to the screen.
screen.append(box);
 






 
// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});
 
// Focus our element.
box.focus();
 
// Render the screen.
screen.render();
