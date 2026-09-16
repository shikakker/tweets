import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const index = await readFile(new URL('../pages/index.js', import.meta.url), 'utf8')

test('homepage static generation fails closed when the upstream tweet cannot be fetched', () => {
  assert.match(index, /export async function getStaticProps\(\)/)
  assert.match(index, /try\s*{/)
  assert.match(index, /catch\s*\(/)
  assert.match(index, /tweet:\s*null/)
})

test('homepage renders an explicit unavailable state instead of passing null into Tweet', () => {
  assert.match(index, /tweet\s*\?\s*<Tweet[\s\S]*:\s*</)
  assert.match(index, /temporarily unavailable|unavailable/i)
})
