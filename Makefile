install:
	npm install

test:
	npm test

lint:
	npm run lint

lint-fix:
	npx eslint --config eslint.config.js --fix .

fix: lint-fix


test-watch:
	npm run test-watch

test-coverage:
	npm run test-coverage

gendiff:
	node src/gendiff.js

.PHONY: install test lint lint-fix fix test-watch test-coverage gendiff