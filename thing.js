#!/usr/bin/env node
'use strict';

import XTermNew from './blessed-xterm/blessed-xterm.js'
import blessed from 'blessed';
import chalk from 'chalk';
import BlessedContrib from 'blessed-contrib';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import {game_event, game_event_enemy, game_event_gain_item} from './game_events.js'
import { clearInterval } from 'timers';
import {Player} from './player.js';
import { hrtime } from 'node:process';
import os from 'os'
import './blessed/patches.cjs';
import * as scroll from './blessed/scroll.cjs';
import { rollStat } from './player.js';
import fs from 'fs';
import pkg from 'iconv-lite';
import smallGrad from 'tinygradient';
const {tinygradient} = smallGrad;
const {iconv} = pkg;


// test content
let temp_event1=new game_event({'id':1, 'body':chalk.yellow("event1"), 'toScreen':"world", 'buttons':[[1,"goto 1(recur)",true],[2,"goto 2",true],[3,"goto 3 lolololololololollolololololololol",true]]})
let temp_event2=new game_event({'id':2,'body':chalk.blue("event2"),'toScreen':"adasfas",'buttons':[[1,"goto 1",true],[3,"goto 3",true]]})
let temp_event3=new game_event({'id':3,'body':chalk.red("event3"),'toScreen':"dsfdasg",'buttons':[[2,"goto 2",true]]})
let testEventArr=[temp_event1,temp_event2,temp_event3]
let story={}

