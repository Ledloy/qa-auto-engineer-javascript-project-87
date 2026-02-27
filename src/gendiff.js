#!/usr/bin/env node

import { program } from 'commander'

import path from 'path'

import { createRequire } from 'module'

import genDiff from './index.js'

const require = createRequire(import.meta.url)
const pkg = require('../package.json')

program
  .name('gendiff')
  .description('"Вычислитель отличий – программа, определяющая разницу между двумя структурами данных"')
  .version(pkg.version)
  .argument('<filepath1>', 'Path to the first file')
  .argument('<filepath2>', 'Path to the second file')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const absPath1 = path.resolve(filepath1)
    const absPath2 = path.resolve(filepath2)

    try {
      const result = genDiff(absPath1, absPath2, options.format)
      console.log(result)
    } catch (error) {
      console.error(`Error: ${error.message}`)
      process.exit(1)
    }
  })

program.parse()
