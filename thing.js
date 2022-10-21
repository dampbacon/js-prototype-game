#!/usr/bin/env node
'use strict';

import blessedpkg from 'blessed';
import chalk from 'chalk';
import gradient from 'gradient-string';
import {game_event, game_event_enemy, game_event_gain_item} from './game-objects/game_events.js';
import {Player} from './game-objects/player.js';
import './blessed/patches.cjs';
import pkg from 'iconv-lite';
import smallGrad from 'tinygradient';
import lodashC from 'lodash.compact';
import {copyMonster, monster} from './game-objects/mobs.js';
import {chance2, resetRandoms} from './game-objects/random_nums.js';
import {buttonsContainer, createStatsBox, ImageScreenTerm, InventoryBox, logs, program, screen, stats} from "./ui.js";
import {escLeftByNum, escUpByNum, gradient_scanlines, rollLog} from "./writeMethods.js";
import XTermNew from "./blessed-xterm/blessed-xterm.js";
import { padString, testContent } from './game-objects/data.js';
import { combatMetrics } from './game-objects/metrics.js';
const { tinygradient } = smallGrad;
const { iconv } = pkg;
const { compact } = lodashC;
const {blessed} = blessedpkg
let death = false;
let buttonsArray = [];
let story = {}
let combatButtonsMap = {}
let thePlayer = new Player("name")
let box=createStatsBox()
// test content
let tempMonster = new monster({
	name: "testCreature",
	hitDie: 3,
	ac: 6,
	morale: 6,
	weapon: "ruler",
	dmgDie: 6,
	aggro: 6,
	rarity: 1
})
const rainbowVoil = ['ee82ee', '4b0082', '0000ff', '008000', 'ffff00', 'ffa500', 'ff0000',]
const rainbowWithBlue = ['93CAED', 'ee82ee', '4b0082', '0000ff', '008000', 'ffff00', 'ffa500', 'ff0000']