//test content
let body = 
`[0m\r
\r
  [1;34m░░░░░░░░░░░░[0m\r
[1;34m░░░░░[0m\r
   [1;5;35;46m░░░░░░░[0m\r
[1;5;35;46m░░░[0;1;34m▄█▀▀▀▀█▄[0m     [1;31m░░░░[0m\r
[1;5;35;46m░░░░[0;1;34m█▀[0m       [1;34m▀█[0m  [1;31m░░[0m\r
[1;34m▄▀[0m           [1;31m░░░[0m\r
[1;34m█▀[0m    [1;31m░░░░░░░░[0m  [1;31m█▀[0m      [1;5;35;46m♦♦[0m\r
             [1;31m▄█[0m  [1;31m♥♥[0m  [1;5;35;46m♦♦[0m\r
[1;31m▄▄▄▄[0m      [1;35m░░░[0m  [1;31m▄█▀[0m [1;31m♥♥♥[0m [1;5;35;46m♦♦♦[0m\r
[1;31m▀▀▀▀▀[35m░░[31m▀▀▀▀▀[0m  [1;31m♥♥[0m  [1;5;35;46m♦♦[0m\r
    [1;35m░░[0m      [1;31m♥♥♥[0m [1;5;35;46m♦♦♦[0m\r
   [1;35m░░[0m    [1;31m♥♥♥♥[5;35;46m♦♦♦[0m\r
[1;35m░░░░░[0m   [1;31m♥♥♥[0m  [1;5;35;46m♦♦[0m\r
    [1;31m♥♥♥♥[0m\r
[1;31m♥♥♥♥♥[0m\r
[1;31m♥♥[0m\r`
let caleb =
`[48;5;241m [38;5;241;48;5;241m▄[38;5;242;48;5;241m▄▄[38;5;242;48;5;242m▄[48;5;242m [38;5;241;48;5;241m▄[48;5;241m [38;5;241;48;5;241m▄▄[38;5;59;48;5;59m▄▄[38;5;241;48;5;59m▄[38;5;241;48;5;241m▄▄▄[38;5;241;48;5;59m▄[38;5;241;48;5;241m▄▄[38;5;59;48;5;59m▄[38;5;240;48;5;240m▄▄▄▄[48;5;240m [38;5;240;48;5;240m▄▄▄[48;5;240m [38;5;240;48;5;240m▄[38;5;240;48;5;239m▄▄▄[38;5;239;48;5;239m▄▄▄▄[48;5;239m   [38;5;239;48;5;239m▄▄▄▄▄[38;5;238;48;5;239m▄[38;5;238;48;5;238m▄▄▄[38;5;239;48;5;239m▄▄▄▄[48;5;239m [38;5;239;48;5;239m▄▄[m\r
[38;5;241;48;5;241m▄[38;5;242;48;5;242m▄[48;5;242m  [38;5;242;48;5;242m▄▄[38;5;241;48;5;241m▄[48;5;241m  [38;5;59;48;5;241m▄[48;5;59m [38;5;59;48;5;59m▄[38;5;241;48;5;241m▄[48;5;241m [38;5;241;48;5;241m▄[38;5;241;48;5;59m▄[48;5;59m [38;5;240;48;5;241m▄[38;5;59;48;5;241m▄[38;5;59;48;5;59m▄[38;5;240;48;5;240m▄▄[48;5;240m [38;5;240;48;5;240m▄▄▄[38;5;59;48;5;240m▄[38;5;241;48;5;240m▄▄▄[38;5;59;48;5;240m▄[38;5;240;48;5;240m▄▄[38;5;239;48;5;239m▄▄▄▄▄[48;5;239m  [38;5;239;48;5;239m▄▄▄[48;5;239m [38;5;239;48;5;239m▄[38;5;238;48;5;238m▄▄[38;5;237;48;5;237m▄[38;5;238;48;5;238m▄[38;5;238;48;5;239m▄[38;5;239;48;5;239m▄[48;5;239m [38;5;239;48;5;239m▄▄[48;5;239m [38;5;239;48;5;239m▄[m\r
[38;5;241;48;5;241m▄▄[38;5;242;48;5;242m▄▄▄▄[38;5;241;48;5;241m▄▄[48;5;241m [38;5;241;48;5;59m▄▄▄[38;5;241;48;5;241m▄▄[38;5;242;48;5;241m▄[38;5;241;48;5;241m▄▄[38;5;241;48;5;59m▄▄[38;5;241;48;5;241m▄[38;5;59;48;5;59m▄[38;5;240;48;5;240m▄▄[38;5;59;48;5;240m▄[38;5;241;48;5;240m▄[38;5;240;48;5;59m▄▄[38;5;95;48;5;95m▄▄[38;5;240;48;5;59m▄[38;5;239;48;5;239m▄[38;5;238;48;5;238m▄[38;5;238;48;5;239m▄▄[38;5;239;48;5;240m▄[38;5;239;48;5;239m▄▄[48;5;239m [38;5;239;48;5;239m▄▄▄▄▄[48;5;239m [38;5;239;48;5;239m▄[38;5;239;48;5;238m▄[38;5;238;48;5;238m▄▄▄[38;5;239;48;5;238m▄[48;5;239m  [38;5;239;48;5;239m▄▄▄▄[m\r
[38;5;59;48;5;59m▄[38;5;59;48;5;241m▄[38;5;241;48;5;241m▄▄[38;5;242;48;5;242m▄[38;5;241;48;5;242m▄[38;5;241;48;5;241m▄▄▄▄▄[38;5;59;48;5;59m▄[38;5;241;48;5;241m▄▄▄▄▄▄▄▄[38;5;241;48;5;59m▄[38;5;101;48;5;59m▄[38;5;101;48;5;95m▄▄[38;5;240;48;5;101m▄[38;5;239;48;5;95m▄[38;5;241;48;5;241m▄[38;5;95;48;5;95m▄[38;5;240;48;5;59m▄[38;5;238;48;5;239m▄[38;5;237;48;5;238m▄[38;5;236;48;5;237m▄[38;5;235;48;5;238m▄[38;5;235;48;5;237m▄[38;5;236;48;5;237m▄[38;5;236;48;5;238m▄[38;5;238;48;5;239m▄[38;5;239;48;5;239m▄▄[48;5;239m [38;5;239;48;5;239m▄[38;5;238;48;5;239m▄[38;5;238;48;5;238m▄[38;5;238;48;5;239m▄[38;5;239;48;5;239m▄▄▄▄▄▄▄▄▄▄▄[38;5;238;48;5;238m▄[m\r
[38;5;59;48;5;59m▄▄[38;5;241;48;5;241m▄[48;5;241m [38;5;241;48;5;241m▄[48;5;241m [38;5;241;48;5;241m▄▄▄▄▄[48;5;241m [38;5;241;48;5;241m▄[38;5;59;48;5;241m▄[38;5;241;48;5;241m▄▄▄▄[38;5;101;48;5;242m▄[38;5;138;48;5;243m▄[38;5;240;48;5;95m▄[38;5;238;48;5;95m▄[38;5;238;48;5;239m▄[38;5;237;48;5;237m▄[38;5;236;48;5;236m▄[38;5;236;48;5;238m▄[38;5;237;48;5;241m▄[38;5;238;48;5;240m▄[38;5;238;48;5;238m▄[38;5;239;48;5;237m▄[38;5;239;48;5;236m▄[38;5;239;48;5;235m▄▄[38;5;238;48;5;234m▄[38;5;237;48;5;234m▄[38;5;236;48;5;235m▄[38;5;236;48;5;236m▄[38;5;237;48;5;238m▄[38;5;239;48;5;239m▄[38;5;238;48;5;239m▄[38;5;238;48;5;238m▄▄▄▄[38;5;239;48;5;239m▄▄▄▄▄▄▄▄▄[48;5;239m [38;5;239;48;5;239m▄▄[m\r
[38;5;241;48;5;241m▄▄▄▄▄▄▄▄[48;5;241m [38;5;241;48;5;241m▄▄▄[38;5;59;48;5;59m▄[48;5;59m [38;5;241;48;5;241m▄▄[38;5;242;48;5;241m▄[38;5;138;48;5;101m▄[38;5;95;48;5;138m▄[38;5;238;48;5;95m▄[38;5;95;48;5;59m▄[38;5;180;48;5;138m▄[38;5;223;48;5;138m▄[38;5;180;48;5;95m▄[38;5;180;48;5;239m▄▄[38;5;180;48;5;95m▄[38;5;216;48;5;137m▄▄[38;5;216;48;5;174m▄▄▄▄[38;5;216;48;5;173m▄▄[38;5;180;48;5;95m▄[38;5;95;48;5;237m▄[38;5;236;48;5;236m▄[38;5;238;48;5;238m▄▄▄[38;5;239;48;5;238m▄▄[38;5;239;48;5;239m▄[48;5;239m    [38;5;239;48;5;239m▄▄▄[48;5;239m  [38;5;239;48;5;239m▄[48;5;239m  [m\r
[38;5;241;48;5;241m▄▄▄▄▄[38;5;242;48;5;241m▄[38;5;241;48;5;241m▄[48;5;241m    [38;5;241;48;5;241m▄[38;5;241;48;5;59m▄[38;5;241;48;5;241m▄[38;5;242;48;5;241m▄▄[38;5;138;48;5;101m▄[38;5;239;48;5;101m▄[38;5;236;48;5;237m▄[38;5;237;48;5;237m▄[38;5;95;48;5;95m▄[38;5;180;48;5;180m▄[38;5;223;48;5;223m▄▄▄▄▄▄[38;5;223;48;5;217m▄[38;5;223;48;5;216m▄[38;5;216;48;5;216m▄▄▄▄▄[38;5;216;48;5;180m▄[38;5;180;48;5;173m▄[38;5;95;48;5;239m▄[38;5;239;48;5;238m▄[38;5;239;48;5;239m▄▄▄▄▄▄▄▄▄▄▄▄[48;5;239m [38;5;239;48;5;239m▄▄▄▄[m\r
[38;5;241;48;5;241m▄▄▄[48;5;241m  [38;5;241;48;5;242m▄[38;5;241;48;5;241m▄▄▄▄▄▄[38;5;8;48;5;241m▄[38;5;181;48;5;8m▄[38;5;223;48;5;144m▄[38;5;224;48;5;187m▄[38;5;223;48;5;181m▄[38;5;181;48;5;95m▄[38;5;144;48;5;237m▄[38;5;240;48;5;238m▄[38;5;137;48;5;95m▄[38;5;216;48;5;216m▄[38;5;223;48;5;217m▄[38;5;180;48;5;223m▄[38;5;138;48;5;223m▄[38;5;137;48;5;223m▄[38;5;95;48;5;180m▄[38;5;95;48;5;216m▄[38;5;137;48;5;216m▄[38;5;180;48;5;216m▄▄▄▄▄▄[38;5;180;48;5;180m▄[38;5;173;48;5;173m▄[38;5;137;48;5;137m▄[38;5;238;48;5;239m▄[38;5;95;48;5;95m▄[38;5;239;48;5;239m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄[m\r
[38;5;240;48;5;59m▄▄[38;5;240;48;5;240m▄[38;5;59;48;5;59m▄[38;5;59;48;5;241m▄[38;5;241;48;5;241m▄[38;5;241;48;5;242m▄[38;5;241;48;5;241m▄▄▄▄[38;5;138;48;5;242m▄[38;5;223;48;5;180m▄[38;5;223;48;5;223m▄▄▄[38;5;181;48;5;223m▄[38;5;180;48;5;181m▄[38;5;144;48;5;180m▄[38;5;137;48;5;101m▄[38;5;180;48;5;173m▄[38;5;216;48;5;216m▄[38;5;180;48;5;180m▄[38;5;131;48;5;137m▄[38;5;95;48;5;95m▄[38;5;239;48;5;95m▄▄[38;5;239;48;5;238m▄[38;5;238;48;5;239m▄[38;5;131;48;5;137m▄[38;5;180;48;5;180m▄[38;5;174;48;5;180m▄[38;5;239;48;5;137m▄[38;5;237;48;5;95m▄▄[38;5;238;48;5;137m▄[38;5;95;48;5;173m▄[38;5;95;48;5;131m▄[38;5;237;48;5;237m▄[38;5;95;48;5;239m▄▄[38;5;59;48;5;239m▄[38;5;240;48;5;239m▄[38;5;239;48;5;239m▄▄▄▄▄▄▄▄▄▄▄▄▄[m\r
[38;5;239;48;5;239m▄[38;5;239;48;5;240m▄[38;5;240;48;5;240m▄▄[38;5;59;48;5;59m▄▄[38;5;240;48;5;59m▄[38;5;239;48;5;240m▄▄[38;5;240;48;5;59m▄[38;5;242;48;5;242m▄[38;5;180;48;5;144m▄[38;5;180;48;5;223m▄[38;5;138;48;5;180m▄▄[38;5;137;48;5;180m▄▄▄[38;5;138;48;5;138m▄[38;5;174;48;5;138m▄[38;5;180;48;5;180m▄[38;5;217;48;5;223m▄[38;5;223;48;5;223m▄[38;5;223;48;5;180m▄[38;5;180;48;5;137m▄[38;5;137;48;5;95m▄[38;5;137;48;5;239m▄[38;5;137;48;5;95m▄[38;5;174;48;5;131m▄[38;5;181;48;5;137m▄[38;5;224;48;5;223m▄[38;5;180;48;5;174m▄[38;5;239;48;5;236m▄[38;5;238;48;5;236m▄[38;5;237;48;5;237m▄[38;5;238;48;5;238m▄[38;5;95;48;5;239m▄[38;5;238;48;5;239m▄[38;5;95;48;5;238m▄[38;5;144;48;5;137m▄[38;5;144;48;5;144m▄[38;5;144;48;5;138m▄[38;5;137;48;5;241m▄[38;5;240;48;5;240m▄[38;5;240;48;5;239m▄[38;5;239;48;5;239m▄▄▄[48;5;239m [38;5;239;48;5;239m▄▄▄▄▄▄▄[m\r
[38;5;238;48;5;239m▄[38;5;239;48;5;239m▄[38;5;239;48;5;240m▄▄▄▄[38;5;239;48;5;239m▄▄[38;5;238;48;5;239m▄[38;5;240;48;5;240m▄[38;5;242;48;5;243m▄[38;5;144;48;5;180m▄[38;5;180;48;5;180m▄[38;5;137;48;5;138m▄[38;5;101;48;5;137m▄▄[38;5;137;48;5;137m▄[38;5;101;48;5;137m▄[38;5;137;48;5;137m▄▄[38;5;174;48;5;180m▄[38;5;216;48;5;216m▄[38;5;216;48;5;217m▄[38;5;217;48;5;223m▄[38;5;223;48;5;223m▄▄[38;5;217;48;5;216m▄[38;5;216;48;5;180m▄[38;5;223;48;5;180m▄[38;5;223;48;5;223m▄[38;5;223;48;5;224m▄[38;5;216;48;5;217m▄[38;5;174;48;5;137m▄[38;5;174;48;5;131m▄[38;5;174;48;5;95m▄▄[38;5;174;48;5;137m▄[38;5;95;48;5;239m▄[38;5;95;48;5;101m▄[38;5;137;48;5;138m▄[38;5;137;48;5;137m▄[38;5;137;48;5;138m▄[38;5;137;48;5;137m▄[38;5;95;48;5;59m▄[38;5;240;48;5;240m▄▄[38;5;239;48;5;240m▄[38;5;239;48;5;239m▄[38;5;238;48;5;239m▄[38;5;238;48;5;238m▄▄▄▄[38;5;238;48;5;239m▄▄▄[m\r
[38;5;238;48;5;238m▄▄▄▄[38;5;238;48;5;239m▄[38;5;238;48;5;238m▄[38;5;238;48;5;239m▄[38;5;238;48;5;238m▄▄[38;5;239;48;5;239m▄[38;5;59;48;5;242m▄[38;5;101;48;5;138m▄▄[38;5;101;48;5;101m▄[38;5;95;48;5;95m▄[38;5;240;48;5;95m▄[38;5;239;48;5;95m▄[38;5;95;48;5;95m▄▄▄[38;5;137;48;5;173m▄[38;5;180;48;5;180m▄[38;5;174;48;5;216m▄[38;5;180;48;5;216m▄▄▄[38;5;216;48;5;216m▄[38;5;216;48;5;180m▄[38;5;137;48;5;174m▄[38;5;95;48;5;174m▄▄▄[38;5;137;48;5;174m▄[38;5;174;48;5;180m▄[38;5;180;48;5;216m▄[38;5;174;48;5;216m▄[38;5;173;48;5;174m▄[38;5;239;48;5;95m▄[38;5;95;48;5;95m▄▄[38;5;95;48;5;101m▄[38;5;95;48;5;137m▄[38;5;137;48;5;137m▄[38;5;101;48;5;101m▄[38;5;239;48;5;240m▄[38;5;239;48;5;239m▄▄[38;5;238;48;5;239m▄[38;5;237;48;5;238m▄▄▄[38;5;237;48;5;237m▄▄[38;5;237;48;5;238m▄[38;5;238;48;5;238m▄[38;5;239;48;5;238m▄[m\r
[38;5;238;48;5;238m▄▄▄▄▄▄▄▄▄▄[38;5;239;48;5;240m▄[38;5;242;48;5;95m▄[38;5;95;48;5;101m▄[38;5;239;48;5;95m▄▄[38;5;238;48;5;239m▄[38;5;238;48;5;238m▄[38;5;237;48;5;238m▄[38;5;236;48;5;238m▄[38;5;237;48;5;238m▄[38;5;137;48;5;137m▄[38;5;174;48;5;180m▄[38;5;174;48;5;173m▄[38;5;180;48;5;180m▄▄[38;5;174;48;5;216m▄[38;5;174;48;5;217m▄[38;5;174;48;5;223m▄[38;5;174;48;5;180m▄[38;5;174;48;5;137m▄[38;5;95;48;5;95m▄[38;5;131;48;5;95m▄[38;5;137;48;5;137m▄[38;5;173;48;5;174m▄▄[38;5;137;48;5;173m▄[38;5;95;48;5;131m▄[38;5;237;48;5;238m▄[38;5;240;48;5;95m▄[38;5;95;48;5;95m▄▄▄[38;5;101;48;5;101m▄[38;5;95;48;5;95m▄[38;5;239;48;5;239m▄▄[38;5;238;48;5;239m▄[38;5;238;48;5;238m▄[38;5;237;48;5;238m▄[38;5;237;48;5;237m▄▄▄▄[38;5;238;48;5;237m▄[38;5;238;48;5;238m▄[48;5;239m [m\r
[38;5;238;48;5;238m▄▄[38;5;237;48;5;238m▄[48;5;238m [38;5;238;48;5;238m▄[38;5;239;48;5;238m▄▄▄▄▄[38;5;240;48;5;240m▄[38;5;240;48;5;59m▄[38;5;239;48;5;239m▄[38;5;238;48;5;238m▄▄[38;5;237;48;5;238m▄▄[38;5;236;48;5;237m▄[38;5;235;48;5;236m▄▄[38;5;95;48;5;95m▄[38;5;137;48;5;173m▄[38;5;173;48;5;173m▄[38;5;180;48;5;180m▄▄[38;5;180;48;5;137m▄[38;5;180;48;5;131m▄[38;5;174;48;5;131m▄[38;5;137;48;5;131m▄[38;5;131;48;5;131m▄▄[38;5;95;48;5;95m▄[38;5;95;48;5;131m▄[38;5;137;48;5;137m▄▄[38;5;131;48;5;131m▄[38;5;238;48;5;238m▄[38;5;236;48;5;237m▄[38;5;239;48;5;95m▄[38;5;95;48;5;95m▄▄▄▄[38;5;239;48;5;59m▄[38;5;238;48;5;239m▄[38;5;238;48;5;238m▄[38;5;237;48;5;238m▄[38;5;237;48;5;237m▄▄▄[38;5;237;48;5;238m▄[38;5;237;48;5;237m▄[38;5;238;48;5;237m▄[38;5;238;48;5;238m▄[38;5;239;48;5;238m▄[38;5;239;48;5;239m▄[m\r
[38;5;238;48;5;238m▄▄▄▄[38;5;239;48;5;239m▄[38;5;240;48;5;239m▄[38;5;240;48;5;240m▄[38;5;240;48;5;239m▄▄▄[38;5;239;48;5;239m▄[38;5;239;48;5;240m▄[38;5;240;48;5;240m▄[38;5;240;48;5;239m▄[38;5;240;48;5;238m▄[38;5;239;48;5;236m▄[38;5;238;48;5;236m▄[38;5;239;48;5;236m▄▄[38;5;238;48;5;236m▄[38;5;237;48;5;237m▄[38;5;239;48;5;95m▄[38;5;137;48;5;173m▄[38;5;180;48;5;180m▄[38;5;216;48;5;180m▄[38;5;223;48;5;216m▄▄[38;5;216;48;5;180m▄[38;5;216;48;5;173m▄[38;5;180;48;5;137m▄▄[38;5;173;48;5;137m▄▄[38;5;137;48;5;137m▄[38;5;131;48;5;131m▄[38;5;238;48;5;95m▄[38;5;235;48;5;236m▄[38;5;236;48;5;236m▄[38;5;236;48;5;237m▄[38;5;237;48;5;238m▄[38;5;238;48;5;239m▄[38;5;239;48;5;240m▄▄[38;5;238;48;5;238m▄[38;5;237;48;5;238m▄[38;5;237;48;5;237m▄▄▄▄▄[38;5;238;48;5;237m▄[38;5;238;48;5;238m▄[38;5;239;48;5;238m▄[38;5;239;48;5;239m▄▄▄[m\r
[38;5;238;48;5;238m▄[38;5;238;48;5;237m▄[38;5;238;48;5;238m▄[38;5;239;48;5;238m▄[38;5;240;48;5;239m▄[38;5;240;48;5;240m▄[38;5;240;48;5;59m▄▄[38;5;239;48;5;240m▄[38;5;239;48;5;239m▄▄[38;5;238;48;5;239m▄[38;5;239;48;5;239m▄[38;5;239;48;5;240m▄[38;5;240;48;5;240m▄▄▄[38;5;238;48;5;59m▄[38;5;236;48;5;59m▄[38;5;239;48;5;239m▄[38;5;95;48;5;238m▄[38;5;238;48;5;238m▄[38;5;237;48;5;239m▄[38;5;238;48;5;137m▄[38;5;239;48;5;180m▄[38;5;137;48;5;180m▄[38;5;137;48;5;216m▄[38;5;137;48;5;180m▄▄[38;5;173;48;5;180m▄▄▄[38;5;137;48;5;173m▄[38;5;95;48;5;137m▄[38;5;240;48;5;95m▄[38;5;239;48;5;237m▄[38;5;237;48;5;235m▄[38;5;236;48;5;236m▄[38;5;237;48;5;236m▄[38;5;238;48;5;237m▄[38;5;238;48;5;238m▄▄▄▄[38;5;238;48;5;237m▄▄▄▄[38;5;237;48;5;237m▄[38;5;238;48;5;237m▄[38;5;239;48;5;238m▄▄▄▄▄[38;5;239;48;5;239m▄[m\r
[38;5;237;48;5;237m▄▄[38;5;238;48;5;238m▄▄[38;5;238;48;5;239m▄▄▄[38;5;239;48;5;239m▄[38;5;238;48;5;239m▄[38;5;237;48;5;238m▄▄[38;5;238;48;5;238m▄▄[38;5;238;48;5;239m▄[38;5;237;48;5;239m▄▄[38;5;235;48;5;237m▄[38;5;234;48;5;234m▄[38;5;234;48;5;235m▄[38;5;95;48;5;239m▄[38;5;137;48;5;137m▄[38;5;95;48;5;95m▄[38;5;238;48;5;238m▄[38;5;238;48;5;237m▄▄[38;5;238;48;5;238m▄[38;5;238;48;5;239m▄[38;5;238;48;5;95m▄▄▄▄[38;5;239;48;5;95m▄[38;5;237;48;5;95m▄[38;5;234;48;5;239m▄[38;5;237;48;5;240m▄[38;5;239;48;5;239m▄[48;5;239m [38;5;239;48;5;239m▄▄[38;5;239;48;5;238m▄[38;5;238;48;5;238m▄▄▄▄▄▄▄▄[38;5;238;48;5;239m▄▄[38;5;238;48;5;240m▄[38;5;239;48;5;239m▄▄[38;5;238;48;5;239m▄[38;5;239;48;5;239m▄[38;5;238;48;5;239m▄[m\r
[38;5;237;48;5;237m▄▄▄[38;5;238;48;5;238m▄[38;5;237;48;5;237m▄[38;5;238;48;5;237m▄[38;5;238;48;5;238m▄[38;5;237;48;5;238m▄[38;5;237;48;5;237m▄[38;5;238;48;5;237m▄[38;5;238;48;5;238m▄▄[38;5;237;48;5;237m▄▄[38;5;236;48;5;236m▄▄[38;5;234;48;5;234m▄[38;5;233;48;5;233m▄[38;5;236;48;5;235m▄[38;5;137;48;5;95m▄[38;5;137;48;5;137m▄▄[38;5;95;48;5;239m▄[38;5;238;48;5;238m▄▄▄[38;5;239;48;5;238m▄▄[38;5;95;48;5;239m▄▄[38;5;95;48;5;95m▄▄[38;5;236;48;5;237m▄[38;5;232;48;5;233m▄[38;5;232;48;5;234m▄[38;5;234;48;5;237m▄[38;5;238;48;5;239m▄[38;5;239;48;5;239m▄▄[38;5;238;48;5;239m▄▄▄[38;5;238;48;5;238m▄▄▄▄[38;5;238;48;5;237m▄[38;5;237;48;5;237m▄▄▄[38;5;237;48;5;238m▄▄[38;5;238;48;5;238m▄▄▄[48;5;238m [m\r
[38;5;238;48;5;237m▄▄▄[38;5;238;48;5;238m▄▄▄▄▄▄▄[38;5;237;48;5;237m▄▄▄▄[38;5;237;48;5;236m▄[38;5;236;48;5;236m▄[38;5;235;48;5;234m▄▄[38;5;95;48;5;239m▄[38;5;137;48;5;137m▄▄▄▄[38;5;95;48;5;95m▄[38;5;238;48;5;238m▄▄[38;5;239;48;5;239m▄[38;5;95;48;5;95m▄▄▄▄[38;5;239;48;5;95m▄[38;5;234;48;5;235m▄[38;5;232;48;5;232m▄▄[38;5;232;48;5;233m▄[38;5;234;48;5;236m▄[38;5;237;48;5;238m▄[38;5;238;48;5;238m▄[48;5;238m [38;5;238;48;5;238m▄▄[38;5;237;48;5;238m▄▄▄▄[38;5;237;48;5;237m▄▄▄▄▄▄▄[38;5;237;48;5;238m▄[38;5;238;48;5;238m▄[48;5;238m [m\r
[38;5;238;48;5;238m▄[38;5;238;48;5;237m▄[38;5;238;48;5;238m▄[38;5;239;48;5;238m▄▄▄▄▄[38;5;238;48;5;238m▄[38;5;237;48;5;238m▄[38;5;236;48;5;237m▄[38;5;236;48;5;236m▄▄[38;5;236;48;5;237m▄[38;5;236;48;5;236m▄▄[38;5;235;48;5;235m▄▄[38;5;95;48;5;95m▄[38;5;137;48;5;137m▄▄▄▄▄[38;5;95;48;5;95m▄[38;5;239;48;5;238m▄[38;5;239;48;5;239m▄[38;5;239;48;5;95m▄[38;5;95;48;5;95m▄▄[38;5;239;48;5;95m▄[38;5;238;48;5;238m▄[38;5;233;48;5;233m▄[38;5;232;48;5;232m▄▄[38;5;233;48;5;232m▄[38;5;233;48;5;233m▄[38;5;233;48;5;234m▄[38;5;233;48;5;235m▄[38;5;235;48;5;238m▄[38;5;237;48;5;238m▄[38;5;238;48;5;238m▄▄[48;5;237m [38;5;237;48;5;237m▄▄▄▄▄▄▄▄▄▄[38;5;238;48;5;238m▄▄[m\r
[38;5;137;48;5;239m▄[38;5;101;48;5;240m▄[38;5;137;48;5;239m▄[38;5;101;48;5;239m▄[38;5;95;48;5;239m▄[38;5;59;48;5;239m▄[38;5;238;48;5;239m▄[38;5;237;48;5;238m▄[38;5;237;48;5;237m▄[38;5;236;48;5;237m▄[38;5;235;48;5;236m▄[38;5;234;48;5;235m▄[38;5;235;48;5;236m▄▄▄[38;5;235;48;5;235m▄▄▄[38;5;239;48;5;95m▄[38;5;95;48;5;137m▄▄▄▄▄[38;5;95;48;5;95m▄▄[38;5;239;48;5;239m▄▄[38;5;238;48;5;239m▄▄[38;5;238;48;5;238m▄[38;5;236;48;5;237m▄[38;5;233;48;5;233m▄[38;5;232;48;5;232m▄▄[48;5;233m [38;5;232;48;5;233m▄[38;5;233;48;5;233m▄▄[38;5;233;48;5;234m▄[38;5;234;48;5;234m▄[38;5;234;48;5;236m▄[38;5;235;48;5;238m▄[38;5;237;48;5;238m▄[38;5;238;48;5;238m▄▄[38;5;238;48;5;237m▄[38;5;237;48;5;237m▄▄▄▄▄▄[38;5;238;48;5;238m▄▄▄[m\r
[38;5;137;48;5;137m▄[38;5;101;48;5;137m▄[38;5;95;48;5;137m▄[38;5;239;48;5;137m▄[38;5;238;48;5;95m▄[38;5;237;48;5;238m▄[38;5;237;48;5;237m▄▄▄[38;5;236;48;5;236m▄▄[38;5;235;48;5;234m▄[38;5;233;48;5;234m▄▄[38;5;234;48;5;234m▄▄▄▄[38;5;235;48;5;236m▄[38;5;238;48;5;95m▄[38;5;95;48;5;95m▄▄▄▄[38;5;239;48;5;95m▄[38;5;238;48;5;239m▄[38;5;238;48;5;238m▄▄▄[38;5;237;48;5;238m▄[38;5;237;48;5;237m▄[38;5;236;48;5;236m▄[38;5;233;48;5;233m▄[38;5;232;48;5;232m▄▄[38;5;233;48;5;233m▄[38;5;233;48;5;232m▄[38;5;233;48;5;233m▄▄[38;5;234;48;5;233m▄[38;5;234;48;5;234m▄▄▄[38;5;234;48;5;235m▄[38;5;234;48;5;236m▄[38;5;235;48;5;237m▄[38;5;236;48;5;237m▄[38;5;237;48;5;238m▄[38;5;238;48;5;238m▄▄[38;5;238;48;5;237m▄[38;5;237;48;5;237m▄[38;5;238;48;5;238m▄▄▄[48;5;238m [m\r
[38;5;239;48;5;95m▄[38;5;238;48;5;240m▄[38;5;238;48;5;238m▄▄[38;5;237;48;5;238m▄[48;5;237m [38;5;237;48;5;237m▄▄▄[38;5;236;48;5;236m▄[38;5;235;48;5;236m▄[38;5;234;48;5;234m▄[38;5;234;48;5;233m▄[38;5;233;48;5;233m▄▄[38;5;233;48;5;234m▄[38;5;233;48;5;233m▄[38;5;233;48;5;234m▄[38;5;234;48;5;234m▄[38;5;234;48;5;235m▄[38;5;237;48;5;95m▄[38;5;95;48;5;95m▄▄▄[38;5;95;48;5;239m▄[38;5;239;48;5;238m▄[38;5;238;48;5;238m▄[38;5;237;48;5;238m▄[38;5;237;48;5;237m▄▄[38;5;238;48;5;237m▄[38;5;236;48;5;237m▄[38;5;232;48;5;232m▄[38;5;0;48;5;232m▄[38;5;232;48;5;232m▄[38;5;233;48;5;233m▄[38;5;234;48;5;233m▄[38;5;234;48;5;234m▄[38;5;233;48;5;233m▄[38;5;233;48;5;234m▄[38;5;234;48;5;234m▄[38;5;234;48;5;235m▄▄[38;5;234;48;5;234m▄[48;5;234m [38;5;234;48;5;234m▄▄[38;5;234;48;5;235m▄[38;5;235;48;5;236m▄[38;5;237;48;5;238m▄[38;5;238;48;5;238m▄▄▄▄▄▄[m\r
[38;5;236;48;5;238m▄[38;5;237;48;5;238m▄[38;5;238;48;5;238m▄[38;5;238;48;5;237m▄[38;5;237;48;5;237m▄▄▄[38;5;234;48;5;237m▄[38;5;235;48;5;235m▄[38;5;236;48;5;235m▄[38;5;236;48;5;236m▄[38;5;235;48;5;235m▄[38;5;234;48;5;234m▄[38;5;235;48;5;235m▄[38;5;233;48;5;232m▄[38;5;232;48;5;233m▄[38;5;233;48;5;233m▄▄[38;5;233;48;5;234m▄[38;5;233;48;5;233m▄[38;5;233;48;5;234m▄[38;5;234;48;5;239m▄[38;5;237;48;5;95m▄[38;5;95;48;5;95m▄▄▄[38;5;95;48;5;239m▄[38;5;95;48;5;238m▄[38;5;239;48;5;237m▄[38;5;95;48;5;238m▄[38;5;237;48;5;238m▄[38;5;234;48;5;235m▄[38;5;232;48;5;232m▄[38;5;232;48;5;0m▄[38;5;232;48;5;232m▄[38;5;233;48;5;233m▄[38;5;234;48;5;234m▄▄▄[38;5;232;48;5;233m▄[38;5;234;48;5;234m▄▄[38;5;233;48;5;234m▄[38;5;234;48;5;234m▄▄▄[38;5;235;48;5;235m▄[38;5;234;48;5;235m▄[38;5;234;48;5;234m▄[38;5;235;48;5;236m▄[38;5;237;48;5;238m▄[38;5;238;48;5;238m▄▄▄▄▄[m\r`
let thing = chalk.blue('Hello') + ' World' + chalk.red('!') 

