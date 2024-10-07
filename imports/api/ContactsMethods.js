import { Meteor } from 'meteor/meteor'
import { ContactsCollection } from "./ContactsCollection";
import { WalletsCollection } from './WalletsCollection';
import { check } from 'meteor/check'

const insertContact = async (contact) => {

    try{

        if (contact.name === "" || contact.email === "" || contact.image === "" || contact.walletId === "") {

            throw new Meteor.Error("All fields are required")
        }
        else {

            try {

                check(contact, {
                    name: String,
                    email: String,
                    image: String,
                    walletId: String,
                    createdAt: Date
                });

                try {

                    await WalletsCollection.insertAsync({_id: contact.walletId, balance: 0, name:contact.name, currency: 'COP', createdAt: new Date()})
                    return await ContactsCollection.insertAsync(contact)
                } catch (errorDatabase) {
    
                    console.log(errorDatabase)
    
                    throw new Meteor.Error('Database Error')
                }
            } catch (errorCheck) {

                throw new Meteor.Error(errorCheck.error || 'Data Validation Error')
            }
        }
    } catch (errorThrow) {

        throw new Meteor.Error(errorThrow.error || 'Internal Server Error')
    }
}

const removeContact = async (contactId) => {

    check(contactId, String)

    try {

        try {

            check(contactId, String)

            try {

                const contact = await ContactsCollection.findOneAsync(contactId)

                await ContactsCollection.removeAsync(contactId)
                return await WalletsCollection.removeAsync(contact.walletId)
            } catch (errorDatabase) {
    
                throw new Meteor.Error('Database Error')
            }
        } catch (errorCheck) {

            throw new Meteor.Error(errorCheck.error || 'Data Validation Error')
        }
    } catch (errorThrow) {

        throw new Meteor.Error(errorThrow.error || 'Internal Server Error')
    }
}

Meteor.methods({

    insertContact,
    removeContact
})