import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const apiSource = await readFile(new URL('../lib/twitter/api.js', import.meta.url), 'utf8')
const indexSource = await readFile(new URL('../pages/index.js', import.meta.url), 'utf8')

test('syndication JSON parsing fails soft when Twitter returns an empty or malformed success body', () => {
  assert.match(apiSource, /await res\.text\(\)/)
  assert.match(apiSource, /JSON\.parse\(/)
  assert.match(apiSource, /catch\s*\([^)]*\)\s*\{[\s\S]*return \{\}/)
})

test('homepage serializes a missing tweet and renders a recoverable skeleton instead of crashing', () => {
  assert.match(indexSource, /tweet:\s*tweet\s*\|\|\s*null/)
  assert.match(indexSource, /<Tweet\s+ast=\{tweet\}\s+skeleton=\{!tweet\}\s*\/>/)
})
