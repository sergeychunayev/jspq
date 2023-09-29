/**
 * @template T
 * Priority queue.
 *
 * Example of ascending order:
 *
 * ```js
 * const pq = new PriorityQueue((a, b) => a < b);
 * pq.push(2);
 * pq.push(1);
 * assert.equal(pq.pop(), 1);
 * assert.equal(pq.pop(), 2);
 * assert.equal(pq.size, 0);
 * ```
 * Example of descending order:
 *
 * ```js
 * const pq = new PriorityQueue((a, b) => a > b);
 * pq.push(1);
 * pq.push(2);
 * assert.equal(pq.pop(), 2);
 * assert.equal(pq.pop(), 1);
 * assert.equal(pq.size, 0);
 * ```
 *
 * Example of bounded must work for ascending order:
 *
 * ```js
 * const pq = new PriorityQueue((a, b) => a < b, 3);
 * pq.push(3);
 * pq.push(2);
 * pq.push(1);
 * assert.equal(pq.size, 3);
 * pq.push(2);
 * assert.equal(pq.size, 3);
 * assert.equal(pq.pop(), 1);
 * assert.equal(pq.pop(), 2);
 * assert.equal(pq.pop(), 2);
 * ```
 *
 */
class PriorityQueue {
  /**
   * The default size of the queue. It will grow if the queue is unlimited.
   *
   * @type {number}
   */
  static #DEFAULT_SIZE = 32;

  /**
   * @type {function(T, T): boolean}
   */
  #less

  /**
   * @type number
   */
  #limit

  /** @type {T[]} */
  #heap

  /**
   * @type number
   */
  #size

  /**
   * Creates a new instance.
   *
   * If the optional `limit` is specified, the queue becomes a bounded priority queue.
   *
   * @param {function(T, T): boolean} less - the comparator
   * @param {number | undefined} [limit] - the limit, optional
   */
  constructor(less, limit) {
    this.#less = less;
    this.#limit = limit;
    this.#heap = new Array(limit ? limit + 2 : PriorityQueue.#DEFAULT_SIZE);
    this.#size = 0;
  }

  /**
   * Push the element into the queue.
   *
   * @param {T} v - the value to push
   */
  push(v) {
    this.#size++;
    const sz = this.#size;
    this.#heap[sz] = v;
    if (sz > 1) {
      this.#bubbleUp(sz);
    }
    if (sz === this.#heap.length - 1) {
      if (this.#limit) {
        if (sz > 1 && sz % 2 !== 0) {
          const l = sz - 1;
          if (this.#gt(l, sz)) {
            this.#heap[l] = this.#heap[sz];
          }
        }
        this.#heap[sz] = undefined;
        this.#size--;
      } else {
        this.#heap.length >>>= 2;
      }
    }
  }

  /**
   * Removes the top element and returns it.
   *
   * @returns {T}
   */
  pop() {
    const min = this.#heap[1];
    this.#heap[1] = this.#heap[this.#size];
    this.#heap[this.#size] = undefined;
    this.#sinkDown(1);
    this.#size--;
    return min;
  }

  /**
   * Returns the top element without removing it.
   *
   * @returns {T}
   */
  peek() {
    return this.#heap[1];
  }

  /**
   * THe size of the queue.
   *
   * @returns {number}
   */
  get size() {
    return this.#size;
  }

  /**
   * Returns true if the queue is empty, false otherwise.
   *
   * @returns {boolean}
   */
  isEmpty() {
    return this.#size === 0;
  }

  /**
   * Returns all elements in the queue without removing them.
   *
   * The order is unpredictable.
   *
   * @returns {T[]}
   */
  getAll() {
    return this.#heap.slice(1, this.#size + 1);
  }

  /**
   *
   * @param {number} i
   */
  #bubbleUp(i) {
    let ci = i;
    let pi = ci >>> 1;
    while (pi > 0 && this.#gt(pi, ci)) {
      this.#swap(ci, pi);
      ci = pi;
      pi >>>= 1;
    }
  }

  /**
   *
   * @param {number} i
   */
  #sinkDown(i) {
    let min = i;
    const l = i << 1;
    const r = l + 1;
    if (l < this.#size && this.#gt(min, l)) {
      min = l;
    }
    if (r < this.#size && this.#gt(min, r)) {
      min = r;
    }
    if (min !== i) {
      this.#swap(i, min);
      this.#sinkDown(min);
    }
  }

  /**
   * Greater than
   *
   * @param {number} i
   * @param {number} j
   * @returns {boolean}
   */
  #gt(i, j) {
    return !this.#less(this.#heap[i], this.#heap[j])
  }

  /**
   *
   * @param {number} i
   * @param {number} j
   */
  #swap(i, j) {
    const tmp = this.#heap[i];
    this.#heap[i] = this.#heap[j];
    this.#heap[j] = tmp;
  }
}

export default PriorityQueue;