import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))

test('tweet renderer uses a patched Next runtime and drops unused vulnerable markdown packages', () => {
  assert.equal(pkg.dependencies?.next, '15.5.24')
  assert.equal(pkg.dependencies?.['@mapbox/rehype-prism'], undefined)
  assert.equal(pkg.dependencies?.['remark-parse'], undefined)
  assert.match(pkg.engines?.node || '', /^22\./)
})
