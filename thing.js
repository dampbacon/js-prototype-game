#!/usr/bin/env node
import blessed from 'blessed';
import chalk from 'chalk';
import BlessedContrib from 'blessed-contrib';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import XTerm from 'blessed-xterm'



var body = 
chalk.magenta("hsafudhjsdfh\n\rbjksfdhbfsadbhks\n\rfadkhjbfsdhkbjsfadkhbj\n\rsabfkhdaksbhjfdhkjbsa")

const screen = blessed.screen({
  fastCSR: true,
  dockBorders: true
});
var thing = chalk.blue('Hello') + ' World' + chalk.red('!') 
var grid = new BlessedContrib.grid({rows: 12, cols: 12, screen: screen})



 
screen.title = 'my window title';
 
var logs = grid.set(6,6,6,6,blessed.box,{
  tags: true,
  label: 'log',
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
 
// Render the screen.
screen.render();

function rainbow_frame(){
  terms.term.reset()
  //frame=rainbow.frame()
  terms.term.write(body)
  screen.render()
}
//setInterval(rainbow_frame,40)



var form_thing=grid.set(0,6,6,3,blessed.form,{
  tags: true,
  scrollable: true,
  label: '{bold}choices{/bold}',
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
screen.render()