//test string
const lorem =
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
pulvinar id tellus.`

const pgrad = ['#3f51b1', '#5a55ae', '#7b5fac', '#8f6aae', '#a86aa4', '#cc6b8e', '#f18271', '#f3a469', '#f7c978'].reverse()


const mountain = `[37m[40m                        [97m[40m░░[37m[40m                            [m
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
const dice=`[37m[40m          [97m[40m▄▄▄[37m[40m          [m
[37m[40m      [97m[40m▄▄▀▀[37m[40m █ [97m[40m▀▀▄▄[37m[40m      [m
[37m[40m  [97m[40m▄▄▀▀[90m[40m▄▄▄▄[90m[47m▀[90m[40m▀[90m[47m▀[90m[40m▄▄[37m[40m  [97m[40m▀▀▄▄[37m[40m  [m
[37m[40m [90m[40m▄[97m[40m█[90m[40m▀▀▀[37m[40m   ▄▀ ▀▄ [90m[40m▀▀▀▄▄[97m[40m█[90m[40m▄[37m[40m [m
[37m[40m [90m[40m█[97m[40m▀▄[37m[40m   ▄[91m[47m▄[91m[40m▄▄[37m[40m [91m[40m▄▄[91m[47m▄[37m[40m▄   [97m[40m▄▀[90m[40m█[37m[40m [m
[37m[40m [90m[40m█[37m[40m [97m[40m█[37m[40m  ▄▀[91m[40m▄▄█[37m[40m [91m[40m█[37m[40m [91m[40m█[37m[40m▀▄  [97m[40m█[37m[40m [90m[40m█[37m[40m [m
[37m[40m [90m[40m█[37m[40m  [97m[40m█[37m[40m█  [91m[40m█▄▄[37m[40m [91m[40m█▄█[37m[40m  █[97m[40m█[37m[40m  [90m[40m█[37m[40m [m
[37m[40m [90m[40m█[37m[40m ▄[97m[40m▀[90m[47m▄[97m[40m▀▀▀▀[91m[47m▄▄▄[97m[40m▀▀▀▀[90m[47m▄[97m[40m▀[37m[40m▄ [90m[40m█[37m[40m [m
[37m[40m [90m[40m▀[90m[47m▄[37m[40m   [90m[40m▀▄[37m[40m  [91m[40m█▄█[37m[40m  [90m[40m▄▀[37m[40m   [90m[47m▄[90m[40m▀[37m[40m [m
[37m[40m   [90m[40m▀▀▄▄[37m[40m [90m[40m█[37m[40m [91m[40m█▄█[37m[40m [90m[40m█[37m[40m [90m[40m▄▄▀▀[37m[40m   [m
[37m[40m       [90m[40m▀▀█▄[37m[40m [90m[40m▄█▀▀[37m[40m       [m
[37m[40m           [90m[40m▀[37m[40m           [m
`
const bb = `    ${chalk.bold(`THE VILLAGE`)}
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
let temp_event1 = new game_event({
	id: 1,
	body: {
		body: 'some words for an test event, plz work~~~~~~~~~~`we wq ew qkiuoh hj khgfdf gk hj gf dhjksgfd'.repeat(3),
		format: {
			writeMode: 'gradientScanlines',
			gradientFunction: gradient.retro.multiline,
			gradientArr: ['#3f51b1', '#5a55ae', '#7b5fac', '#8f6aae', '#a86aa4', '#cc6b8e', '#f18271', '#f3a469', '#f7c978'].reverse(),
			speed: 2,
		},
		TextFile: {
			exists: false,
			url: ''
		},
	},
	toScreen: {
		toScreen: mountain,
		AnsiFile: {
			exists: false,
			url: '',
		},
	},
	buttons: [
		[1, "goto 1(recur)", true],
		[2, "goto 2", true],
		//[3,"goto 3 lolololololololollolololololololol",true]
	]
})
let temp_event2 = new game_event({
	id: 2,
	body: {
		body: 'GAME EVENT 2, plz work~~~~~~~~~~`wewqewqkiuohhjkhgfdfgkhjgfdhjksgfd',
		format: {
			writeMode: 'gradientScanlines',
			gradientFunction: gradient.retro.multiline,
			gradientArr: ['#3f51b1', '#5a55ae', '#7b5fac', '#8f6aae', '#a86aa4', '#cc6b8e', '#f18271', '#f3a469', '#f7c978'],
		},
		TextFile: {
			exists: false,
			url: ''
		},
	},
	toScreen: {
		toScreen: bb,
		AnsiFile: {
			exists: false,
			url: '',
		},
	},
	buttons: [
		[1, "goto 1", true],
		//[2,"goto 2",true],
		//[3,"goto 3 lolololololololollolololololololol",true]
	]
})
let testEventArr = [temp_event1, temp_event2,]

//test content
let body = `[0m\r
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
let caleb = `[48;5;241m [38;5;241;48;5;241m▄[38;5;242;48;5;241m▄▄[38;5;242;48;5;242m▄[48;5;242m [38;5;241;48;5;241m▄[48;5;241m [38;5;241;48;5;241m▄▄[38;5;59;48;5;59m▄▄[38;5;241;48;5;59m▄[38;5;241;48;5;241m▄▄▄[38;5;241;48;5;59m▄[38;5;241;48;5;241m▄▄[38;5;59;48;5;59m▄[38;5;240;48;5;240m▄▄▄▄[48;5;240m [38;5;240;48;5;240m▄▄▄[48;5;240m [38;5;240;48;5;240m▄[38;5;240;48;5;239m▄▄▄[38;5;239;48;5;239m▄▄▄▄[48;5;239m   [38;5;239;48;5;239m▄▄▄▄▄[38;5;238;48;5;239m▄[38;5;238;48;5;238m▄▄▄[38;5;239;48;5;239m▄▄▄▄[48;5;239m [38;5;239;48;5;239m▄▄[m\r
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
let ch = `The Yuan Family.

“Father, today, Brother Huang will leave to join the army. I\’m going to go see him off,” said Yuan Luoyu respectfully. 

Yuan Wutong immediately made his decision. “Take some presents with you. 
Stop by the treasury and pick out something good. 
Our gift might be intended for Huang Qianjun, 
but what matters is that Master Su will see it; 
we absolutely cannot be half-hearted about this. 
Let’s take this chance to display our Yuan Family\’s sincerity.” 

“Alright!” Yuan Luoyu straightforwardly agreed. 

Yuan Wutong snorted coldly. “Last night, your expenditures at the Sand-Scouring Waves weren’t the least bit small. 
Out of respect for Master Su, 
I’ll let you off just this once, 
but you’d best hurry back to the Redscale Army, you brat!” `



//test button declarations
let button1 = blessedpkg.button({
	parent: buttonsContainer,
	mouse: true,
	keys: true,
	shrink: true,
	padding: {
		left: 1,
		right: 1
	},
	left: 1,
	top: 1,
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
let button2 = blessedpkg.button({
	parent: buttonsContainer,
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
let button3 = blessedpkg.button({
	parent: buttonsContainer,
	mouse: true,
	keys: true,
	shrink: true,
	padding: {
		left: 1,
		right: 1
	},
	left: 1,
	top: 7,
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
let button4 = blessedpkg.button({
	parent: buttonsContainer,
	mouse: true,
	keys: true,
	shrink: true,
	padding: {
		left: 1,
		right: 1
	},
	left: 1,
	top: 10,
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
//screen.render is essential for the correct screenlines amount to calculate inorder to resize buttons
function resizeButtons() {
	buttonsArray.forEach((element) => { element.width = buttonsContainer.width - 5 })
	screen.render()
	buttonsArray.forEach((element, index, array) => {
		if (!(index === 0)) {
			let previous = array[index - 1]
			element.top = previous.top + previous.getScreenLines().length
		} else {
			element.top = 1
		}
		screen.render()
	})
}
// handling creating of buttons from an event. writing body etc.
// event reader
// multiple functions, exuction may differ based on event type
// messy, remove redundant code in future
// the resize button cannot get a valid height and crashes on screen resize
// if I attempt to remove all mentions of buttonsArray
function clearButtons() {
	buttonsArray.forEach((element) => { buttonsContainer.remove(element); element.destroy() })
	buttonsArray = []
}
async function createButtons(gameEvent, storyObj = {}) {
	eventHandler(gameEvent)
	await waitForClear();
	if (death){
		await reset()
		return 0
	}
	gameEvent['buttons'].forEach(item => {
		let temp = new blessedpkg.button({
			parent: buttonsContainer,
			mouse: true,
			keys: true,
			shrink: true,
			padding: {
				left: 1,
				right: 1
			},
			left: 1,
			top: 1,
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
		buttonsArray.push(temp)
		temp.on('press', function () {
			clearButtons()
			buttonsContainer.setContent('')
			screen.render();
			createButtons(storyObj[item[0]], storyObj);
			resizeButtons();
			stats.focus();
			screen.render();

		})
	})
	resizeButtons()
}
// basically to map event to an object using the event id as a key,
// this is so that events can be looked up by button param then loaded
// idea is for events eventually to be read from a json file
function createEventsMap(eventsArrary = [], storyArr = {}) {
	eventsArrary.forEach((element) => {
		storyArr[element.id] = element
	})
}
//return maybe idek
// reads event package and sees which buttons to create only called after a combat

//sloppy but easy way to make it work
async function eventHandler(gameEvent = temp_event1,) {
	//
	// WRITE EVENT PACKAGE HANDLING CODE
	// probably easier to do recursively?
	//
	ImageScreenTerm.term.clear()
	ImageScreenTerm.term.reset()
	rollLog(logs)
	let gb = gameEvent.body
	let gbf = gb.format
	//make enum thing later
	//ImageScreenTerm.writeSync(gameEvent.toScreen.toScreen)
	if (gbf.writeMode === 'gradientScanlines') {
		await (gradient_scanlines(logs, gb.body, gbf.speed, gbf.gradientFunction, gbf.gradientArr))
	}
	buttonsContainer.setContent(` ${chalk.bold.yellow(gameEvent['buttons'].length.toString()) + " " + chalk.bold.greenBright("choices")}`)

	//change to for loop eventually
	if (gameEvent instanceof (game_event_enemy)) {
		combat(gameEvent)
		//await something
	} else if (gameEvent instanceof (game_event_gain_item)) {

	} else {
		// test code
		combat(gameEvent)
	}
	await (waitForCombat())
	//write event package content after event complete
	//rollLog(XTermTestv2)
	//XTermTestv2.writeSync("DEATH"+ death)
	// extend somehow to rest later
	if(death===false){
		let length ='╰╾────────────────────────────────────────────╼╯'.length
		let combatBanner=`\
╭${gradient.pastel('╾────────────────────────────────────────────╼')}╮ 
│   ${gradient.instagram(thePlayer.encDat.enmyName)} ${chalk.blue(`deafeated in`)} ${chalk.greenBright(`${thePlayer.encDat.turn} turns`)}
│   <${'-'.repeat(38)}>
│   XP earned:  ${chalk.greenBright(`545`)}
│
│   average hit rate: ${thePlayer.encDat.calculateHitMissAVG()*100} % hit chance
│   average damage dealt per turn: ${chalk.redBright(thePlayer.encDat.calculateTurnDmgAVG())} dmg
|
│   Total dmg dealt; ${chalk.redBright(`${thePlayer.encDat.returnDamageDealt()} dmg`)}
│   Total dmg taken: ${chalk.greenBright(`${thePlayer.encDat.returnDamageTaken()}`)} dmg
│
│   ${chalk.cyan('potions used')} ${chalk.green('   |')} ${thePlayer.encDat.pUse}
│   ${chalk.yellow('scrolls used')} ${chalk.green('   |')} ${thePlayer.encDat.sUse}
│   ${chalk.redBright('oil flasks used')} ${chalk.green('|')} ${thePlayer.encDat.fUse}
╰${gradient.pastel('╾────────────────────────────────────────────╼')}╯\
`
		//combatBanner=padString(combatBanner,ImageScreenTerm.term.cols-length)

		thePlayer.encDat=new combatMetrics()
		await new Promise(r => setTimeout(r, 500));
		//ImageScreenTerm.writeSync('\n'+testContent)
		ImageScreenTerm.writeSync('\n'+combatBanner)

		//ImageScreenTerm.writeSync(escLeftByNum(1))
		//ImageScreenTerm.writeSync("#")
		for(let i=0; i<=12; i++){
			ImageScreenTerm.writeSync(escUpByNum(1)+escLeftByNum(1)+'│')
		}
		//ImageScreenTerm.reset()
		//ImageScreenTerm.writeSync(gameEvent.toScreen.toScreen)
		await (gradient_scanlines(logs, gb.body, gbf.speed, gbf.gradientFunction, gbf.gradientArr))
		logs.writeSync(`${escLeftByNum(20)}${chalk.yellow(`-`.repeat(logs.term.cols - 1))}\n`);
	}
	resolver()
}


function kill(){
	clearButtons()
	death = true;
	encounterResolver()
}

// resume execution after combat 
// enounter clear promise/event package clear promise
let waitForClearResolve
function waitForClear() {return new Promise((resolve) => {waitForClearResolve = resolve})}
function resolver() {if (waitForClearResolve) {waitForClearResolve()}}
//combat promise
let waitForCombatResolve
function waitForCombat() {return new Promise((resolve) => {waitForCombatResolve = resolve});}
function encounterResolver() {if (waitForCombatResolve) waitForCombatResolve()}


async function combat(combatEvent) {
	buttonsContainer.setContent('')
	logs.writeSync(escUpByNum(1))
	logs.writeSync(`\n${chalk.bold.magenta(`#`.repeat(logs.term.cols - 1))}`);
	logs.writeSync(`\n${chalk.yellow(`Combat Start!`)}`);
	logs.writeSync(`\n${chalk.bold.magenta(`#`.repeat(logs.term.cols - 1))}\n`);
	let monster = copyMonster(tempMonster)
	thePlayer.encDat.enmyName=monster.name
	ImageScreenTerm.reset()
	ImageScreenTerm.writeSync(monster.art)
	combatLogic(monster,thePlayer,true)

}
// moster picker in random event later
async function enemyAtack(monster,player=thePlayer,first=false) {
	if(!first){
		logs.writeSync(`${chalk.bold.blue(`-`.repeat(logs.term.cols - 1))}\n`);
	}
	await new Promise(resolve => setTimeout(resolve, 300))
	logs.writeSync(chalk.red(`${monster.name} attacks you with ${monster.weapon}!\n`))
	if (monster.rollToHit() >= player.ac) {
		let monsterDamage = monster.rollDamage()
		
		player.encDat.AdmgTkn(monsterDamage)
		//await new Promise(resolve => setTimeout(resolve, 100))
		logs.writeSync(chalk.red(`${monster.name} hits you for ${monsterDamage} damage!\n`))
		player.hp -= monsterDamage
		refreshStats(player)
		if(player.hp<=0){
			logs.writeSync(chalk.red(`${escLeftByNum(3)}${monster.name} kills you!\n`))
			await new Promise(resolve => setTimeout(resolve, 2000))
			kill()
		}
		// add call to game over function
	} else {
		//await new Promise(resolve => setTimeout(resolve, 100))
		logs.writeSync(chalk.red(`${monster.name} misses you!\n`))
	}
	if(first){
		logs.writeSync(`${chalk.bold.blue(`-`.repeat(logs.term.cols - 1))}\n`);
	}
}

function clearCombat(logs){
	thePlayer.weaponCooldown=0
	clearButtons();
	encounterResolver()
	logs.writeSync(`${chalk.bold.magenta(`#`.repeat(logs.term.cols - 1))}\n`);
	logs.writeSync(`${chalk.yellow(`You defeated the enemy!`)}\n`);
	logs.writeSync(`${chalk.bold.magenta(`#`.repeat(logs.term.cols - 1))}\n`);
}



async function combatLogic(monsterCopy /*make into enemy*/, player = thePlayer, firstLoop=true, hostile=false, counter=1) {
	let monster = monsterCopy
	let playerWonInitiative = false
	let monsterHostile = hostile
	let turn = counter
	thePlayer.encDat.turn=turn
	logs.writeSync(`${chalk.bold.green(turn)}\n`);

	if(!firstLoop){
		if (/*room.forceHostile == -1 &&*/ monster.aggression < 12) {
			// friendly
		} else if (player.rollReaction <= monster.aggro || monster.aggro >= 12 /* || room.forceHostile == 1*/) {
			// hostile
			monsterHostile = true;
		} else {
			// neutral, which is functionally the same as friendly
		}
	}

	if (firstLoop&&monsterHostile){
		let player_initiative = player.rollInitiative()
		let monster_initiative = monster.rollInitiative()
		logs.writeSync(`Monster init${chalk.red(monster_initiative)} Player init${chalk.blue(player_initiative)}\n`)
		if (monster_initiative > player_initiative) {
			await enemyAtack(monster,player,true)
		}else{
			playerWonInitiative = true
		}
	}
	createCombatButtons(monsterHostile)
	combatButtonsMap['attack'].on('press', async () => {
		if((logs.term.rows-2)<=logs.term.buffer.active.cursorY){
			logs.writeSync(escUpByNum(1))
			rollLog(logs)
		}
		clearButtons();
		logs.writeSync(chalk.greenBright(`${escLeftByNum(2)}You attack the enemy with your ${player.weaponName.toLowerCase()}!\n`));
		let TOHIT = player.rollToHit()
		if (TOHIT[0] === 20) {
			logs.writeSync(dice+escUpByNum(3)+gradient.rainbow(`\nCrit!\n\n`))
			await new Promise(resolve => setTimeout(resolve, 1000))
		}

		if ((TOHIT[0]+TOHIT[1]) >= monster.ac) {
			player.encDat.AHM(true)

			let playerDamage = player.rollDamage()
			let crit = false
			player.encDat.ATdmg(playerDamage)
			if (TOHIT[0] === 20) {
				crit = true
				playerDamage+=player.rollDamage()
			}
			monster.hp -= playerDamage
			logs.writeSync(chalk.greenBright(`You hit for ${playerDamage} damage!     ___DEBUGenemyhp=${monster.hp}\n`));
			logs.writeSync(player.wBonus.applyEffectWF(monster, crit, player));
			
			logs.writeSync(chalk.greenBright(`___DEBUGenemyhp=${monster.hp}\n`));
		} else {
			player.encDat.AHM(false)

			logs.writeSync(chalk.greenBright(`You miss!    ____DEBUGenemyhp=${monster.hp}\n`));
		}
		if (monster.hp <= 0) {
			await new Promise(resolve => setTimeout(resolve, 100))
			clearCombat(logs)
		} else {
			await new Promise(resolve => setTimeout(resolve, 50))
			await enemyAtack(monster,player)
			logs.writeSync(`${chalk.bold.blue(`-`.repeat(logs.term.cols - 1))}\n`);
			combatLogic(monster, player, false, true, ++turn)
		}
	})
	combatButtonsMap['flee'].on('press', async () => {
		let dexSave=player.rollSkillCheck(player.dex)
		if((dexSave>=(10 + monster.hitDie))||!monsterHostile){
			logs.writeSync(`${!playerWonInitiative&&firstLoop?escUpByNum(1)+'\r':''}${chalk.bold.magenta(`#`.repeat(logs.term.cols - 1))}\n`);
			logs.writeSync(`${chalk.yellow(`You escaped through a random tunnel`)}\n`);
			logs.writeSync(`${chalk.bold.magenta(`#`.repeat(logs.term.cols - 1))}\n`);
			// random deeper or surface
			clearButtons();
			encounterResolver()
		}
		else{
			clearButtons();
			if(playerWonInitiative&&firstLoop){
				logs.writeSync(`${chalk.bold.blue(`-`.repeat(logs.term.cols - 1))}\n`)
			}else if(!firstLoop){
				logs.writeSync(`${chalk.bold.blue(`-`.repeat(logs.term.cols - 1))}\n`)
			}

			logs.writeSync(`${chalk.yellow(`${monster.name} prevented your escape!`)}\n`);
			await enemyAtack(monster,player)
			combatLogic(monster, player, false, monsterHostile, ++turn)
		}
	})
	// combatButtonsMap['chatUp'].on('press', async () => {
	// 	clearButtons();
	// 	if(playerWonInitiative&&firstLoop){
	// 		logs.writeSync(`${chalk.bold.blue(`-`.repeat(logs.term.cols - 1))}\n`)
	// 	}else if(!firstLoop){
	// 		logs.writeSync(`${chalk.bold.blue(`-`.repeat(logs.term.cols - 1))}\n`)
	// 	}
	// })

	if('potion' in combatButtonsMap){
		combatButtonsMap['potion'].on('press', async () => {
			let heal=chance2.rpg('2d4', {sum: true})+4
			clearButtons();
			if(playerWonInitiative&&firstLoop){
				logs.writeSync(`${chalk.bold.blue(`-`.repeat(logs.term.cols - 1))}\n`)
			}else if(!firstLoop){
				logs.writeSync(`${chalk.bold.blue(`-`.repeat(logs.term.cols - 1))}\n`)
			}
			logs.writeSync(thePlayer.hp+" "+thePlayer.hpMax)
			if((thePlayer.hp+heal)>thePlayer.hpMax){
				logs.writeSync(`${chalk.yellow(`AAAAAAA You drink a potion! you heal for ${thePlayer.hpMax-thePlayer.hp} hp!`)}\n`);
			}else{
				logs.writeSync(`${chalk.yellow(`BBBBBBB You drink a potion! you heal for ${heal} hp!`)}\n`);
			}
			thePlayer.increaseHP(heal)
			thePlayer.potions--
			thePlayer.encDat.APuse()
			refreshStats()
			refreshInventory()

			let testHostileDebug=monsterHostile
			if(monsterHostile){
				await enemyAtack(monster,player)
			}else{
				testHostileDebug=false
			}
			if(player.potions<1){combatButtonsMap['potion'].destroy()}
			screen.render()
			combatLogic(monster, player, false, testHostileDebug, ++turn)
		})
	}
	if('oil' in combatButtonsMap){
		combatButtonsMap['oil'].on('press', async () => {
			
			player.encDat.AHM(true)
			let damage = chance2.rpg('4d6', {sum: true})+4
			player.encDat.ATdmg(damage)
			clearButtons();
			if(playerWonInitiative&&firstLoop){
				logs.writeSync(`${chalk.bold.blue(`-`.repeat(logs.term.cols - 1))}\n`)
			}else if(!firstLoop){
				logs.writeSync(`${chalk.bold.blue(`-`.repeat(logs.term.cols - 1))}\n`)
			}
			logs.writeSync(`${chalk.yellow(`You throw oil on the enemy! dealing 4d6+4:${damage} fire damage!`)}`);
			monster.hp-=damage
			thePlayer.oil--
			thePlayer.encDat.AfUse()
			refreshInventory()
			await new Promise(resolve => setTimeout(resolve, 100))
			if (monster.hp <= 0) {
				await new Promise(resolve => setTimeout(resolve, 100))
				clearCombat(logs)
			} else {
				await enemyAtack(monster,player)
				await new Promise(resolve => setTimeout(resolve, 50))
				combatLogic(monster, player, false, monsterHostile, ++turn)
			}
		})
	}



	//generate listener for potion button if potions button exists
}


function createCombatButtons(hostile) {
	let monsterHostile=hostile
	clearButtons()
	combatButtonsMap = {}
	let attack = new blessedpkg.button({
		parent: buttonsContainer,
		mouse: true,
		keys: true,
		shrink: true,
		padding: {
			left: 1,
			right: 1
		},
		left: 1,
		top: 1,
		name: `attack`,
		content: `${chalk.bold.white('attack ')}${chalk.bold.green(thePlayer.weapon.dmgDie)}\
${thePlayer.basedamage<0?chalk.bold.white(' - '):chalk.bold.white(' + ')}\
${chalk.bold.white(Math.abs(thePlayer.basedamage))}\
${monsterHostile?'':gradient.retro.multiline('\nattacking this enemy\nwill make it hostile')}`, //maybe add damage die
		//shadow: true,
		style: {
			bg: '#5A5A5A',
			focus: {
				bg: '#880808',
			},
			hover: {
				bg: '#880808',
			},
		},
	})
	combatButtonsMap[attack.name] = attack
	let flee = new blessedpkg.button({
		parent: buttonsContainer,
		mouse: true,
		keys: true,
		shrink: true,
		padding: {
			left: 1,
			right: 1
		},
		left: 1,
		top: 1,
		name: 'flee',
		content: `flee ${thePlayer.dex > -1 ? chalk.bold.greenBright('dex check') : chalk.bold.redBright('dex check')}`,
		//shadow: true,
		style: {
			bg: '#5A5A5A',
			focus: {
				bg: '#880808',
			},
			hover: {
				bg: '#880808',
			},
		},
	})
	combatButtonsMap[flee.name] = flee
	let chatUp = new blessedpkg.button({
		parent: buttonsContainer,
		mouse: true,
		keys: true,
		shrink: true,
		padding: {
			left: 1,
			right: 1
		},
		left: 1,
		top: 1,
		name: 'chatUp',
		content: `chat up ${thePlayer.dex > -1 ? chalk.bold.greenBright('cha check') : chalk.bold.redBright('cha check')}`,
		//shadow: true,
		style: {
			bg: '#5A5A5A',
			focus: {
				bg: '#880808',
			},
			hover: {
				bg: '#880808',
			},
		},
	})
	combatButtonsMap[chatUp.name] = chatUp
	let potion
	if(thePlayer.potions>0){
		potion = new blessedpkg.button({
			parent: buttonsContainer,
			mouse: true,
			keys: true,
			shrink: true,
			padding: {
				left: 1,
				right: 1
			},
			left: 1,
			top: 1,
			name: 'potion',
			content: `use potion, ${thePlayer.potions} left`,
			//shadow: true,
			style: {
				bg: '#5A5A5A',
				focus: {
					bg: '#880808',
				},
				hover: {
					bg: '#880808',
				},
			},
		})
		combatButtonsMap[potion.name] = potion
	}
	let oil
	if(thePlayer.oil>0){
		oil = new blessedpkg.button({
			parent: buttonsContainer,
			mouse: true,
			keys: true,
			shrink: true,
			padding: {
				left: 1,
				right: 1
			},
			left: 1,
			top: 1,
			name: 'oil',
			content: `throw oil, ${thePlayer.oil} left`,
			//shadow: true,
			style: {
				bg: '#5A5A5A',
				focus: {
					bg: '#880808',
				},
				hover: {
					bg: '#880808',
				},
			},
		})
		combatButtonsMap[oil.name] = oil
	}
	let names=['attack','flee','chatUp','potion','oil']
	for (const name of names) {
		if (name in combatButtonsMap){
			buttonsArray.push(combatButtonsMap[name])
		}
	}
	screen.render()
	resizeButtons()
	stats.focus()
	screen.render()
}




//
//
// Treasure event
//
//
//
//













//ESC[?25l	make cursor invisible
//ESC[?25h	make cursor visible
//
//double check cursor is disabled on all subterminals and main one

function toggleUi() {
	buttonsContainer.toggle()
	ImageScreenTerm.toggle()
	logs.toggle()
	stats.toggle()
	InventoryBox.toggle()
}
// function toggleButtons() {
// 	buttonsContainer.toggle()
// }

async function fillStatsRollBox(speed = 2, player = thePlayer, startBox = box) {
	await new Promise(resolve => setTimeout(resolve, speed))
	startBox.pushLine(`${' '.repeat(Math.floor(startBox.width / 2) - ' HP: '.length - 2)} hp: ${player.hp}`)
	screen.render()
	await new Promise(resolve => setTimeout(resolve, speed))
	startBox.pushLine(`${' '.repeat(Math.floor(startBox.width / 2) - 'str: '.length - 2)}str: ${player.str}`)
	screen.render()
	await new Promise(resolve => setTimeout(resolve, speed))
	startBox.pushLine(`${' '.repeat(Math.floor(startBox.width / 2) - 'dex: '.length - 2)}dex: ${player.dex}`)
	screen.render()
	await new Promise(resolve => setTimeout(resolve, speed))
	startBox.pushLine(`${' '.repeat(Math.floor(startBox.width / 2) - 'int: '.length - 2)}int: ${player.int}`)
	screen.render()
	await new Promise(resolve => setTimeout(resolve, speed))
	startBox.pushLine(`${' '.repeat(Math.floor(startBox.width / 2) - 'cha: '.length - 2)}cha: ${player.cha}`)
	screen.render()
	await new Promise(resolve => setTimeout(resolve, speed))
	startBox.pushLine(`\n${' '.repeat(Math.floor(startBox.width / 2) - Math.floor('[ ENTER to continue ]'.length / 2) - 3)}[ ENTER to continue ]`)
	screen.render()
	startBox.focus()
}


function refreshStats(player = thePlayer) {
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
function refreshInventory(player = thePlayer) {
	InventoryBox.setContent(
`{bold}${chalk.red("Weapon ")}{/bold} = ${thePlayer.weaponName}
{bold}${chalk.red("Armour ")}{/bold} = ${thePlayer.armourName}
${chalk.red('oil')} = ${thePlayer.oil}
${chalk.red('potions')} = ${thePlayer.potions}
${chalk.red('scrolls')} = ${thePlayer.scrolls}
${chalk.red('gp')} = ${thePlayer.gold}`)
	screen.render()
}
function creatething(){
	box.key('enter', function () {
		toggleUi()
		box.hide()
		box.destroy()
		box=null
		screen.render()
		resolver()
	})
	box.on('click', function () {
		toggleUi()
		box.hide()
		box.destroy()
		box=null
		screen.render()
		resolver()
	})
}
async function reset(){
	resetRandoms()
	death = false
	thePlayer = thePlayer.rollNewPlayer()
	refreshStats(thePlayer)
	refreshInventory()
	clearButtons()
	logs.reset()
	ImageScreenTerm.reset()
	toggleUi()
	screen.render()
	box = createStatsBox()
	screen.append(box)
	screen.render()
	box.setContent('')
	await(fillStatsRollBox(40,thePlayer,box))
	creatething()
	await waitForClear();
	//sample start code
	// buttonsArray.forEach((button) => { form_thing.remove(button); button.destroy() })
	// buttonsArray = [];
	stats.focus();
	ImageScreenTerm.term.reset()
	await createButtons(temp_event1, story);
	//buttonsContainer.setContent(` ${chalk.bold.yellow(buttonsArray.length.toString()) + " " + chalk.bold.greenBright("choices")}`)
	//resizeButtons();
	//stats.focus();
}
//reminder how to convert ansi art to utf8
//run script on cmder to convert my ansi art to utf8
//ansiart2utf8 mountain.ans > sometext.txt
//XTermTestv2.write(mountain)
//Listeners for test buttons
button1.on('press', function () {
	buttonsContainer.setContent('Canceled.');
	ImageScreenTerm.term.clear();
	ImageScreenTerm.term.reset();
	ImageScreenTerm.writeSync(caleb);
	screen.render();
});
button2.on('press', function () {
	//logs.setContent(chalk.bgMagenta.blueBright("lolololololololollolololololololol"))
	ImageScreenTerm.term.clear()
	ImageScreenTerm.term.reset()
	ImageScreenTerm.writeSync(body)
	screen.render();
});

//Listeners
screen.on('resize', function () {
	ImageScreenTerm.height = screen.height;
	ImageScreenTerm.width = Math.floor(screen.width / 2);
	//logs.setContent("x:"+form_thing.width.toString()+", y:"+form_thing.height.toString()+", submit length:"+button1.width.toString());
	resizeButtons()
});
// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function () {
	return process.exit(0);
});
screen.key('e', function () {
	ImageScreenTerm.focus();
	screen.render();
});
screen.key('p', function () {
	screen.focusNext();
});
screen.key('r', function () {
	reset()
});
//test content key listener
screen.key('y', function () {
	buttonsContainer.resetScroll()
	buttonsArray.forEach((button) => { buttonsContainer.remove(button); button.destroy() })
	buttonsArray = [];
	stats.focus();
	refreshInventory()
	ImageScreenTerm.term.reset()
	createButtons(temp_event1, story);
	buttonsContainer.setContent(` ${chalk.bold.yellow(buttonsArray.length.toString()) + " " + chalk.bold.greenBright("choices")}`)
	resizeButtons();
	stats.focus();
});
screen.key('z', function () {
	logs.writeSync(escUpByNum(2))
	//logs.writeSync('a')
});

screen.key('n', async function () {
	clearButtons()
	death = true;
	encounterResolver()
})




program.cursorColor('000000')
screen.title = '~game~';
screen.program.hideCursor(true);
screen.append(ImageScreenTerm)
screen.append(logs)

createEventsMap(testEventArr, story)
buttonsArray = [button1, button2, button3, button4];
screen.render()
resizeButtons()
toggleUi()
screen.render()
stats.focus()
//check cursor hidden
console.log('[?25l')
ImageScreenTerm.writeSync('[?25l')
logs.writeSync('[?25l')

await (fillStatsRollBox(40, thePlayer, box))
refreshStats(thePlayer)
box.focus()
box.key('enter', function () {
	toggleUi()
	box.hide()
	box.destroy()
	box=null
	screen.render()
})
box.on('click', function () {
	toggleUi()
	box.hide()
	box.destroy()
	box=null
	screen.render()
})