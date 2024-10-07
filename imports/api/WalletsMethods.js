import { Meteor } from 'meteor/meteor'
import { ContactsCollection } from "./ContactsCollection";
import { check } from 'meteor/check'
import { WalletsCollection } from './WalletsCollection';

const addMoney = async (amount) => {

    try{

        if (!amount) {

            throw new Meteor.Error("Amount is required")
        }
        else {

            try {

                check(amount, Number);

                try {

                    const actualBalance = await WalletsCollection.findOneAsync(
                        { name: 'Main Wallet' },
                        { fields: { balance: 1 } } 
                    )

                    const newBalance = actualBalance.balance + amount
                    console.log(newBalance)

                    return await WalletsCollection.updateAsync({name: 'Main Wallet'}, {$set: {balance: newBalance}})
                } catch (errorDatabase) {
    
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

const transferMoney = async (amount, sourceWalletId, destinationWalletId) => {

    try{

        if (!amount || !destinationWalletId || !sourceWalletId) {

            throw new Meteor.Error("All fields are required")
        }
        else {

            try {

                check(amount, Number);
                check(sourceWalletId, String);
                check(destinationWalletId, String);

                try {

                    const actualBalanceSource = await WalletsCollection.findOneAsync(
                        { _id: sourceWalletId },
                        { fields: { balance: 1 } } 
                    )

                    if (actualBalanceSource.balance < amount) {

                        throw new Meteor.Error('Insufficient funds')
                    } else {
                        
                        const actualBalanceDestination = await WalletsCollection.findOneAsync(
                            { _id: destinationWalletId },
                            { fields: { balance: 1 } } 
                        )

                        const newBalanceDestination = actualBalanceDestination.balance + amount
                        const newBalanceSource = actualBalanceSource.balance - amount

                        await WalletsCollection.updateAsync({_id: sourceWalletId}, {$set: { balance: newBalanceSource}})

                        return await WalletsCollection.updateAsync({_id: destinationWalletId}, {$set: {balance: newBalanceDestination}})
                    }
                } catch (errorDatabase) {
    
                    throw new Meteor.Error(errorDatabase.error || 'Database Error')
                }
            } catch (errorCheck) {

                throw new Meteor.Error(errorCheck.error || 'Data Validation Error')
            }
        }
    } catch (errorThrow) {

        throw new Meteor.Error(errorThrow.error || 'Internal Server Error')
    }
}

Meteor.methods({

    addMoney,
    transferMoney
})