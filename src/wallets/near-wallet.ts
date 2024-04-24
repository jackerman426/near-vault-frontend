'use client';

// near api js
import { providers } from 'near-api-js'

// wallet selector
import { distinctUntilChanged, map } from 'rxjs'
import '@near-wallet-selector/modal-ui/styles.css'
import { setupModal } from '@near-wallet-selector/modal-ui'
import {setupWalletSelector, Wallet} from '@near-wallet-selector/core'
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet'
import { NetworkId } from "@near-wallet-selector/core"

const THIRTY_TGAS = '30000000000000'
const NO_DEPOSIT = '0'


interface ViewMethodArgs {
    contractId: string
    method: string
    args?: Record<string, unknown> // or whatever type your args are supposed to be
}

interface CustomQueryResponse {
    result: string // Adjust this based on the actual structure of the response
    block_height: number
    block_hash: string
    // Add other properties if needed
}

interface CallMethodArgs {
    contractId: string
    method: string
    args?: Record<string, unknown>
    gas?: string
    deposit?: string
}

export class NearWallet {
    /**
     * @constructor
     * @param {string} networkId - the network id to connect to
     * @param {string} createAccessKeyFor - the contract to create an access key for
     * @example
     * const wallet = new Wallet({ networkId: 'testnet', createAccessKeyFor: 'contractId' });
     * wallet.startUp((signedAccountId) => console.log(signedAccountId));
     */
    accountId: string | undefined
    createAccessKeyFor: string | undefined
    selectedWallet: Wallet | undefined
    selector

    constructor({ networkId = 'testnet', createAccessKeyFor = "" }) {
        this.accountId = '';
        this.createAccessKeyFor = createAccessKeyFor
        // Convert networkId to Network type if it's a string
        // const network: NetworkId = networkId;
        const network: NetworkId = networkId as NetworkId

        this.selector = setupWalletSelector({
            network,
            modules: [setupMyNearWallet()]
        });
    }

    /**
     * To be called when the website loads
     * @param accountChangeHook - a function that is called when the user signs in or out
     * @returns Promise<string> - the accountId of the signed-in user
     */
    startUp = async (accountChangeHook: (accountId: string | undefined) => void): Promise<string> => {
        const walletSelector = await this.selector
        const isSignedIn = walletSelector.isSignedIn()

        if (isSignedIn) {
            this.accountId = walletSelector.store.getState().accounts[0].accountId
            this.selectedWallet = await walletSelector.wallet()
        }

        walletSelector.store.observable
            .pipe(
                map(state => state.accounts),
                distinctUntilChanged()
            )
            .subscribe(accounts => {
                const signedAccount = accounts.find((account) => account.active)?.accountId
                console.log('Observable triggered -> ' + signedAccount)
                accountChangeHook(signedAccount)
            });

        return this.accountId || ''
    }


    /**
     * Displays a modal to log in the user
     */
    signIn = async () => {
        if( this.createAccessKeyFor ){
            const modal = setupModal(await this.selector, { contractId: this.createAccessKeyFor })
            modal.show()
        }
    }

    /**
     * Logout the user
     */
    signOut = async () => {
        if (this.selectedWallet) {
            await this.selectedWallet.signOut()
            this.selectedWallet = this.accountId =  undefined //here it was also deleting this.createAccessKeyFor
        }
    }

    /**
     * Makes a read-only call to a contract
     * @param {Object} viewMethodArgs
     * @param {string} viewMethodArgs.contractId - The contract's account id
     * @param {string} viewMethodArgs.method - The method to call
     * @param {Object} viewMethodArgs.args={} - The arguments to pass to the method (optional)
     * @returns {Promise<any>} - The result of the method call
     */
    viewMethod = async ({ contractId, method, args = {} }: ViewMethodArgs): Promise<any> => {
        const walletSelector = await this.selector
        const { network } = walletSelector.options
        const provider = new providers.JsonRpcProvider({ url: network.nodeUrl })

        let res = await provider.query<CustomQueryResponse>({
            request_type: 'call_function',
            account_id: contractId,
            method_name: method,
            args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
            finality: 'optimistic',
        })
        return JSON.parse(Buffer.from(res.result).toString())
    }

    /**
     * Makes a call to a contract
     * @param {Object} callMethodArgs
     * @param {string} callMethodArgs.contractId - the contract's account id
     * @param {string} callMethodArgs.method - the method to call
     * @param {Object} callMethodArgs.args - the arguments to pass to the method
     * @param {string} callMethodArgs.gas - the amount of gas to use
     * @param {string} callMethodArgs.deposit - the amount of yoctoNEAR to deposit
     * @returns {Promise<Transaction>} - the resulting transaction
     */
    callMethod = async ({ contractId, method, args = {}, gas = THIRTY_TGAS, deposit = NO_DEPOSIT }: CallMethodArgs): Promise<any> => {
        // Sign a transaction with the "FunctionCall" action
        if (this.selectedWallet){
            return await this.selectedWallet.signAndSendTransaction({
                signerId: this.accountId,
                receiverId: contractId,
                actions: [
                    {
                        type: 'FunctionCall',
                        params: {
                            methodName: method,
                            args,
                            gas,
                            deposit,
                        },
                    },
                ],
            })
        }
        console.log("No wallet available")

    }

    /**
     * Makes a call to a contract
     * @param {string} txhash - the transaction hash
     * @returns {Promise<JSON.value>} - the result of the transaction
     */
    // getTransactionResult = async (txhash) => {
    //     const walletSelector = await this.selector;
    //     const { network } = walletSelector.options;
    //     const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });
    //
    //     // Retrieve transaction result from the network
    //     const transaction = await provider.txStatus(txhash, 'unused');
    //     return providers.getTransactionLastResult(transaction);
    // };
}
