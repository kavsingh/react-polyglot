import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Polyglot from 'node-polyglot'
import I18nContext from './i18n-context'

// Provider root component
export default function I18n({
  locale,
  phrases,
  allowMissing,
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

I18n.propTypes = {
  locale: PropTypes.string.isRequired,
  phrases: PropTypes.object.isRequired,

  allowMissing: PropTypes.bool,
  onMissingKey: PropTypes.func,
  interpolation: PropTypes.shape({
    suffix: PropTypes.string,
    prefix: PropTypes.string,
  }),
  pluralRules: PropTypes.shape({
    pluralTypes: PropTypes.object,
    pluralTypeToLanguages: PropTypes.object,
  }),

  children: PropTypes.element.isRequired,
}

I18n.defaultProps = {
  allowMissing: false,
  onMissingKey: undefined,
  interpolation: undefined,
  pluralRules: undefined,
}
