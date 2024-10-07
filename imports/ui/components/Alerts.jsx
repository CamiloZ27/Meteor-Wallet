import React, { useState } from "react";
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/solid'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { SelectDestination } from "./SelectDestination";
import { useFind, useSubscribe } from 'meteor/react-meteor-data'
import { ContactsCollection } from '../../api/ContactsCollection';

export const ErrorAlert = ({ message }) => {
  return (
    <div className="fixed top-3 right-2 rounded-md bg-red-50 p-4 z-50 shadow-md">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-8 w-8 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-xl font-medium text-red-800">{message}</h3>
        </div>
      </div>
    </div>
  )
}

export const SuccessAlert = ({ message }) => {
  return (
    <div className="fixed top-3 right-2 rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon className="h-8 w-8 text-green-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-xl font-medium text-green-800">{message}</p>
        </div>
      </div>
    </div>
  )
}

export const Modal = ({handleCancel, title, body, errorMessage, footer}) => {

  return (
      <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

          <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div class="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                      <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">{title}</h3>
                      <div class="mt-2">
                          <p class="text-sm text-gray-500">
                              {errorMessage && (
                                  <h3 className="text-xl font-medium text-red-800">{errorMessage}</h3>
                              )}
                              {body}
                          </p>
                      </div>
                      </div>
                  </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <div>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="mr-5 bg-gray-500 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-xl font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                      Cancel
                    </button>
                    {footer}
                  </div>
              </div>
              </div>
              </div>
          </div>
          </div>
  )
}


export const MoneyModal = ({handleCancel, handleSubmitModal, open, setOpen, modal, errorMessage}) => {

  useSubscribe('contacts');
    const contacts = useFind(() => {

        return ContactsCollection.find({}, {sort: {name: 1}});
    });

  const [amount, setAmount] = useState("")
  const [destination, setDestination] = useState({})

  const handleBlankFields = () => {
    
    handleCancel()
    setTimeout(() => {

      setAmount("")
      setDestination({})
    }, 200)
  }

  const handleSubmit = async () => {

    const status = await handleSubmitModal(amount, destination)
    console.log(status)
    if (status === true) {

      setTimeout(() => {

        setAmount("")
        setDestination({})
      }, 300)
    }
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div>
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900 text-xl">
                    {modal === 'add'? 'Add Money To Your Wallet' : 'Transfer Money To Other Wallet'}
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {errorMessage && (
                          <h3 className="text-xl font-medium text-red-800">{errorMessage}</h3>
                      )}
                      <div className="mt-2">
                                <label className="block text-xl font-medium text-gray-950 mt-7">
                                Amount
                                </label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="mt-1 block w-full border text-gray-950 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                                    placeholder="0.00"
                                />
                            </div>

                            {
                                modal === 'transfer' && (
                                <div className="mt-7">
                                    <SelectDestination
                                    contact={destination}
                                    setContact={setDestination}
                                    contacts={contacts}/>
                                </div>
                                )
                            }
                    </p>
                  </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-xl font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                        >
                        {modal === "add" ? 'Add' : 'Transfer'}
                        </button>
                <button
                    type="button"
                    onClick={handleBlankFields}
                    className="mr-5 bg-gray-500 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-xl font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                    Cancel
                </button>
            </div>
          </DialogPanel> 
        </div>
      </div>
    </Dialog>
  )
}