import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))

test('tweet renderer uses patched runtime and markdown boundaries', () => {
  assert.equal(pkg.dependencies?.next, '16.3.5')
  assert.equal(pkg.dependencies?.react, '19.3.0')
  assert.equal(pkg.dependencies?.['react-dom'], '19.3.0')
  assert.equal(pkg.dependencies?.['@mapbox/rehype-prism'], '0.9.0')
  assert.equal(pkg.dependencies?.['remark-parse'], '9.0.0')
  assert.match(pkg.engines?.node || '', /^22\./)
})
