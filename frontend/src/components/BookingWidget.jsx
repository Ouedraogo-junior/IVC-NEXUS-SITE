import { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { CAL_LINK } from '../config/booking'

export default function BookingWidget() {
  useEffect(() => {
    ;(async function run() {
      const cal = await getCalApi()
      cal('ui', {
        theme: 'light',
        styles: { branding: { brandColor: '#1D3557' } },
        hideEventTypeDetails: false,
        layout: 'column_view',
      })
    })()
  }, [])

  return (
    <Cal
      calLink={CAL_LINK}
      style={{ width: '100%', height: '100%', minHeight: '600px', overflow: 'hidden' }}
      config={{ layout: 'column_view' }}
    />
  )
}