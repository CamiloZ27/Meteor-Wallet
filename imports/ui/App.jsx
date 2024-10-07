import React from 'react';
import { Header } from './Header'
import { Wallet } from './Wallet'
import { ContactForm } from './ContactForm'
import { ContactList } from './ContactList'

export const App = () => (
  <div>
    <Header />
    <div>
      <Wallet /> 
      <ContactForm />
      <ContactList />
    </div>   
  </div>
);
