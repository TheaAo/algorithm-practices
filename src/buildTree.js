/**
 * 剑指 offer 07. 重建二叉树
 * 输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。
 * 假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
 * 
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 * 
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */

 /** 递归 */
function buildTreeByRecursion(preorder, inorder) {
  if (!preorder || !preorder.length || !inorder ||!inorder.length || preorder.length !== inorder.length) return null;

  function buildTree(preStart, inStart, treeLength) {
    if (preStart < 0 || inStart < 0 || treeLength > inorder.length) {
      return null;
    }

    const root = new TreeNode(preorder[preStart]);

    if (treeLength === 1) {
      return root;
    }

    let rootInorderIndex = null;

    for (let i = inStart; i < inStart + treeLength; i++) {
      if (inorder[i] === root.val) {
        rootInorderIndex = i;
        break;
      }
    }

    if ( rootInorderIndex === null) {
      return null;
    }

    const leftLength = rootInorderIndex - inStart;
    const rightLength = treeLength - leftLength - 1;

    if (leftLength === 1) {
      root.left = new TreeNode(inorder[inStart]);
    } else if (leftLength > 1) {
      root.left = buildTree(preStart + 1, inStart, leftLength);
    }

    if (rightLength === 1) {
      root.right = new TreeNode(inorder[rootInorderIndex + 1]);
    } else if (rightLength > 1) {
      root.right = buildTree(preStart + leftLength + 1, rootInorderIndex + 1, rightLength); 
    }
    return root;
  }

  return buildTree(0, 0, preorder.length);
}

/** 迭代 */
function buildTreeByIteration(preorder, inorder) {
  if (!preorder || !preorder.length || !inorder ||!inorder.length) return null;

  const root = new TreeNode(preorder[0]);
  const stack = [root];
  let i = 0, j = 1;

  for (; j < preorder.length; j++) {
    let stackTop = stack[stack.length - 1];
    let newNode = new TreeNode(preorder[j]);
    if (stackTop.val !== inorder[i]) {
      stackTop.left = newNode;
    } else {
      let popNode;
      do {
        popNode = stack.pop();
        i++;
      } while (stack.length && stack[stack.length - 1].val === inorder[i])
      popNode.right = newNode;
    }
    stack.push(newNode);
  }

  return root;
}

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const preorder = [4, 1, 3, 2];
const inorder = [1, 2, 3, 4];

console.log(buildTreeByRecursion(preorder, inorder));
console.log(buildTreeByIteration(preorder, inorder));
