import React from 'react'
import { render } from '@testing-library/react'
import I18n from './i18n'
import useTranslate from './useTranslate'

const Child = () => {
  const t = useTranslate()

  return <div>{t('test')}</div>
}

describe('I18n Provider', () => {
  it('should update context consumers', () => {
    const { container, rerender } = render(
      <I18n locale="en" phrases={{ test: 'test en' }}>
        <Child />
      </I18n>
    )

    expect(container.textContent).toBe('test en')

    rerender(
      <I18n locale="jp" phrases={{ test: 'test jp' }}>
        <Child />
      </I18n>
    )

    expect(container.textContent).toBe('test jp')
  })
})
