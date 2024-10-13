import { LRUCache } from "./LRUCache";

// Create an instance of LRUCache with a capacity of 2
const lruCache = new LRUCache(2);

// Add some items to the cache
console.log("Put (1, 1)");
lruCache.put(1, 1); // Cache: {1=1}
console.log("Put (2, 2)");
lruCache.put(2, 2); // Cache: {1=1, 2=2}

// Access item with key 1 (should return 1 and make it most recently used)
console.log("Get (1):", lruCache.get(1)); // Output: 1, Cache: {2=2, 1=1}

// Add another item (3, 3) - this will cause key 2 to be evicted due to capacity
console.log("Put (3, 3)");
lruCache.put(3, 3); // Cache: {1=1, 3=3}

// Try to access item with key 2 (should return -1, since it was evicted)
console.log("Get (2):", lruCache.get(2)); // Output: -1

// Access item with key 3 (should return 3)
console.log("Get (3):", lruCache.get(3)); // Output: 3

// Add another item (4, 4) - this will cause key 1 to be evicted
console.log("Put (4, 4)");
lruCache.put(4, 4); // Cache: {3=3, 4=4}

// Access item with key 1 (should return -1, since it was evicted)
console.log("Get (1):", lruCache.get(1)); // Output: -1

// Access item with key 3 (should return 3)
console.log("Get (3):", lruCache.get(3)); // Output: 3

// Access item with key 4 (should return 4)
console.log("Get (4):", lruCache.get(4)); // Output: 4
