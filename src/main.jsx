import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './modules/app/index.js'
import { IntlProvider } from 'react-intl'
import { initReactIntl } from './i18n/index.js'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { STRIPE_PUBLIC_KEY } from './backend/config'

import './main.css'

/* Configure i18n. */
const { locale, messages } = initReactIntl()

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={messages}>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
        <Toaster />
      </BrowserRouter>
    </IntlProvider>
  </React.StrictMode>
)