const program = blessed.program()
program.cursorColor('000000')
const screen = blessed.screen({
  program: program,
  fastCSR: true,
  dockBorders: true,
  fullUnicode: true,
  cursor: {
    shape: {
      bg: 'red',
      fg: 'white',
    },
    blink: false
  }
});
screen.program.hideCursor(true);
const grid = new BlessedContrib.grid({rows: 12, cols: 12, screen: screen})

screen.title = 'my window title';

const XTermTestv2 = new XTermNew({
  top    : 0,
  bottom : 0,
  width  : '50%',
  align  : 'left',
  tags   : true,
  keys   : true,
  mouse  : true,
  border : 'line',
  style  : {
    label : { bold: true },
    focus:     { border: { fg: "green" } }
  },
  scrollbar : {
    ch    : ' ',
    style : { bg: 'white' },
    track : {
      style : { bg: 'grey' },
    },
  },
}).with(scroll.scroll,scroll.throttle)
screen.append(XTermTestv2)

screen.render()
//XTermTestv2.writeSync("HEHEHEHEHEHEHEHHEHEHEHEHEHEHEHEHEHEHEHEHEHEHEHEHEH\n\nEHEHEHEHEHEHEHEHEHEHEHEHE")
//XTermTestv2.writeSync("[D[D[D".repeat(2))
//XTermTestv2.writeSync(chalk.green.bold.bgBlue("test[D[D[D[D[ATEST"))
let b=XTermTestv2.term.buffer
//XTermTestv2.reset()
XTermTestv2.writeSync("")
XTermTestv2.scrollTo(0)
//XTermTestv2.scrolling=true

