import React, { useMemo } from 'react'
import Polyglot from 'node-polyglot'
import I18nContext from './i18n-context'

// Provider root component
export default function I18n({
  locale,
  phrases,
  allowMissing = false,
  onMissingKey,
  interpolation,
  pluralRules,
  children,
}) {
  const tFunction = useMemo(() => {
    const polyglotInstance = new Polyglot({
      locale,
      phrases,
      allowMissing,
      onMissingKey,
      interpolation,
      pluralRules,
    })

    return polyglotInstance.t.bind(polyglotInstance)
  }, [locale, phrases, allowMissing, onMissingKey, interpolation, pluralRules])

  return (
    <I18nContext.Provider value={tFunction}>
      {React.Children.only(children)}
    </I18nContext.Provider>
  )
}
