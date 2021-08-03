#!/usr/bin/env node

const process = require('process');
const { program } = require('commander');
const spath = require('../lib/tool/spath.js');

require('dotenv').config({ path: spath.resolve(__dirname,'../.env') });

require('../lib/commander_config/custom_option.js');
require('../lib/commander_config/custom_command.js');

program.parse(process.argv);