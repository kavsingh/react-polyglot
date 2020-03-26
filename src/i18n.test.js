import React from 'react'
import { render } from '@testing-library/react'
import I18n from './i18n'
import translate from './translate'
import useTranslate from './useTranslate'

const Hoc = translate()(({ t }) => <div data-testid="hoc">{t('test')}</div>)
const Hook = () => {
  const t = useTranslate()
  return <div data-testid="hook">{t('test')}</div>
}

describe('I18n Provider', () => {
  it('should update context consumers', () => {
    const { getByTestId, rerender } = render(
      <I18n locale="en" phrases={{ test: 'test en' }}>
        <div>
          <Hoc />
          <Hook />
        </div>
      </I18n>
    )

    expect(getByTestId('hoc').textContent).toBe('test en')
    expect(getByTestId('hook').textContent).toBe('test en')

    rerender(
      <I18n locale="jp" phrases={{ test: 'test jp' }}>
        <div>
          <Hoc />
          <Hook />
        </div>
      </I18n>
    )

    expect(getByTestId('hoc').textContent).toBe('test jp')
    expect(getByTestId('hook').textContent).toBe('test jp')
  })
})
