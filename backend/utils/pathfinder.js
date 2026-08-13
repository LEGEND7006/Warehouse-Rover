// utils/pathfinder.js

const ROWS = ['A', 'B', 'C'];
const COLS = [1, 2, 3, 4];
const MAX_X = COLS.length - 1;
const MAX_Y = ROWS.length - 1;

/**
 * Parses a node string like "A1" into coordinates {x, y}
 */
function parseNode(nodeStr) {
  const rowChar = nodeStr.charAt(0).toUpperCase();
  const colNum = parseInt(nodeStr.substring(1), 10);
  const y = rowChar.charCodeAt(0) - 'A'.charCodeAt(0);
  const x = colNum - 1;
  return { x, y };
}

/**
 * Converts coordinates {x, y} back to a node string like "A1"
 */
function toNodeString(x, y) {
  const rowChar = String.fromCharCode('A'.charCodeAt(0) + y);
  const colNum = x + 1;
  return `${rowChar}${colNum}`;
}

// Manhattan distance heuristic
function heuristic(nodeA, nodeB) {
  return Math.abs(nodeA.x - nodeB.x) + Math.abs(nodeA.y - nodeB.y);
}

// Get neighbors for a given node, skipping out-of-bounds and obstacles
function getNeighbors(node, obstacles = []) {
  const neighbors = [];
  const dirs = [
    { x: 0, y: -1 }, // up
    { x: 0, y: 1 },  // down
    { x: -1, y: 0 }, // left
    { x: 1, y: 0 }   // right
  ];

  for (const dir of dirs) {
    const nx = node.x + dir.x;
    const ny = node.y + dir.y;

    if (nx >= 0 && nx <= MAX_X && ny >= 0 && ny <= MAX_Y) {
      const neighborId = toNodeString(nx, ny);
      if (!obstacles.includes(neighborId)) {
        neighbors.push({ x: nx, y: ny, id: neighborId });
      }
    }
  }
  return neighbors;
}

/**
 * Generates a path using the A* Algorithm.
 * @param {string} startNode - e.g., "A1"
 * @param {string} destNode - e.g., "C4"
 * @param {string[]} obstacles - array of node strings e.g., ["B2", "B3"]
 */
function generatePath(startNode, destNode, obstacles = []) {
  if (startNode === destNode) return [startNode];

  const start = { ...parseNode(startNode), id: startNode };
  const dest = { ...parseNode(destNode), id: destNode };

  let openSet = [start];
  const cameFrom = new Map();

  const gScore = new Map();
  gScore.set(start.id, 0);

  const fScore = new Map();
  fScore.set(start.id, heuristic(start, dest));

  while (openSet.length > 0) {
    // Get node with lowest fScore
    openSet.sort((a, b) => (fScore.has(a.id) ? fScore.get(a.id) : Infinity) - (fScore.has(b.id) ? fScore.get(b.id) : Infinity));
    const current = openSet.shift();

    if (current.id === dest.id) {
      // Reconstruct path
      const path = [current.id];
      let currId = current.id;
      while (cameFrom.has(currId)) {
        currId = cameFrom.get(currId);
        path.unshift(currId);
      }
      return path;
    }

    const neighbors = getNeighbors(current, obstacles);
    for (const neighbor of neighbors) {
      const tentativeGScore = (gScore.has(current.id) ? gScore.get(current.id) : Infinity) + 1;

      if (tentativeGScore < (gScore.has(neighbor.id) ? gScore.get(neighbor.id) : Infinity)) {
        // This path to neighbor is better than any previous one
        cameFrom.set(neighbor.id, current.id);
        gScore.set(neighbor.id, tentativeGScore);
        fScore.set(neighbor.id, tentativeGScore + heuristic(neighbor, dest));
        
        if (!openSet.find(n => n.id === neighbor.id)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  // No path found (e.g., completely blocked by obstacles)
  return [];
}

module.exports = {
  generatePath
};