screen.render()

const XTermApp=XTermTestv2.term
//might change to an xterm in the future to make it a rolling log, store whats writen to log in a long string
//then write string on exit to a file so that log can be reloaded if desired
//animimate wrting the log via slowly writing it and try this to animate it:
//https://stackoverflow.com/questions/10264261/move-one-character-to-the-left-in-the-console

const logs = new XTermNew({
  top    : '50%',
  bottom : 0,
  left   :'50%',
  width  : '50%',
  align  : 'left',
  tags   : true,
  keys   : true,
  mouse  : true,
  border : 'line',
  style  : {
    label : { bold: true },
    focus:     { border: { fg: "green" } }
  },
  scrollbar : {
    ch    : ' ',
    style : { bg: 'white' },
    track : {
      style : { bg: 'grey' },
    },
  },
}).with(scroll.scroll,scroll.throttle)
screen.append(logs)

const stats=grid.set(0,9,6,1,blessed.box,{
  tags: true,
  padding: {
    left: 1,},
  label: '{bold}stats{/bold}',
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
      //bg: 'green'
    },
    focus:     { border: { fg: "green" } }
  }
  
  }
).with(scroll.scroll,scroll.throttle)
//in the future will be a table with options to view/manage inventory and attack
const actions=grid.set(0,10,6,2,blessed.list,{
  tags: true,
  scrollable: true,
  mouse: true,
  keys: true,
  label: '{bold}actions{/bold}',
  content: thing,
  border: {
    type: 'line'
  },
  style: {
    border: {
      fg: 'magenta'
    },
    hover: {
      //bg: 'green'
    },
    focus:     { border: { fg: "green" } }
  }})

