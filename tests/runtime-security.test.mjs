import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))
const gitignore = await readFile(new URL('../.gitignore', import.meta.url), 'utf8')
const nextConfig = await readFile(new URL('../next.config.js', import.meta.url), 'utf8')

test('tweet renderer uses patched runtime and markdown boundaries', () => {
  assert.equal(pkg.dependencies?.next, '16.3.5')
  assert.equal(pkg.dependencies?.react, '19.3.0')
  assert.equal(pkg.dependencies?.['react-dom'], '19.3.0')
  assert.equal(pkg.dependencies?.['@mapbox/rehype-prism'], '0.9.0')
  assert.equal(pkg.dependencies?.['remark-parse'], '9.0.0')
  assert.match(pkg.engines?.node || '', /^22\./)
})

test('repository never ships a tracked root .env file', () => {
  assert.equal(existsSync(new URL('../.env', import.meta.url)), false)
  assert.match(gitignore, /^\.env$/m)
  assert.match(gitignore, /^\.env\.\*$/m)
  assert.match(gitignore, /^!\.env\.local\.example$/m)
})

test('remote tweet images use explicit HTTPS remotePatterns instead of deprecated domains', () => {
  assert.doesNotMatch(nextConfig, /\bdomains\s*:/)
  assert.match(nextConfig, /remotePatterns\s*:/)
  assert.match(nextConfig, /protocol:\s*['"]https['"]/)
  assert.match(nextConfig, /hostname:\s*['"]pbs\.twimg\.com['"]/)
  assert.match(nextConfig, /hostname:\s*['"]abs\.twimg\.com['"]/)
})
