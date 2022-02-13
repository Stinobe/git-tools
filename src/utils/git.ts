import { execFileSync } from "child_process";
import { readFileSync } from "fs";
import { fileExists, findGitDirectory } from "./files";

/**
 * Get the current branch name
 * @returns {string} branch name
 */
export const getCurrentBranchName = () => execFileSync("git", ["branch", "--show-current"], { encoding: "utf-8" }).trim();

/**
 * Get the current commit message
 * @returns {string} Current commit message
 */
export const getCommitMessage = () => {
  const gitDir = findGitDirectory();
  let message = "";
  if (fileExists(`${gitDir}/COMMIT_EDITMSG`)) {
    message = readFileSync(`${gitDir}/COMMIT_EDITMSG`, "utf-8").split("\n")[0];
  }
  return message;
}