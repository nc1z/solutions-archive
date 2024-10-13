class ListNode {
  key: number | null;
  val: any;
  prev: ListNode | null;
  next: ListNode | null;

  constructor(key: number | null = null, val: any = null) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

export class LRUCache {
  private capacity: number;
  private cache: Map<number, ListNode>;
  private left: ListNode;
  private right: ListNode;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map<number, ListNode>();
    this.left = new ListNode();
    this.right = new ListNode();

    this.left.next = this.right;
    this.right.prev = this.left;
  }

  private remove(node?: ListNode | null): void {
    if (!node) return;

    const prev = node.prev!;
    const next = node.next!;
    prev.next = next;
    next.prev = prev;
  }

  private insert(node?: ListNode | null): void {
    if (!node) return;

    const prev = this.right.prev!;
    const next = this.right;
    prev.next = node;
    next.prev = node;
    node.prev = prev;
    node.next = next;
  }

  get(key: number): any {
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      this.remove(node);
      this.insert(node);
      return node?.val;
    }
    return -1;
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.remove(this.cache.get(key));
    }
    const newNode = new ListNode(key, value);
    this.cache.set(key, newNode);
    this.insert(newNode);

    if (this.cache.size > this.capacity) {
      const lru = this.left.next;
      this.remove(lru);
      if (lru && lru.key) {
        this.cache.delete(lru.key);
      }
    }
  }
}
