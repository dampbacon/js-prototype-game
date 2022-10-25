# js node project
terminal ui based game (Incomplete)
using this as an excuse to learn js and figure out how to deal with game logic.
Any kind of rpg/rougelite game logic is deceptively complex, and that is where my game dev interest leans towards.
testing ideas and mechanics, it's intentional it's not complete, i will keep trying ideas.

porting it to cpp webassembly project will allow for portability and allow me to playback sound.
example from someone who terminal game compile to wasm https://arthursonzogni.com/TermBreaker/play/








## terminals tested

#### tabby for linux
#### konsole for linux
#### windows terminal(IT'S NOT POWERSHELL OR CMD) with WSL 
#### CMD with WSL 
#### powershell with WSL
\
\
\
\
## how to run
use WSL, windows default terminal mode is incompatible.
it works on WSL and is reccomended to be ran on windows terminal as it's super easy to change fonts to what i designed it with. \
The recomended Font is <b>ibm vga 8x16</b> it can be made to work in a linux terminal, \
but it's a complete pain in the ass and a huge pain to turn off AA\

get it from:\
https://int10h.org/oldschool-pc-fonts/fontlist/font?ibm_vga_8x16



on wsl install node lts 16.\*\*.\*\* via NVM(node version manage) \
apt intall <b>DOES NOT INSTALL CORRECT VERSION OF NODE USE NVM</b> \
do a npm install in project root 

run either ./thing.js if you chmod +x \
or node thing.js 

to test basic event combat loop press 'y' instead of just displaying the test buttons 

# Branch details.
both branches the code is ....messy \
main branch execution loop is spaghetti code. \
rather than be purely event driven a function pauses execution till a promise is returned \
it is a mess, but a mess that works. 

## Known issues:
- combat metrics does not correctly count some special damage effects(low priority)
- rare crashes when switching windows (low priority)
- rare crashes once ~ every few hours (low priority)
- linux terminal weirdness()

## stuff:
- [X] on hostile enemies 
- [x] persausion (dead button currently)
- [ ] trap, shrines, shop.
- [ ] random loot gen via weighted random picker from list in data file
- [x] random enemy select from weighted random picker from list in data file
- [x] random descriptions for monsters
- [ ] random player class or descriptors
- [ ] random treasure event descriptors (ALTAR, WEAPON, AND LOCATION FOUND)
- [ ] make scrolls and potions usable everywhere
- [ ] random description post treasure
- [x] weapons, armour, items loot implemented
- [ ] shrines and altar loot event
- [x] advanced weapons, implementtaion of weapon class.
- [ ] floor depth mechanic. (partial)
- [ ] home base, level up out of dungeon mechanic.
- [x] animated writing of text
- [x] enemy encounter random room text 
- [x] item and enemy random pickers
- [ ] animated ansi/ascii art as opposed to the current static images.
- [ ] external storage of data maybe.

