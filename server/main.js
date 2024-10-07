import { Meteor } from 'meteor/meteor';

import { ContactsCollection } from '../imports/api/ContactsCollection';
import '../imports/api/ContactsMethods'
import { WalletsCollection } from '../imports/api/WalletsCollection';
import '../imports/api/WalletsMethods'

Meteor.startup(async () => {

  Meteor.publish('contacts', function () {
    return ContactsCollection.find();
  });

  Meteor.publish('wallets', function () {
    return WalletsCollection.find()
  })

  const walletMain = await WalletsCollection.find({name: 'Main Wallet'}).countAsync()

  if (!walletMain) {

    const wallet = { 
        name: 'Main Wallet',
        balance: 0,
        currency: 'COP',
        createdAt: new Date()
      }

    WalletsCollection.insertAsync(wallet);
  }
});