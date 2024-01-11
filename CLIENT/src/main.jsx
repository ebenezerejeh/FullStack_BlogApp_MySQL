import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './Context/Auth_Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

    <AuthContextProvider>
    <App />
    </AuthContextProvider>

)
