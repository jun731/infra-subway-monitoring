import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 50 },
        { duration: '1m', target: 100 },
        { duration: '1m', target: 200 },
        { duration: '1m', target: 300 },
        { duration: '1m', target: 400 },
        { duration: '1m', target: 500 },
        { duration: '1m', target: 600 },
        { duration: '1m', target: 700 },
        { duration: '1m', target: 800 },
        { duration: '1m', target: 900 },
        { duration: '1m', target: 1000 },
        { duration: '1m', target: 1100 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<150'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<150'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://jun731.p-e.kr/';

export default function ()  {

    var payload = JSON.stringify({
        name: Date.now()
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };


    let stationsRes = http.post(`${BASE_URL}/stations`, payload, params);

    check(stationsRes, {
        'stations in successfully': (resp) => resp.json('id') !== '',
    });

    sleep(1);
};
