import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// @ts-ignore
import "@fontsource/inter";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { rehydrateFromStorage } from "./features/auth/authSlice";
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from "@apollo/client/react";
import client from "./lib/apollo-client";

// Rehydrate auth state from localStorage on app startup
store.dispatch(rehydrateFromStorage());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
