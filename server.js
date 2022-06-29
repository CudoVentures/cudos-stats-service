const express = require('express');
const { request, gql } = require('graphql-request');
const numeral = require('numeral');

require('dotenv').config();

const token = require('./token');

const LISTEN_PORT = process.env.PORT || 3000;
const HASURA_URL = process.env.HASURA_URL;

if (!HASURA_URL) {
    console.error('Hasura url not set');
    return;
}

const app = express();

app.listen(LISTEN_PORT, () => {
    console.log(`listening on ${LISTEN_PORT}`);
});

app.get('/supply', async (req, res) => {
    const explorer = req.query.explorer;

    if (explorer == 'cmc') {
        const supply = await getSupply();

        res.set('Content-Type', 'text/html');
        res.send(200, numeral(token.FormatToken(supply, 'acudos').value).value());
    }
});

const getSupply = async () => {
    const query = gql`query MarketData($denom: String) {
        communityPool: community_pool(order_by: {height: desc}, limit: 1) {
          coins
        }
        inflation: inflation(order_by: {height: desc}, limit: 1) {
          value
        }
        tokenPrice: token_price(where: {unit_name: {_eq: $denom}}) {
          marketCap: market_cap
          price
        }
        supply {
          coins
        }
        adjustedSupply: adjusted_supply(order_by: {height: desc}, limit: 1) {
          value
        }
        apr: apr(order_by: {height: desc}, limit: 1) {
          value
        }
        bondedTokens: staking_pool(order_by: {height: desc}, limit: 1) {
          bonded_tokens
        }
    }`

    const res = await request(HASURA_URL, query, {denom: 'cudos'});
    return res.adjustedSupply[0].value;
}