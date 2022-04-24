import logo from './logo.svg';
import CryptoJS from 'crypto-js';
import {useEffect, useRef, useState} from "react";
import './App.css';

function App() {
    const [result, setResult] = useState('');
    const [inputText, setInputText] = useState('');
    const [showPasswordField, setShowPasswordField] = useState('');
    const password = useRef();

    useEffect(() => {
        const interval = setInterval(() => {
            password.current.value = "";
            setShowPasswordField('');
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const encrypt = (passphrase) => {
        const key = CryptoJS.PBKDF2(passphrase, window.atob(process.env.REACT_APP_SALT), {
            keySize: 512 / 32,
            iterations: 1000
        });
        const iv = CryptoJS.enc.Hex.parse(window.atob(process.env.REACT_APP_IV));
        const encrypted = CryptoJS.AES.encrypt(inputText, key, {iv: iv});
        setResult(encrypted.toString());
    };

    const decrypt = (passphrase) => {
        const key = CryptoJS.PBKDF2(passphrase, window.atob(process.env.REACT_APP_SALT), {
            keySize: 512 / 32,
            iterations: 1000
        });
        const iv = CryptoJS.enc.Hex.parse(window.atob(process.env.REACT_APP_IV));
        const decrypted = CryptoJS.AES.decrypt(inputText, key, {iv: iv});
        setResult(decrypted.toString(CryptoJS.enc.Utf8));
    };

    const copy = () => {
        navigator.clipboard.writeText(result);
    }

    return (
        <>
            <h1> Let's share secrets </h1>
            <label>
                <textarea name="input" id="inputValue" placeholder="input" rows="10" cols="50"
                          value={inputText}
                          onChange={(event) => setInputText(event.target.value)}/>
            </label>
            <br/>
            <div className="buttons">
                <button name="encrypt" onClick={() => setShowPasswordField("encrypt")}>Encrypt</button>
                <button name="decrypt" onClick={() => setShowPasswordField("decrypt")}>Decrypt</button>
            </div>
            <br/>
            <label className={showPasswordField ? 'show' : 'hide'}>
                <input type="password" name="password" placeholder="secret" id="secretText" ref={password}
                       onKeyDown={(event) => {
                           if (event.key == 'Enter') {
                               if (showPasswordField === 'encrypt') encrypt(event.target.value);
                               else if (showPasswordField === 'decrypt') decrypt(event.target.value);
                           }
                       }
                       }/>
            </label>
            <br/>
            <label>
                <textarea name="result" id="result" placeholder="result" rows="10" cols="50"
                          value={result}
                          disabled/>
            </label>
            <button name="copy" onClick={copy}>Copy</button>
        </>
    );
}

export default App;