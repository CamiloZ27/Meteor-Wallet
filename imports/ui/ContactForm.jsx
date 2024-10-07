import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'
import { ErrorAlert, SuccessAlert} from './components/Alerts'

export const ContactForm = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const [walletId, setWalletId] = useState("")

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const showError = ({message}) => {

        setSuccess("")
        setError("")
        setError(message)

        setTimeout(() => {
            setError("");
        }, 2500);
    }

    const showSuccess = ({message}) => {

        setError("")
        setSuccess("")
        setSuccess(message)

        setTimeout(() => {
            setSuccess("");
        }, 2500);
    }

    const handleSaveContact = () => {

        const contact = {
            name,
            email,
            image,
            walletId,
            createdAt: new Date()
        }

        Meteor.call('insertContact', contact, (errorResponse) => {

            if (errorResponse) {

                console.log(errorResponse)
                showError({message: errorResponse.error})
            } else {
                
                setName("")
                setEmail("")
                setImage("")
                setWalletId("")

                showSuccess({message: 'Contact Created Successfully!'})
            }
        })
    }

    return (
        <form className="mt-6 px-20">
            {
                error && <ErrorAlert message={error}/>
            }
            {
                success && <SuccessAlert message={success}/>
            }
            <div className="grid grid-cols-6 gap-6">

                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label className="block text-lg font-medium text-gray-700">
                     Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                    />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label className="block text-lg font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                    />
                </div>
    
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label className="block text-lg font-medium text-gray-700">
                        Image
                    </label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                    />
                </div>

                <div className="col-span-6">
                    <label className="block text-lg font-medium text-gray-700">
                        Wallet ID
                    </label>
                    <input
                        type="text"
                        value={walletId}
                        onChange={(e) => setWalletId(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                    />
                </div>
            </div>
            <div className="px-1 py-3 text-right">
                <button
                type="button"
                onClick={handleSaveContact}
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-xl font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                Save Contact
                </button>
            </div>
        </form>
    )
}