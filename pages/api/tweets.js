const QUERY = 'javascript'
const LANG = 'en'
const PROVIDER_TIMEOUT_MS = 8000

function sendError(res, status, error, message) {
  res.setHeader('Cache-Control', 'private, no-store')
  return res.status(status).json({
    error,
    errors: [{ message }],
  })
}

export default async function getTweets(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).end()
  }

  const token = process.env.TWITTER_API_TOKEN?.trim()
  if (!token) {
    return sendError(
      res,
      503,
      'PROVIDER_NOT_CONFIGURED',
      'Random tweet provider is not configured'
    )
  }

  let response
  try {
    response = await fetch(
      `https://api.twitter.com/1.1/search/tweets.json?q=${QUERY}&lang=${LANG}&count=50`,
      {
        headers: { authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS),
      }
    )
  } catch {
    return sendError(
      res,
      502,
      'PROVIDER_REQUEST_FAILED',
      'Random tweet provider is temporarily unavailable'
    )
  }

  if (!response.ok) {
    return sendError(
      res,
      502,
      'PROVIDER_REQUEST_FAILED',
      'Random tweet provider is temporarily unavailable'
    )
  }

  let payload
  try {
    payload = await response.json()
  } catch {
    return sendError(
      res,
      502,
      'PROVIDER_REQUEST_FAILED',
      'Random tweet provider returned an invalid response'
    )
  }

  const statuses = Array.isArray(payload?.statuses) ? payload.statuses : null
  const tweets = statuses
    ?.map((tweet) => (typeof tweet?.id_str === 'string' ? tweet.id_str : ''))
    .filter(Boolean)

  if (!tweets) {
    return sendError(
      res,
      502,
      'PROVIDER_REQUEST_FAILED',
      'Random tweet provider returned an invalid response'
    )
  }

  res.setHeader('Cache-Control', 's-maxage=3, stale-while-revalidate')
  return res.status(200).json({ tweets })
}
