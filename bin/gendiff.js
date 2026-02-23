#!/usr/bin/env node

import { program } from 'commander'

import { createRequire } from 'module'

import genDiff from '../src/index.js'

import path from 'path'

import fs from 'fs'

const require = createRequire(import.meta.url)
const pkg = require('../package.json')

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version(pkg.version)
  .argument('<filepath1>', 'Path to the first file')
  .argument('<filepath2>', 'Path to the second file')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const absPath1 = path.resolve(filepath1)
    const absPath2 = path.resolve(filepath2)

    if (!fs.existsSync(absPath1)) {
      console.error(`Error: File not found: ${absPath1}`)
      process.exit(1)
    }
    if (!fs.existsSync(absPath2)) {
      console.error(`Error: File not found: ${absPath2}`)
      process.exit(1)
    }

    try {
      const result = genDiff(absPath1, absPath2, options.format)
      console.log(result)
    } catch (error) {
      console.error(`Error: ${error.message}`)
      process.exit(1)
    }
  })

program.parse()
