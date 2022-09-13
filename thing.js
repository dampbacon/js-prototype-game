var blessed = require('blessed');
 
// Create a screen object.
var screen = blessed.screen({
  fastCSR: true

});
 
screen.title = 'my window title';
 
// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
  bottom:0,
  left:'center',
  width: '50%',
  height: '20%',
  content: ' Hello {bold}world{/bold}! start scren hmhmhmhmh\
   content content content content content content content content content content content content',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
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
