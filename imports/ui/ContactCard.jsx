import React, {memo} from 'react';
import { WalletsCollection } from '../api/WalletsCollection';
import { useSubscribe, useFind } from 'meteor/react-meteor-data'

export const ContactCard = memo(({contact, showError, showSuccess}) => {

    useSubscribe('wallets')
    const [contactWallet] = useFind(() => {

        return WalletsCollection.find({_id: contact.walletId})
    })

    const handleRemoveContact = (e) => {

        e.preventDefault()
        Meteor.call('removeContact', contact._id, (errorResponse) => {

            if (errorResponse) {
    
                showError({message: errorResponse.error})
            } else {
    
                showSuccess({message: 'Contact Created Successfully!'})
            }
        })
    }

    return (
        <li className="py-4 flex items-center justify-between space-x-3">
            <div className="min-w-0 flex-1 flex items-center space-x-3">
                <div className="flex-shrink-0">
                    <img className="h-20 w-20 rounded-full" src={contact.image} alt="" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-xl font-medium text-gray-900 truncate">{contact.name}</p>
                    <div className="flex row">
                        <p className="text-xl font-medium text-gray-500 truncate">{contact.email}</p>
                        <p className="ml-5 text-xl font-medium text-gray-500 truncate"> Wallet: {contact.walletId} / Balance: {contactWallet.balance}</p>
                    </div>
                </div>
                <div>
                    <a href="#"
                    onClick={(e) => handleRemoveContact(e)}
                    className="text-white text-xl inline-flex items-center shadow-sm px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-indigo-600 hover:bg-indigo-700">
                        Remove
                    </a>
                </div>
            </div>
        </li>
    )
});