import React, { useState } from 'react';
import { MoneyModal, ErrorAlert, SuccessAlert } from './components/Alerts'
import { useFind, useSubscribe } from 'meteor/react-meteor-data'
import { WalletsCollection } from '../api/WalletsCollection';

export const Wallet = () => {

    const [modal, setModal] = useState("")
    const [open, setOpen] = useState(false)

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const isLoading = useSubscribe('wallets');
    const [wallet] = useFind(() => {

        return WalletsCollection.find({name: 'Main Wallet'})
    })

    if (isLoading()) {

      return (
        <p className="ml-20 my-10 text-2xl left-20">Loading...</p>
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

    const showSuccess = ({message}) => {

        setError("")
        setSuccess("")
        setSuccess(message)

        setTimeout(() => {
            setSuccess("");
        }, 2500);
    }

    const handleCancel = () => {

        setOpen(false)
        setTimeout(() => {
            setModal("")
        }, 300)
    }

    const handleAddMoney = () => {

        setModal("add")
        setOpen(true)
    }

    const handleTransferMoney = () => {

        setModal("transfer")
        setOpen(true)
    }

    const handleSubmit = async (amount, destination) => {
        let response = false;
    
        if (modal === 'add') {
            response = await new Promise((resolve, reject) => {
                Meteor.call('addMoney', Number(amount), (errorResponse) => {
                    if (errorResponse) {
                        console.log(errorResponse);
                        showError({ message: errorResponse.error });
                        resolve(false)
                    } else {
                        showSuccess({ message: 'Money Add Successfully!' });
                        handleCancel();
                        resolve(true);
                    }
                });
            });
        } else {
            response = await new Promise((resolve, reject) => {
                Meteor.call('transferMoney', Number(amount), wallet._id, destination.walletId, (errorResponse) => {
                    if (errorResponse) {
                        console.log(errorResponse);
                        showError({ message: errorResponse.error });
                        resolve(false);
                    } else {
                        showSuccess({ message: 'Money Transfer Successfully!' });
                        handleCancel();
                        resolve(true);
                    }
                });
            });
        }
    
        return response;
    };

    return (
        <div className="px-20 my-20">
            {
                error && <ErrorAlert message={error}/>
            }
            {
                success && <SuccessAlert message={success}/>
            }
            {
                <MoneyModal
                    open={open}
                    setOpen={setOpen}
                    modal={modal}
                    handleCancel={handleCancel}
                    handleSubmitModal={handleSubmit}
                />
            }
            <div class="flex font-sans mt-6  mx-10 shadow-md">
                <form class="flex-auto p-6">
                    <div class="flex flex-wrap">
                        <div class="w-full flex-none text-sm font-medium text-gray-500">
                            {wallet.name}
                        </div>
                        <div class="w-full flex-none text-sm font-medium text-gray-700 mt-2">
                            Wallet ID:
                        </div>
                        <h1 class="flex-auto text-lg font-semibold text-slate-900">
                            {wallet._id}
                        </h1>
                        <div class="text-2xl font-bold text-gray-700">
                            {`${wallet.balance} ${wallet.currency}`}
                        </div>
                    </div>
                    <div class="flex space-x-4 text-sm font-medium">
                        <div class="flex-auto flex space-x-4 mt-4">
                            <button
                            type="button"
                            onClick={handleAddMoney}
                            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-xl font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                            >
                            Add Money
                            </button>
                            <button
                            type="button"
                            onClick={handleTransferMoney}
                            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-xl font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                            >
                            Transfer Money
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}