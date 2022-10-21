# js node project
terminal ui based game (Incomplete not yet playable)
using this as an excuse to learn js and figure out how to deal with basically game logic.
Any kind of rpg/rougelite game logic is deceptively complex, and that is where my game dev interest leans towards.
testing ideas and mechanics, it's intentional it's not complete, i will keep trying ideas.

porting it to cpp webassembly project will allow for portability and allow me to playback sound.
example from someone who terminal game compile to wasm https://arthursonzogni.com/TermBreaker/play/


## how to run
use WSL, windows default terminal mode is incompatible.
it works on WSL but running on Linux it is incompatible hilariously (dummy terminals that i use for logs and screen do not display escape sequences correctly however other elements do).
on wsl install node lts 16.**.**
do a npm install

run either ./thing.js if you chmod +x
or node thing.js

to test basic event combat loop press 'y' instead of just displaying the test buttons

# Branch details.
both branches the code is ....messy
main branch execution loop is spaghetti code.
rather than be purely event driven a function pauses execution till a promise is returned
this is a mess.

I attempted to make the other branch purely event driven and simpler, function calls on button listers when criteria is met i.e killed enemy or death.
The simplification is somehow unstable and i'm getting api errors with no traceback to the code i declared making it nigh impossible to easily debug.
i will back port features i like into the main branch.

## todo:
[] persausion and non hostile enemies (partialy done)
[] different event types
[] loot, trap, shrines, shop.
[] random loot gen via weighted random picker from list in data file
[] random enemy select from weighted random picker from list in data file
[] random descriptions for everything
[x] advanced weapons, implementtaion of weapon class.
[] floor depth mechanic.
[] home base, level up out of dungeon mechanic.
[] animated ansi/ascii art as opposed to the current static images.
[] external storage of data maybe.