//button container
const form_thing=grid.set(0,6,6,3,blessed.form = blessed.form,({
  parent: screen,
  keys: true,
  label: `choose ~ ${chalk.green('w s')} to scroll`,
  //content: 'test?',
  padding:{
    right:0,
  },
  style: {
    //bg: '#515151',
    //border: {
      //bg: '#000033'},
    focus:     { border: { fg: "green" } }
  },
  alwaysScroll: 'true',
  scrollable: 'true',
  scrollbars: 'true',
  scrollbar: {
    ch: chalk.green.bgBlueBright('\u2592'),
    track: {
      bg: '#630330',
      fg: 'red'
    },
    style: {
      inverse: true
    }
  }
})).with(scroll.scroll,scroll.throttle)

screen.render()

//test button declarations
let button1 = blessed.button({
  parent: form_thing,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: 1,
  top: 1,
  shrink: true,
  name: 'submit',
  content: 'decide to be silly and eat a spud',
  style: {
    bg: '#0066CC',
    focus: {
      bg: '#cc0066'
    },
    hover: {
      bg: '#cc0066'
    }
  }
});

let button2 = blessed.button({
  parent: form_thing,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: 1,
  top: 4,
  name: 'cancel',
  content: 'mmfmmmmmsdsfd uifdsjskad nfsjand kfknjsdhbhjgjvfcdyfvtgbhnjmybguhnjuhynijmk',
  style: {
    bg: '#0066CC',
    focus: {
      bg: '#cc0066'
    },
    hover: {
      bg: '#cc0066'
    }
  }
});

let button3 = blessed.button({
  parent: form_thing,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: 1,
  top: 7,
  shrink: true,
  name: 'cancel',
  content: 'button',
  style: {
    bg: '#0066CC',
    focus: {
      bg: '#cc0066'
    },
    hover: {
      bg: '#cc0066'
    }
  }
});

let button4 = blessed.button({
  parent: form_thing,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: 1,
  top: 10,
  shrink: true,
  name: 'cancel',
  content: 'button 444444444~~~',
  style: {
    bg: '#0066CC',
    focus: {
      bg: '#cc0066'
    },
    hover: {
      bg: '#cc0066'
    }
  }
});

// term.write('\x1b')
// // First \n will cancel any existing escape or go to new line
// // Then the \n\r will put the cursor at the start of the next line
// term.write('\n\n\r')
// term.clear()


//Listeners for test buttons
button1.on('press', function() {
  form_thing.setContent('Canceled.');
  XTermApp.clear();
  XTermApp.reset();
  XTermTestv2.writeSync(caleb);
  screen.render();
});
button2.on('press', function() {
  //logs.setContent(chalk.bgMagenta.blueBright("lolololololololollolololololololol"))
  XTermApp.clear()
  XTermApp.reset()
  XTermTestv2.writeSync(body)
  screen.render();
});

//Listeners
screen.on('resize', function() {
  XTermTestv2.height=screen.height;
  XTermTestv2.width=Math.floor(screen.width/2);
  //logs.setContent("x:"+form_thing.width.toString()+", y:"+form_thing.height.toString()+", submit length:"+button1.width.toString());
  resizeButtons()
});
// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.key('e', function() {
  XTermTestv2.focus();
  screen.render();
});

screen.key('p', function() {
  screen.focusNext();
});

screen.key('s', function() {
});

screen.key('w', function() {
});

//test content key listener
screen.key('y', function() {
  form_thing.resetScroll()
  buttonsArray.forEach((button) => {form_thing.remove(button);button.destroy()})
  buttonsArray=[];
  stats.focus();
  XTermApp.reset()
  eventHandler(temp_event1)
  createButtons(temp_event1,buttonsArray,story);
  form_thing.setContent(` ${chalk.bold.yellow(buttonsArray.length.toString())+" "+chalk.bold.greenBright("choices")}`)
  resizeButtons();
  stats.focus();
});
let buttonsArray = [button1,button2,button3,button4];
//test content
//logs.setContent(caleb)
screen.render();
//screen.render is essential for the correct screenlines amount to calculate
function resizeButtons(){
  buttonsArray.forEach((element) => {element.width=form_thing.width-5})
  screen.render()
  buttonsArray.forEach((element, index, array) => {
    if (!(index===0)){
      let previous=array[index-1]
      element.top=previous.top+previous.getScreenLines().length
    }else{
      element.top=1
    }
  screen.render()
})}
resizeButtons()
// handling creating of buttons from an event. writing body etc
// event reader
// multiple functions, exuction may differ based on event type
// messy, remove redundant code in future
function createButtons(gameEvent,buttonsArr,storyObj={}) {
  gameEvent['buttons'].forEach(item => {
    let temp=new blessed.button({
      parent: form_thing,
      mouse: true,
      keys: true,
      shrink: true,
      padding: {
        left: 1,
        right: 1
      },
      left: 1,
      top: 1,
      shrink: true,
      name: item[1],
      content: item[1],
      //shadow: true,
      style: {
        bg: '#0066CC',
        focus: {
          bg: '#cc0066',
        },
        hover: {
          bg: '#cc0066',
        },
      },
    })
    buttonsArr.push(temp)
    temp.on('press', function() {
      //potential for random events in the future
      XTermApp.clear()
      XTermApp.reset()
      eventHandler(storyObj[item[0]])

      buttonsArr.forEach((element)=>{form_thing.remove(element);element.destroy()})
      buttonsArray.forEach((element)=>{form_thing.remove(element);element.destroy()})

      buttonsArr=[]
      buttonsArray=[]

      //logs.focus();
      createButtons(storyObj[item[0]],buttonsArray,storyObj);
      resizeButtons();
      stats.focus();
      form_thing.setContent(` ${chalk.bold.yellow(buttonsArray.length.toString())+" "+chalk.bold.greenBright("choices")}`)
      screen.render();
    })
  })
}
// basically to map event to a object using the event id as a key, 
// this is so that events can be looked up by button param then loaded
// idea is for events eventually to be read from a json file
function createEventsMap(eventsArrary=[],storyArr={}) {
  eventsArrary.forEach((element)=>{
    storyArr[element.id]=element
  })
}
//return maybe idek
createEventsMap(testEventArr,story)
stats.focus()
screen.render()

