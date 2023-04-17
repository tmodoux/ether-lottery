import "./App.css";
import React, { useEffect, useState } from "react";
import contract from "./ethereum/contract";
// @ts-ignore
import web3 from "./ethereum/web3";
// @ts-ignore
const { eth, utils } = web3;

const App = () => {
    const [manager, setManager] = useState("");
    const [players, setPlayers] = useState([]);
    const [balance, setBalance] = useState("");
    const [value, setValue] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function loadContract() {
            const manager = await contract.methods.manager().call();
            const players = await contract.methods.getPlayers().call();
            const balance = await eth.getBalance(contract.options.address);
            setManager(manager);
            setPlayers(players);
            setBalance(balance);
        }
        loadContract();
    }, []);

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const accounts = await eth.getAccounts();

        setMessage("Waiting to join the lottery...");

        await contract.methods.enter().send({
            from: accounts[0],
            value: utils.toWei(value, "ether"),
        });

        setMessage("You are now participating!");
    };

    const onClick = async () => {
        const accounts = await eth.getAccounts();

        setMessage("Picking a winner...");
        await contract.methods.pickWinner().send({
            from: accounts[0]
        });

        setMessage("A winner has been picked!");
    };

    return (
        <div className="App">
            <h2>Lottery Contract</h2>
            <hr />

            <p>This contract is managed by: <b>{manager}</b></p>
            <p>There are currently <b>{players.length}</b> player(s) competing to win <b>{utils.fromWei(balance, "ether")}</b> ether!</p>
            <form onSubmit={onSubmit}>
                <h4>Want to try your luck?</h4>
                <div>
                    <p>Amount of ether to bet:</p>
                    <input
                        value={value}
                        onChange={e => setValue(e.target.value)} />
                    <button>Play</button>
                </div>
            </form>
            <br />
            <span>
                <button onClick={onClick}>Pick a winner!</button>
            </span>
            <hr />

            <h2>{message}</h2>
        </div>
    );
}

export default App;
