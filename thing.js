#!/usr/bin/env node
import blessed from 'blessed';
import chalk from 'chalk';
import BlessedContrib from 'blessed-contrib';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import {game_event} from './game_events.js'
import XTerm from 'blessed-xterm'
import { clearInterval } from 'timers';





var body = 
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
[1;31m♥♥[0m\r
`
var caleb =

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



const screen = blessed.screen({
  fastCSR: true,
  dockBorders: true,
  fullUnicode: true
});
screen.program.hideCursor();
var thing = chalk.blue('Hello') + ' World' + chalk.red('!') 
var grid = new BlessedContrib.grid({rows: 12, cols: 12, screen: screen})

screen.title = 'my window title';

const opts = {
  shell:         null,
  args:          [],
  cursorType:    "block",
  border:        "line",
  scrollback:    1000,
  style: {
      fg:        "default",
      bg:        "default",
      border:    { fg: "default" },
      focus:     { border: { fg: "green" } },
      scrolling: { border: { fg: "red" } }
  }
}

var XTermThing = new XTerm(Object.assign({}, opts, {
  left:    0,
  top:     0,
  width:   Math.floor(screen.width / 2),
  height:  screen.height,
  label:   "Screen"}))

XTermThing.scrolling=true

screen.append(XTermThing)
screen.render()

var XTermApp=XTermThing.term


screen.on('resize', function() {
  XTermThing.height=screen.height;
  XTermThing.width=screen.width/2;
  //Left_space_button = Math.floor((form_thing.width-submit.width)/2);
  //submit.left=Left_space_button
  logs.setContent("x:"+form_thing.width.toString()+", y:"+form_thing.height.toString()+", submit length:"+button1.width.toString());
  buttonsArray.forEach((element) => {element.width=form_thing.width-5})
  screen.render();
  buttonsArray.forEach((element, index, array) => {
    if (!(index===0)){
      let previous=array[index-1]
      element.top=previous.top+previous.getScreenLines().length
    }else{
      element.top=1
    }
  })
  screen.render();
});


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
    },
    focus:     { border: { fg: "green" } }
  }
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
    },
    focus:     { border: { fg: "green" } }
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
    },
    focus:     { border: { fg: "green" } }
  }})




 
// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});
 


var form_thing=grid.set(0,6,6,3,blessed.form = blessed.form,({
  parent: screen,
  keys: true,
  label: "choose. w,s to scroll",
  bg: 'magenta',
  content: 'test?',
  padding:{
    right:0,
  },
  style: {
  focus:     { border: { fg: "green" } }
  },
  alwaysScroll: 'true',
  scrollable: 'true',
  scrollbars: 'true',
  scrollbar: {
    ch: chalk.red.bgYellow('\u2592'),
    track: {
      bg: 'green',
      fg: 'red'
    },
    style: {
      inverse: true
    }
  }
}));

screen.render()

var button1 = blessed.button({
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
    bg: 'blue',
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
});

var button2 = blessed.button({
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
    bg: 'blue',
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
});

var button3 = blessed.button({
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
    bg: 'blue',
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
});

var button4 = blessed.button({
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
    bg: 'blue',
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
});

button1.on('press', function() {
  //form_thing.submit();
  form_thing.setContent('Canceled.');
  XTermApp.clear();
  XTermApp.reset();
  XTermThing.write(caleb);
  screen.render();
});

button2.on('press', function() {
  //form_thing.reset();
  logs.setContent(temp_event1.body)
  XTermApp.clear()
  XTermApp.reset()
  XTermThing.write(body)
  screen.render();
});


// term.write('\x1b')
// // First \n will cancel any existing escape or go to new line
// // Then the \n\r will put the cursor at the start of the next line
// term.write('\n\n\r')
// term.clear()

screen.key('q', function() {
  process.exit(0);
});

screen.key('l', function() {
  XTermThing.height=screen.height;
  XTermThing.width=screen.width/2;
  screen.render();
});




form_thing.focus()

screen.key('p', function() {
  screen.focusNext();
});
screen.key('s', function() {
  form_thing.scroll(1)
  form_thing.focus();
});

screen.key('w', function() {
  form_thing.scroll(-1)
  form_thing.focus();
});

var rainbow=chalkAnimation.rainbow('helllllllllllooooo world!').stop()

//takes chalk Animation that's stopped
function rainbowAnimate(item){
  XTermApp.clear();
  XTermThing.write(item.frame())
  screen.render()
}
//var thingy=setInterval(rainbowAnimate,10,rainbow)
//function buttonPosition(item){


XTermThing.write((gradient.pastel.multiline(
`Hello world! i amdfbssdfbfsdbfdbfsdjbfdsjk\r
writing down randomdfbbfdssdfbdfbsbfdsdbfsdb\r
words lalalalaallalalashdfdsbffbdfbdssbdfb\r
iujjuasudhufjiasdfnuhijsfdauihjsvdvdvfds\r`)));
//logs.setContent(gradient.fruit("aaaaaaappellpapldplsdpas"))
//logs.setContent("x:"+form_thing.width.toString()+", y:"+form_thing.height.toString()+", submit length:"+button1.width.toString()+"");
logs.setContent(caleb)
screen.render();


// handling creating of buttons from an event. writing body etc
// event reader
// multiple functions, exuction may differ based on event type


//button spacing function


var temp_event1=new game_event({'id':1, 'body':"sasffsasgsasg", 'toScreen':"world", 'buttons':[[1,"goto 1(recur)"],[2,"goto 2"]]})
var temp_event2=new game_event({'id':2,'body':chalk.blue("event2"),'toScreen':"adasfas",'buttons':[[1,"goto 1"],[3,"goto 3"]]})
var temp_event3=new game_event({'id':3,'body':chalk.red("event3"),'toScreen':"dsfdasg",'buttons':[[2,"goto 2"]]})

var buttonsArray = [button1,button2,button3,button4];

// button2.width = form_thing.width-5
// button1.width = form_thing.width-5
// button3.width = form_thing.width-5
// button4.width = form_thing.width-5


//screen.render is essential for the correct screenlines amount to calculate
buttonsArray.forEach((element) => {element.width=form_thing.width-5})

screen.render()

buttonsArray.forEach((element, index, array) => {
  if (!(index===0)){
    let previous=array[index-1]
    element.top=previous.top+previous.getScreenLines().length
  }else{
    element.top=1
  }
})


screen.render()