//sloppy but easy way to make it work
function eventHandler(gameEvent){
  XTermTestv2.writeSync(gameEvent['toScreen'].toString())
  logs.writeSync('\n\n')
  logs.writeSync(gameEvent['body'])
  XTermTestv2.writeSync("\n\r"+chalk.green(JSON.stringify(gameEvent)))
  if (gameEvent instanceof(game_event_gain_item)){
  } else if (gameEvent instanceof(game_event_enemy)){
  } else if (gameEvent instanceof(game_event_gain_item)){
  }
}

//CSI (Control Sequence Introducer) sequences TEST ~ will be used to animate in the future
//test async
//test code escape sequences \033[D\033[D\033[D. maybe use  char
// "\033[F" – move cursor to the beginning of the previous line
//
//
//DONT USE M TO SCROLL UP
//up - "\033[A"
//down - "\033[B"
//left - "\033[D"
//right - "\033[C"
async function test(){
  await new Promise(resolve => setTimeout(resolve, 1000));
  XTermTestv2.writeSync("\u2592".repeat(90))
  XTermTestv2.writeSync("[D[D[D".repeat(2))
  XTermTestv2.writeSync(chalk.green.bold.bgBlue("test[D[D[D[D[ATEST"))
  XTermTestv2.writeSync('[C'.repeat(6)+'[B'.repeat(6))
  XTermTestv2.writeSync('apple')

  XTermTestv2.writeSync(b.active.cursorX+", "+b.active.cursorY+'[B')
  XTermTestv2.writeSync(`[${40}D~hhmhmhmhmhm[B`)
  XTermTestv2.writeSync(b.active.cursorX+", "+b.active.cursorY+'[B')
  XTermTestv2.writeSync("cols: "+XTermTestv2.term.cols)

  //XTermApp.buffer
}
let scrollPosition = 0;
XTermTestv2.term.onScroll((apple)=>{scrollPosition=apple.valueOf()})
function escLeftByNum(num){
  return `[${num}D`
}
function escRightByNum(num) {
  return `[${num}C`
}
function escUpByNum(num){
  return `[${num}A`
}
function escDownByNum(num){
  return `[${num}B`
}
function findCursor(terminal=XTermTestv2){
  return [terminal.term.buffer.active.cursorX, terminal.term.buffer.active.cursorY];
}
function goToTermPosStr(arr1,terminal=XTermTestv2){
  let arr2 = findCursor(terminal)
  let Xpos = arr1[0]-arr2[0]
  let Ypos = arr1[1]-arr2[1]
  let escHorizontalChars = Xpos >=0 ?  escRightByNum(Xpos) : escLeftByNum(Math.abs(Xpos))
  let escVerticalChars = (Ypos >=0) ? escDownByNum(Ypos) : escUpByNum(Math.abs(Ypos))
  return `${escHorizontalChars}${escVerticalChars}`
}

async function slowWrite(str='',terminal,speed){
  str.replace(/\n+/g, ' ')
  str.replace(/\r+/g, ' ')
  let strArr=str.split(' ')
  for (let [index,tempStr] of strArr.entries())
  {
    tempStr+=' '
    let cursorX = terminal.term.buffer.active.cursorX; 
    let tempStrLength = tempStr.length
    let numCols = terminal.term.cols
    if (index === 0) {
    }
    else if (index === strArr.length - 1) {
    }
    if (cursorX===(numCols-1)){
    }
    if (1 + cursorX + tempStrLength <= numCols){
      terminal.writeSync(chalk.hex('909090')(tempStr))
      await new Promise(resolve => setTimeout(resolve, speed));
      terminal.writeSync(`${escLeftByNum(tempStrLength)}${chalk.hex('FFFFFF')(tempStr)}`)
      await new Promise(resolve => setTimeout(resolve, speed));
      //unwrite then rewrite diff color
    }else{
      // check how scrolling affects logged cursor positions and if it should decrement Y position
      terminal.writeSync(`\n${chalk.hex('909090')(tempStr)}`)
      await new Promise(resolve => setTimeout(resolve, speed));
      terminal.writeSync(`${escLeftByNum(tempStrLength)}${chalk.hex('FFFFFF')(tempStr)}`)
      await new Promise(resolve => setTimeout(resolve, speed));
    }
  }
}
//
// TEST CODE
//
//slowWrite(test1,XTermTestv2,20)
//await new Promise(resolve => setTimeout(resolve, 1500))

//XTermTestv2.writeSync(`\n`)
//animate ideas, queue of words that form gradient, Lines that form gradient, set sections are writen
function fitLines(str='',cols=0){
  //various checks for characters that screw up the line wrapping
  let str1 = str.replace(/\n+/g, '')
  let str2 = str1.replace(/\\n+/g, '')
  let str3 = str2.replace(/\r+/g, '')
  let strArr=str3.split(/\b(?![\s.])/);
  let lines=[]
  let rollingCount=0
  let line=[]
  for(let item of strArr){
    rollingCount+=item.length
    if(rollingCount>cols){
      if (rollingCount-1===cols){
        line[line.length-1]=line[line.length-1].slice(0, -1)
      }
      lines.push(line)
      rollingCount = item.length
      line=[]
      line.push(item)
    }else{
      line.push(item)
    }
  }
  lines.push(line)
  return lines
}
//doesn't change array length unlike normal shift method
function shiftArray(arr=[1,2,3,4,5],end='',populate=true,populateArray=['h','i','j','k','l',]){
  let retVal = arr[0]
  for (let i = 0; i < arr.length-1; i++){
    arr[i]=arr[i+1]
    }
  arr[arr.length-1] = populate ? shiftArray(populateArray,end,false): end
  return retVal
}

function mapTextPosition(textArr){
  let lines = textArr;
  for(let y=0;y<lines.length;y++){
    for(let x=0;x<lines[y].length;x++){
      lines[y][x]=[lines[y][x],x,y]
    }  
  } 
}
let rainbowVoil=[ 'ee82ee', '4b0082', '0000ff', '008000', 'ffff00', 'ffa500', 'ff0000', ]
let rainbowWithBlue=[ '93CAED', 'ee82ee', '4b0082', '0000ff', '008000', 'ffff00', 'ffa500', 'ff0000' ]
async function scanlines(terminal=XTermTestv2,text='', speed=5,colorArr=[]){
  colorArr = colorArr ? colorArr : [ '93CAED', 'ee82ee', '4b0082', '0000ff', '008000', 'ffff00', 'ffa500', 'ff0000' ] 
  let lines = fitLines(text,terminal.term.cols)
  let arr2 = Array(colorArr.length).fill('')
  let cursorPos = 1
  let arr=arr2.map((content,index,arr)=>{arr[index] = [cursorPos,content]})
  for(let line of lines){
    for(let i = 0; i < line.length+arr.length-1; i++){
      shiftArray(arr,'',true,line)
      shiftArray(arr2,['','',],false)
      arr2[arr2.length-1] = [cursorPos , arr[arr.length-1]]
      for(let i = arr.length-1; i > - 1 ; i--){
        if (arr2[i][0]){
          terminal.writeSync(`[${arr2[i][0]}G${chalk.hex(colorArr[i])(arr2[i][1])}`) 
          await new Promise(resolve => setTimeout(resolve,speed))
        }
      }
      cursorPos = cursorPos+=arr[arr.length-1].length
   }
   terminal.writeSync('\n')
   cursorPos = 1
  }
}

