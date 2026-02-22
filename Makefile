install:
	npm install

test:
	npm test

lint:
	npm run lint

lint-fix:
	npm run lint:fix

test-watch:
	npm run test-watch

test-coverage:
	npm run test-coverage
	
gendiff:
	node src/gendiff.js

.PHONY: install test lint lint-fix test-watch test-coverage