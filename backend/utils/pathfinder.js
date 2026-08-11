// utils/pathfinder.js

/**
 * Parses a node string like "A1" into coordinates {x, y}
 * Assuming grid rows are A-C (mapped to 0-2) and columns are 1-4 (mapped to 0-3)
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

/**
 * Generates a simple path (Manhattan routing) from startNode to destNode.
 * It moves along the x-axis first, then the y-axis.
 */
function generatePath(startNode, destNode) {
  if (startNode === destNode) return [startNode];

  const start = parseNode(startNode);
  const dest = parseNode(destNode);
  const path = [startNode];

  let currentX = start.x;
  let currentY = start.y;

  // Move along X axis
  while (currentX !== dest.x) {
    if (currentX < dest.x) currentX++;
    else currentX--;
    path.push(toNodeString(currentX, currentY));
  }

  // Move along Y axis
  while (currentY !== dest.y) {
    if (currentY < dest.y) currentY++;
    else currentY--;
    path.push(toNodeString(currentX, currentY));
  }

  return path;
}

module.exports = {
  generatePath
};
