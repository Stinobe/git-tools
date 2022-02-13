import { getCommitMessage, getCurrentBranchName } from "./git";

/**
 * Check if commit message is valid
 * @param {GitToolCommit[]} rules List of rules for commit messages
 * @returns {boolean} Return true if commit message passes validation
 */
export const isValidCommmitMessage = (rules: GitToolCommit[]): boolean => {
  // Get the commit message
  const commitMsg = getCommitMessage();

  // Get the branch name
  const branchName = getCurrentBranchName();

  // By default the commit message is accepted
  let accepted = true;

  // Loop over each rule
  rules.forEach(rule => {
    // Check if check should be applied to the current rule based on branch name
    const matchBranch = rule.branches ? new RegExp(rule.branches).test(branchName) : true;

    // Check validation
    if (matchBranch && rule.validation) accepted = new RegExp(rule.validation).test(commitMsg) && accepted;
  });
  
  // Return the info
  return accepted;
}

/**
 * Check if the branchname is valid
 * @param {GitToolBranch} rules Configured rules for branch nameing
 * @returns {boolean} Returns true if branch name is valid
 */
export const isValidBranchName = (rules: GitToolBranch): boolean => {
  // Get the branch name
  const branchName = getCurrentBranchName();

  // By default branch name is accepted
  let accepted = true;

  // Loop over each rule
  rules.validation?.forEach(rule => {
    accepted = new RegExp(rule).test(branchName) && accepted;
  });

  // Return the info
  return accepted
}