async function gradient_scanlines(terminal=XTermTestv2,text="", speed=5,gradientFunction,colorArr=[]){
  let lorem_lines=fitLines(text,terminal.term.cols)
  let multiline=``
  for(let line of lorem_lines){
    let line_str=line.join('')
    line_str=line_str.concat('\n')
    multiline=multiline.concat(line_str)
  }
  multiline=gradientFunction(multiline)
  let cleaned=''
  let cleanUp=fitLines(lorem,terminal.term.cols)
  for(let line of cleanUp){
    let line_str=line.join('')
    line_str=line_str.concat('\n')
    cleaned=cleaned.concat(line_str)
  }
  let texttoarr = multiline 
  let texttoarr2 = cleaned 
  let strArr=texttoarr.split("\n");
  let strArr2=texttoarr2.split("\n");
  for(let i=0;i<strArr.length;i++){
    strArr[i]=strArr[i].split(" ")
    strArr2[i]=strArr2[i].split(" ")
  }
  let temp_arr=JSON.parse(JSON.stringify(strArr2))
  mapTextPosition(temp_arr) 
  //effectivelly ignores first element of array so must compensate for that
  colorArr = colorArr ? [colorArr[0],...colorArr] : [ 'ffffff','ffffff', 'ee82ee', '4b0082', '0000ff', '008000', 'ffff00', 'ffa500', 'ff0000' ] 
  let gradient_text = strArr;
  let lines = temp_arr;
  let arr2 = Array(colorArr.length).fill('')
  let cursorPos = 1
  //add 2d array word position
  let arr=arr2.map((content,index,arr)=>{arr[index] = [cursorPos,content,0/*XposArr*/,0/*YposArr*/]})
  for(let line of lines){
    for(let [index,word] of line.entries()){
      line[index][0]=word[0].concat(' ')
    }
  }
  for(let line of gradient_text){
    for(let [index,word] of line.entries()){
      line[index]=word.concat(' ')
    }
  }
  for(let x=0;x<lines.length;x++){
    let line = lines[x]
    for(let i = 0; i < line.length+arr.length-1; i++){
      shiftArray(arr,'',true,line)
      shiftArray(arr2,['','',0,0,],false)
      arr2[arr2.length-1] = [cursorPos , arr[arr.length-1]]
      for(let i = arr.length-1; i > - 1 ; i--){
        if(!(i===0)){
          if (arr2[i][0]){
            if (arr2[i][1][0]){terminal.writeSync(`[${arr2[i][0]}G${chalk.hex(colorArr[i])(arr2[i][1][0])}`)}
            await new Promise(resolve => setTimeout(resolve,speed))
          }
        }else if(i===0){
          if (arr2[i][0]){
            if (arr2[i][1][0]){terminal.writeSync(`[${arr2[i][0]}G${gradient_text[arr2[i][1][2]][arr2[i][1][1]]}`)}
            await new Promise(resolve => setTimeout(resolve,speed))
          }
        }
      }
      try {
        cursorPos = cursorPos+=arr[arr.length-1][0].length
      } catch (error) {
        cursorPos = cursorPos+=0
      }
   }
   terminal.writeSync('\n')
   cursorPos = 1
  }
}



//ESC[?25l	make cursor invisible
//ESC[?25h	make cursor visible
//
//double check cursor is disabled on all subterminals and main one
console.log('[?25l')
XTermTestv2.writeSync('[?25l')
logs.writeSync('[?25l')

function toggleUi(){
  form_thing.toggle()
  XTermTestv2.toggle()
  logs.toggle()
  stats.toggle()
  actions.toggle()
}
toggleUi()
screen.render()
await new Promise(resolve => setTimeout(resolve, 1500))
//toggleUi()
stats.focus()
screen.render()
//stats box
var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '40%',
  height: 10,
  tags: true,
  keys: true,
  content: '{bold}hmm{/bold}!',
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    //bg: 'magenta',
    border: {
      //fg: '#4b0082',
      //bg: '#4b0082',
    },
    hover: {
      bg: 'green'
    }
  }
});
// perhaps pass to constructer but unessential
let thePlayer = new Player("name")
thePlayer.str = rollStat();
thePlayer.hp = 10+thePlayer.str;
thePlayer.hpMax = thePlayer.hp;
thePlayer.int = rollStat();
thePlayer.dex = rollStat();
thePlayer.cha = rollStat();
thePlayer.basedamage= thePlayer.str+5

screen.append(box);
screen.render()
await new Promise(resolve => setTimeout(resolve, 700))
box.pushLine(`${' '.repeat(Math.floor(box.width/2)-' HP: '.length-2)} hp: ${thePlayer.hp}`)
screen.render()
await new Promise(resolve => setTimeout(resolve,  1))
box.pushLine(`${' '.repeat(Math.floor(box.width/2)-'str: '.length-2)}str: ${thePlayer.str}`)
screen.render()
await new Promise(resolve => setTimeout(resolve, 1))
box.pushLine(`${' '.repeat(Math.floor(box.width/2)-'dex: '.length-2)}dex: ${thePlayer.dex}`)
screen.render()
await new Promise(resolve => setTimeout(resolve, 1))
box.pushLine(`${' '.repeat(Math.floor(box.width/2)-'int: '.length-2)}int: ${thePlayer.int}`)
screen.render()
await new Promise(resolve => setTimeout(resolve, 1))
box.pushLine(`${' '.repeat(Math.floor(box.width/2)-'cha: '.length-2)}cha: ${thePlayer.cha}`)
screen.render()
await new Promise(resolve => setTimeout(resolve, 1))
box.pushLine(`\n${' '.repeat(Math.floor(box.width/2)-Math.floor('[ ENTER to continue ]'.length/2)-3)}[ ENTER to continue ]`)
screen.render()
box.focus()
box.key('enter', function() {
  toggleUi()
  box.hide()
}
)

function refreshStats(player=thePlayer) {
  stats.setContent(
`{bold}${chalk.red("HP ")}{/bold} = ${thePlayer.hp}
{bold}${chalk.green("AC ")}{/bold} = ${thePlayer.ac}
${chalk.yellowBright('str')} = ${thePlayer.str}
${chalk.grey('int')} = ${thePlayer.int}
${chalk.hex('000080')('dex')} = ${thePlayer.dex}
${chalk.hex('630330')('cha')} = ${thePlayer.cha} 
${chalk.magenta("dmg")} = ${thePlayer.basedamage}
${chalk.magenta("mag")} =`)
    screen.render()
}

refreshStats()
box.focus()
screen.render()

