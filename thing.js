#!/usr/bin/env node
import blessed from 'blessed';
import chalk from 'chalk';
import BlessedContrib from 'blessed-contrib';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import {game_event} from './game_events.js'
//import XTerm from 'blessed-xterm'



var body = 
chalk.magenta("hsafudhjsdfh\n\rbjksfdhbfsadbhks\n\rfadkhjbfsdhkbjsfadkhbjh\n\rbjksfdhbfsadbhks\n\rfadkhjbfsdhkbjsfadkhbjh\n\rbjksfdhbfsadbhks\n\rfadkhjbfsdhkbjsfadkhbj\n\rsabfkhdaksbhjfdhkjbsa apples")

const screen = blessed.screen({
  fastCSR: true,
  dockBorders: true,
});
var thing = chalk.blue('Hello') + ' World' + chalk.red('!') 
var grid = new BlessedContrib.grid({rows: 12, cols: 12, screen: screen})



 
screen.title = 'my window title';
 
var logs = grid.set(6,6,6,6,blessed.box,{
  tags: true,
  label: 'log',
  alwaysScroll: 'true',
  scrollable: 'true',
  scrollbars: 'true',
  scrollbar: {
    ch: ' ',
    track: {
      bg: 'blue'
    },
    style: {
      inverse: true
    }
  },
  keys: true,
  border: {
    type: 'line'
  },
  style: {
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});

var terms= grid.set(0,0,12,6, blessed.terminal,{ //more usefull for writing ascii
  parent: screen,
  border: 'line',
  tags: true,
  scrollable: true,
  label: '{bold}screen{/bold}',
  handler: function() {},
});

var stats=grid.set(0,9,6,1,blessed.box,{
  tags: true,
  scrollable: true,
  label: '{bold}stats{/bold}',
  content: 'str:4\ncon:5\ndex:4\n',
  border: {
    type: 'line'
  },
  style: {
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }})

var actions=grid.set(0,10,6,2,blessed.list,{
  tags: true,
  scrollable: true,
  label: '{bold}actions{/bold}',
  content: thing,
  border: {
    type: 'line'
  },
  style: {
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }})




 
// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});
 


var form_thing=grid.set(0,6,6,3,blessed.form = blessed.form,({
  parent: screen,
  keys: true,
  label: "actions",
  // left: 0,
  // top: 0,
  // width: 30,
  // height: 4,
  bg: 'magenta',
  content: 'test?'
}));

screen.render()

// event reader
// multiple functions, exuction may differ based on event type


var temp_event1=new game_event(1,body,{1:'goto 1(recursive)',2:'goto 2',3:'goto 3'})


var temp_event2=new game_event(2,chalk.blue("event2"),{1:"goto 1"})
var temp_event2=new game_event({id:3,body:chalk.blue("event3"),buttons:{2:"goto 2"}})


var submit = blessed.button({
  parent: form_thing,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: 10,
  top: 2,
  shrink: true,
  name: 'submit',
  content: 'submit',
  style: {
    bg: 'blue',
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
});

var cancel = blessed.button({
  parent: form_thing,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: 20,
  top: 2,
  shrink: true,
  name: 'cancel',
  content: 'cancel',
  style: {
    bg: 'blue',
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
});

submit.on('press', function() {
  form_thing.submit();
});

cancel.on('press', function() {
  form_thing.reset();
});

form_thing.on('submit', function(data) {
  form_thing.setContent('Submitted.');
  logs.setContent(temp_event1.body)
  screen.render();
  logs.focus()
});

form_thing.on('reset', function(data) {
  form_thing.setContent('Canceled.');
  screen.render();
});

screen.key('q', function() {
  process.exit(0);
});

// handling creating of buttons from an event. writing body etc
form_thing.focus()

screen.key('p', function() {
  screen.focusNext();
});



//setInterval(function () {console.log(temp_event1.body)}, 10);
