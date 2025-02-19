import { QueryClient, useQuery } from '@tanstack/react-query'
import React, { useState, useEffect } from 'react'
import { currencyConverter } from '../api/apiPost'

const Currency = () => {

    const [data, setData] = useState({
        amount: 0,
        loading: false,
        fromCurrency: "USD",
        toCurrency: "INR",
        error: null,
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setData((prevData) => ({ ...prevData, [name]: value }))
    }


    const { data: convertAmount, refetch } = useQuery({
        // always use the data perimeter we cannot use the another variables
        queryKey: ["currency", data.amount, data.fromCurrency, data.toCurrency],
        queryFn: () => currencyConverter(data.amount, data.fromCurrency, data.toCurrency),
        enabled: false,
    });

    console.log(convertAmount)

    const handleConvertCurrency = () => {
        refetch()
    }

    return (
        <div>

            <section className="currency-converter">
                <div className="currency-div">
                    <h1>Currency Converter</h1>
                    <div>
                        <label htmlFor="currency_amount">
                            Amount:
                            <input
                                type="number"
                                id="currency_amount"
                                name='amount'
                                value={data.amount}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="currency-selector">
                        <div>
                            <label>
                                From:
                                <select name='fromCurrency'
                                    value={data.fromCurrency}
                                    onChange={handleChange}
                                >
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="INR">INR</option>
                                    <option value="GBP">GBP</option>
                                    <option value="AUD">AUD</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>
                                To:
                                <select name='toCurrency'
                                    value={data.toCurrency}
                                    onChange={handleChange}
                                >
                                    <option value="INR">INR</option>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                    <option value="AUD">AUD</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <button
                        disabled={data.loading || data.amount <= 0}
                        onClick={handleConvertCurrency}
                    >
                        {data.loading ? "Converting.." : "Convert"}
                    </button>

                    <hr />
                    {convertAmount && (
                        <div>
                            <h2>
                                {data.amount} {data.fromCurrency} = {convertAmount.toFixed(2)}
                                {data.toCurrency}
                            </h2>
                        </div>
                    )}

                    {data.error && <p>{data.error}</p>}
                </div>
            </section>
        </div>
    )
}

export default Currency
