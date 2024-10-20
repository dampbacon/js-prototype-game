# js node project (main file is thing.js)
terminal ui based game (Incomplete)
using this as an excuse to learn js and figure out how to deal with game logic.
Any kind of rpg/rougelite game logic is deceptively complex, and that is where my game dev interest leans towards.

Showcase: https://www.youtube.com/watch?v=U9g25V64mcI

![My Image](screenshots/combat.png)
![My Image2](screenshots/lib.png)

## terminals tested
#### windows terminal with WSL (recommended)
#### kitty with config option term=xterm-256color
#### tabby for linux

#### konsole for linux (not recommended)
#### CMD with WSL (not recomended)
#### powershell with WSL (not recommended)
\
\
\
<br>
## how to run
Use a terminal that is gpu accelerated to avoid flickering in animations.\
Use WSL2(windows subsystem for linux), windows default terminal mode is incompatible.\
Use a Linux terminal with xterm-256colors as term info.\
<br>
If using windows terminal use the font recommended as some fonts don't display shaded blocks screwing up the art
<br>

TERMINAL COLUMNS AND ROWS SHOULD BE SET TO <b>120 columns 30 rows</b>
<br>

it works on WSL and is reccomended to be ran on windows terminal as it's super easy to change fonts to what i designed it with. \
The recomended Font is <b>ibm vga 8x16</b>.

it can be made to work in a linux terminal, \
but it's a complete pain in the ass and a huge pain to turn off Anti Aliasing for only one font
<br>
get it from:\
https://int10h.org/oldschool-pc-fonts/fontlist/font?ibm_vga_8x16\
Use ibm vga 8x16 AC version



on wsl install node lts 16.\*\*.\*\* via NVM(node version manage) \
apt intall <b>DOES NOT INSTALL CORRECT VERSION OF NODE USE NVM</b> \
do a npm install in project root 
<br>
run either ./thing.js if you chmod +x \
or node thing.js 
<br>
to test basic event combat loop press 'y' instead of just displaying the test buttons,\
the first screen that loads up is a testing sandbox effectively\
avoid pressing 'r' or 'y' ever, the functions bound are for debug purposes
<br>

## Known issues:
- crashes when switching windows and switching back sometimes (low priority)
<br>
## TODO:
<br>
- [x] hostile enemies

<br>
- [ ] make weapons that scale with different stats
- [ ] flesh out cha uses, create a dmgtype class and a unique weapon (loot)
- [ ] persausion (dead button currently)
- [ ] trap, shrines, shop.
- [ ] repurpose perhaps dmgtypes classes defined for weapons for use with traps.
<br>
  
- [x] ability to override encounter text
- [x] custom event callback injection
- [ ] custom events that do not belong to any event chain
- [ ] custom event chains with art and unique enemies that cannot be found anywhere else.\
triggers may include special weapons equiped or certian depth reached
- [ ] custom event chain dwarf foundry
- [ ] entry points into random events random events can then terminate into custom event chains which will terminate back into random chains once completed
- [x] HOME EVENT/ VILLAGE EVENTS, ENTRY POINT INTO DUNGEON, heal up at home
<br>
  
- [x] finish generic room art
- [x] add hand holding weapon and lantern to fill blank space in enemy art, this will be done by simply drawing the image over by escape sequences rather than editing each piece of art
<br>
  
- [x] random loot gen via weighted random picker from list in data file
- [ ] better random loot selection (functions written but not used currently)
- [x] random enemy select from weighted random picker from list in data file
- [x] random descriptions for monsters
<br>
  
- [ ] more item types (low prioririty)
- [ ] more items
- [ ] quest items
<br>
  
- [ ] splash screen / main menu to start game
- [ ] minor upgrades for each run??? (low priority)
- [ ] leaderboard, persistent data between runs (low priority)
- [ ] allow player name entry (low priority)
- [ ] random player class or descriptors
- [ ] better character sheet, splash that pops up on keypress.
<br>
  
- [x] random treasure event descriptors (ALTAR, WEAPON, AND LOCATION FOUND)
- [x] random description post treasure
- [x] make scrolls and potions usable everywhere
<br>
  
- [x] weapons, armour, items loot implemented
- [ ] shrines and altar loot event
- [x] advanced weapons, implementtaion of weapon class.
<br>
  
- [x] animated writing of text
- [x] enemy encounter random room text 
- [x] item and enemy random pickers
- [ ] many more enemies and art
- [ ] BALANCE (will be done after all mechanics implemented)
<br>
  
- [ ] light mechanic (bones of implementation done, oil consumed every 4 floors)
- [ ] specail darkness enemies, will choose from the misc art, creature will be selected via random picker weighted based on current depth (easy,medium,hard, very hard)
- [x] some generic dark room art
- [ ] difficult to escape in dark, use int check
<br>
  
- [ ] random teleport scrolls random choice between home, deeper in dungeon, go up floors in dungeon
<br>
  
- [ ] floor depth mechanic. (partial implementation currently)
- [ ] make fleeing combat from hostile enemies randomly take you either closer to the surface
or deeper
- [x] add button to leave dungeon that takes you up 10 floors each cick and a random room unlikely to have enemies but still possible
- [x] add entrance event, home event
- [x] home base, level up out of dungeon mechanic.
<br>

- [x] basic animations implemented
- [ ] animated ansi/ascii art as opposed to the current static images, more advanced animations   

- [ ] external storage of data maybe.
