import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const source = await readFile(new URL('../components/landing/random-tweet.js', import.meta.url), 'utf8')

test('random tweet link uses one anchor instead of Link wrapping custom anchor', () => {
  assert.doesNotMatch(source, /<Link[\s\S]*?<A\b/)
  assert.doesNotMatch(source, /passHref/)
})
