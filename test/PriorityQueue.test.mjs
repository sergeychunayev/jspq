import assert from 'assert';
import PriorityQueue from '../src/PriorityQueue.mjs';

describe('PriorityQueue', function () {
    it('must work for ascending order', () => {
        const pq = new PriorityQueue((a, b) => a < b);
        pq.push(2);
        pq.push(1);
        pq.push(2);
        assert.equal(pq.pop(), 1);
        assert.equal(pq.pop(), 2);
        assert.equal(pq.pop(), 2);
        assert.equal(pq.size, 0);
    });
    it('must work for descending order', () => {
        const pq = new PriorityQueue((a, b) => a > b);
        pq.push(1);
        pq.push(2);
        pq.push(1);
        assert.equal(pq.pop(), 2);
        assert.equal(pq.pop(), 1);
        assert.equal(pq.pop(), 1);
        assert.equal(pq.size, 0);
    });
    it('bounded must work for ascending order', () => {
        const pq = new PriorityQueue((a, b) => a < b, 3);
        pq.push(3);
        pq.push(2);
        pq.push(1);
        assert.equal(pq.size, 3);
        pq.push(2);
        assert.equal(pq.size, 3);
        assert.equal(pq.pop(), 1);
        assert.equal(pq.pop(), 2);
        assert.equal(pq.pop(), 2);
        assert.equal(pq.size, 0);
    });
    it('bounded must work for descending order', () => {
        const pq = new PriorityQueue((a, b) => a > b, 3);
        pq.push(2);
        pq.push(1);
        pq.push(3);
        assert.equal(pq.size, 3);
        pq.push(3);
        assert.equal(pq.size, 3);
        assert.equal(pq.pop(), 3);
        assert.equal(pq.pop(), 3);
        assert.equal(pq.pop(), 2);
        assert.equal(pq.size, 0);
    });
    it('peek must work', () => {
        const pq = new PriorityQueue((a, b) => a < b);
        pq.push(2);
        pq.push(1);
        pq.push(3);
        assert.equal(pq.size, 3);
        assert.equal(pq.peek(), 1);
        pq.push(0);
        assert.equal(pq.size, 4);
        assert.equal(pq.peek(), 0);
        assert.equal(pq.size, 4);
    });
});