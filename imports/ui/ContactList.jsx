import React, { useState } from 'react';
import { ErrorAlert, SuccessAlert } from './components/Alerts';
import { ContactsCollection } from '../api/ContactsCollection';
import { useFind, useSubscribe } from 'meteor/react-meteor-data'
import { ContactCard } from './ContactCard'

export const ContactList = () => {

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const isLoading = useSubscribe('contacts');
    const contacts = useFind(() => {

        return ContactsCollection.find({}, {sort: {name: 1}});
    });

    if (isLoading()) {

      return (
        <p className="fixed text-2xl left-20">Loading...</p>
      )
    }

    const showError = ({message}) => {

        setSuccess("")
        setError("")
        setError(message)

        setTimeout(() => {
            setError("");
        }, 2500);
    }

    const showSuccess = () => {

        setError("")
        setSuccess("")
        setSuccess("Contact Deleted Successfully!")

        setTimeout(() => {
            setSuccess("");
        }, 2500);
    }

    return (
        <div>
          {
              error && <ErrorAlert message={error}/>
          }
          {
              success && <SuccessAlert message={success}/>
          }
          <div className="mt-10 px-20">
            <h3 className="text-lg font-semibold text-gray-500 uppercase tracking-wide">
              Contact List
            </h3>
            <ul role="list" className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
              {
                contacts.map(contact => (
                  <ContactCard key={contact._id} contact={contact} showError={showError} showSuccess={showSuccess}/>
                ))
              }
            </ul>
          </div>
        </div>
      )
}