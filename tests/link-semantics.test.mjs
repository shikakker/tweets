import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const randomTweet = await readFile(new URL('../components/landing/random-tweet.js', import.meta.url), 'utf8')
const tweetPage = await readFile(new URL('../components/tweet-page.js', import.meta.url), 'utf8')

test('random tweet link uses one anchor instead of Link wrapping custom anchor', () => {
  assert.doesNotMatch(randomTweet, /<Link[\s\S]*?<A\b/)
  assert.doesNotMatch(randomTweet, /passHref/)
})

test('dynamic tweet footer uses one anchor instead of Link wrapping custom anchor', () => {
  assert.doesNotMatch(tweetPage, /<Link[\s\S]*?<A\b/)
  assert.doesNotMatch(tweetPage, /passHref/)
})