let bb =`    ${chalk.bold(`THE VILLAGE`)}
[37m[40m                                           [m
[37m[40m                   [33m[40m▒▒▒░░[37m[40m                   [m
[37m[40m                 [33m[40m▒▒▒▒░░░░░[37m[40m                 [m
[37m[40m                [33m[40m██▓▓▓▓▓▓▓██[37m[40m                [m
[37m[40m       [33m[40m▒▒▒░░[37m[40m    [33m[40m▐▓▒░█▒  ░▓▌[37m[40m                [m
[37m[40m     [33m[40m▒▒▒▒░░░░░[37m[40m  [33m[40m▐▓▒░█▒[37m[40m  [33m[40m░▓▌[37m[40m    [33m[40m▒▒▒░░[37m[40m       [m
[37m[40m    [33m[40m██▓▓▓▓▓▓▓██[37m[40m         [93m[40m▄[37m[40m     [33m[40m▒▒▒░░░░░[37m[40m     [m
[37m[40m    [33m[40m▐▓▒░█▒  ░▓▌[37m[40m         [91m[40m█[37m[40m   [33m[40m██▓▓▓▓▓▓▓██[37m[40m    [m
[37m[40m    [33m[40m▐▓▒░█▒[37m[40m  [33m[40m░▓▌[37m[40m             [33m[40m▐▓▒░█▒  ░▓▌[37m[40m    [m
[37m[40m        [93m[40m▄[37m[40m     [33m[40m▒▒▒░░[37m[40m        [93m[40m▄[33m[40m▐▓▒░█▒[37m[40m  [33m[40m░▓▌[37m[40m    [m
[37m[40m        [96m[40m█[37m[40m   [33m[40m▒▒▒▒░░░░░[37m[40m   [93m[40m▄[37m[40m  [95m[40m█[37m[40m               [m
[37m[40m     [32m[40m░░[37m[40m    [33m[40m██▓▓▓▓▓▓▓██[37m[40m  [94m[40m█[37m[40m                  [m
[37m[40m       [32m[40m░░[37m[40m  [33m[40m▐▓▒░█▒  ░▓▌[37m[40m    [32m[40m░░░[37m[40m    [33m[40m▒▒▒░░[37m[40m     [m
[37m[40m           [33m[40m▐▓▒░█▒[37m[40m  [33m[40m░▓▌[37m[40m   [32m[40m░[37m[40m     [33m[40m▒▒▒▒░░░░░[37m[40m   [m
[37m[40m                              [33m[40m██▓▓▓▓▓▓▓██[37m[40m  [m
[37m[40m         [32m[40m░[37m[40m [32m[40m░[37m[40m [32m[40m░[37m[40m                [33m[40m▐▓▒░█▒  ░▓▌[37m[40m  [m
[37m[40m                     [32m[40m░░░░░[37m[40m    [33m[40m▐▓▒░█▒[37m[40m  [33m[40m░▓▌[37m[40m  [m
[37m[40m                                           [m
`
let mountain=`[37m[40m                        [97m[40m░░[37m[40m                            [m
[37m[40m                  [97m[40m▒░[37m[40m   [97m[40m░██▓▓[90m[40m░░[37m[40m                        [m
[37m[40m                 [97m[40m█▓░░[37m[40m [97m[40m░▓█████▓▒░░[37m[40m [90m[40m░[37m[40m                   [m
[37m[40m               [97m[40m▓▓▒░░▓███▒█▒▒███▓▒░[90m[40m░[37m[40m  [90m[40m░[37m[40m                [m
[37m[40m             [97m[40m░▓░░[37m[40m [90m[40m░[97m[40m█▒█[90m[40m░[97m[40m░▒█[90m[40m░░▒░[97m[40m░█▓▒[90m[40m░[37m[40m  [90m[40m░░[37m[40m               [m
[37m[40m           [97m[40m░▒▒░[37m[40m  [90m[40m░[97m[40m██[37m[40m▒░ [97m[40m░[90m[40m░░[37m[40m  [97m[40m▓▓▒[37m[40m [97m[40m░▓▓▒[37m[40m  [90m[40m░[37m[40m  [97m[40m▒▓[37m[40m           [m
[37m[40m         [97m[40m░▒▒[37m[40m   [97m[40m░▓[90m[40m▓[37m[40m▒░░ [90m[40m░[37m[40m▒[90m[40m░[37m[40m   [90m[40m░▒[97m[40m▓▒░[37m[40m  [97m[40m▓[96m[40m▓░[90m[40m▒[97m[40m▒▒▒▒▓▒[37m[40m         [m
[37m[40m   [97m[40m░▒▓▓▓▒▒[37m[40m   [97m[40m░▓█[37m[40m▓░░ ░▒░ [97m[40m█▓[37m[40m   [90m[40m░▒▒[97m[40m▓[90m[40m░[96m[40m▒███[97m[40m▓░[37m[40m    [97m[40m▓▓▒[37m[40m       [m
[37m[40m  [97m[40m▒▓░[37m[40m [97m[40m░█▓▒░[37m[40m [97m[40m░█[90m[40m▒[37m[40m░░ ▒▒[90m[40m░[37m[40m  ▓▓[97m[40m▒▒░[37m[40m  [90m[40m░░[97m[40m▓[96m[40m▓▓██[90m[40m█▓░[37m[40m     [90m[40m░[97m[40m▓▒[37m[40m      [m
[37m[40m [97m[40m▓▓░▒▒[90m[40m░[37m[40m  [97m[40m▒██▓[90m[40m░[37m[40m░░░▒[90m[40m░[37m[40m  [97m[40m░▒[37m[40m█▒░ [97m[40m▒▒[37m[40m  [96m[40m░▓███░[37m[40m [90m[40m▓█[37m[40m      [90m[40m░[97m[40m▓▓[37m[40m     [m
[37m[40m [97m[40m░[37m[40m  [97m[40m░▒▒▒[90m[40m░[37m[40m  [90m[40m░[97m[40m▓▓▓▓[90m[40m░░[37m[40m  [97m[40m▒▒[90m[40m░░░░█[37m[40m [97m[40m▒▒[37m[40m [96m[40m░░█████░[90m[40m██▓░[37m[40m     [97m[40m▓▒[37m[40m    [m
[37m[40m       [97m[40m▓▒▒░[90m[40m░[37m[40m   [97m[40m▓▒[90m[40m░[37m[40m ░[97m[40m▒[90m[40m░░[37m[40m  ▓[90m[40m░░[37m[40m [97m[40m░▒▒[37m[40m [96m[40m▒[37m[40m   [96m[40m▓█▒[37m[40m [90m[40m▒▓▓[37m[40m     [97m[40m▒▒▒[37m[40m  [m
[37m[40m      [90m[40m░░[37m[40m [97m[40m░░[90m[40m░[37m[40m     [90m[40m░[37m[40m █[90m[40m░▓[37m[40m    ░[90m[40m░░[37m[40m  [97m[40m▒░[37m[40m    [96m[40m░██░[37m[40m  [90m[40m▒▓░[37m[40m     [97m[40m▒▒[90m[40m░[m
[37m[40m     [90m[40m░░[37m[40m    [90m[40m░░▒░░░░[37m[40m ▒[90m[40m░[37m[40m       [90m[40m█[37m[40m░        [96m[40m█░[37m[40m    [90m[40m░░[37m[40m       [90m[40m░[m
[37m[40m     [90m[40m░[37m[40m         [90m[40m░[37m[40m [33m[40m░░░░░░[37m[40m▒[33m[40m░░░░[32m[40m░░▒▒▒░[37m[40m [33m[40m░░[94m[40m▓▓▓[33m[40m░▒▒▒▒▒▒▒▒▒▒░░░[m
[37m[40m [33m[40m░░░▒▒▒▒▒▒▒[32m[40m▓▓▓▓▒▒▒▒[33m[40m░░[32m[40m▒▒[37m[40m▓[32m[40m▒▓████▒[33m[40m░▒▒▒[34m[40m▓[94m[40m█▓[33m[40m░░░░[37m[40m            [m
[37m[40m    [32m[40m░░░░░░▒▒░░▒▓▓▓▒▒▒▒[37m[40m▓░[32m[40m▓░[37m[40m  [32m[40m░▒▓▓▒▒▒[34m[40m▒▓[32m[40m▒▒░░░░░░░░░[37m[40m      [m
[37m[40m        [32m[40m░▒▒█▓▒▒░░░▒▒██[37m[40m░[32m[40m▓▒░[37m[40m    [32m[40m░░░[37m[40m   [34m[40m░░▒▒▓▒[37m[40m            [m
[37m[40m   [32m[40m▒▒▒░░▒▒▓█████▓████[37m[40m▓▓[32m[40m▒░[37m[40m [32m[40m░▒▒▒▒░░░░░░░[34m[40m▒░▒[32m[40m▒[37m[40m            [m
[32m[40m▒▒[33m[40m░░░[32m[40m▓█▓▒▒░[37m[40m [33m[40m░░[32m[40m░██░[37m[40m ░▓      [32m[40m░▒░░░░░▒▒[34m[40m▓▓▓[37m[40m  [32m[40m▒▓░[37m[40m          [m
[37m[40m  [37m[43m▄▄▄[37m[40m▄[33m[40m░░░[32m[40m▒▒░[37m[43m▄[33m[40m▀[37m[40m    ░█░    [94m[40m▒▒▒[34m[40m▓[94m[40m███▓▓▒[34m[40m▒▒[32m[40m░▓▓▒░[37m[40m            [m
[37m[40m [33m[40m░░░░[37m[40m▒[33m[40m███[37m[40m   ▒     █▀   [94m[40m░█▓▓████▒███▓▒[37m[40m [32m[40m░░░░▓[37m[40m           [m
[37m[40m [33m[40m████[37m[40m▀▀▒▄▄▄▒▒   ▄▀▀   [94m[40m▒░█▒▒█▒▓███▒░█▒[37m[40m     [32m[40m▓[37m[40m           [m
[37m[40m [33m[40m▀▀[37m[43m▄▄[37m[40m▄▄▒    ▀▀▀▀▀     [94m[40m█▓█▒█▒[37m[40m                          [m
[37m[40m                     [94m[40m░▓▒░░[37m[40m                            [m
[37m[40m                                                      [m
`
//reminder how to convert ansi art to utf8
//run script on cmder to convert my ansi art to utf8
//ansiart2utf8 mountain.ans > sometext.txt
//XTermTestv2.write(mountain)

//test string
let lorem=
`Lorem ipsum dolor sit amet, 
consectetur adipiscing elit. 
Morbi varius ut augue ac sagittis. 
Vivamus lectus lacus, commodo eu ligula pulvinar, 
tincidunt congue sapien. 
Morbi fringilla sollicitudin ante eget accumsan. 
Aliquam diam felis, 
posuere sit amet felis id, 
condimentum rutrum dolor. 
Donec semper sagittis condimentum. 
Mauris vitae pellentesque tellus. 
Integer velit neque, 
fermentum vel tempus non, 
pulvinar id tellus.
`
var grad = smallGrad(['#5ee7df', '#b490ca']);
var grad2 = grad.hsv(6);
grad2.forEach((color, i, arr) => {
	arr[i]=color.toHex()
})
grad2.reverse()
//vice: {colors: ['#5ee7df', '#b490ca'], options: {interpolation: 'hsv'}},
await new Promise(resolve => setTimeout(resolve, 1000));
XTermTestv2.writeSync(gradient_scanlines(XTermTestv2,lorem,5,gradient.vice.multiline,grad2))
await new Promise(resolve => setTimeout(resolve, 1000));

//start event, display mountain, goto mountian or goto village