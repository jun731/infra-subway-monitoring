import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 },
        { duration: '2m', target: 160 },
        { duration: '3m', target: 200 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<150'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<150'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://jun731.p-e.kr/';

export default function ()  {
    let myObjects = http.get(`${BASE_URL}/paths?source=1&target=4`).json();
    check(myObjects, { 'retrieved member': (obj) => obj.stations.length !== 0 });
    sleep(1);
};
