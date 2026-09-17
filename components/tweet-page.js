import { useRouter } from 'next/router'
import Link from 'next/link'
import cn from 'clsx'
import anchorStyles from './landing/anchor.module.css'
import Node from './html/node'
import components from './twitter-layout/components'
import TweetSkeleton from './twitter-layout/tweet-skeleton'
import TweetMeta from './tweet-meta'
import styles from './tweet-page.module.css'

export default function TweetPage({ ast, className }) {
  const { isFallback } = useRouter()

  return (
    <div className={cn(styles.page, className)}>
      <TweetMeta />

      <main className={styles.main}>
        {isFallback ? (
          <TweetSkeleton />
        ) : (
          <Node components={components} node={ast[0]} />
        )}
      </main>

      <footer className={styles.footer}>
        <p>
          🤯 This tweet was statically generated.{' '}
          <Link href="/" className={anchorStyles.anchor}>
            See how
          </Link>
        </p>
      </footer>
    </div>
  )
}
