import defaultConfig from "@const/config";
import { fileExists, getFromPackageFile, getJSONFile, getRCFile } from "./files";
import log from "./log";

/**
 * Get the configuration for the Git tool
 * @returns {GitToolConfig} Configuration for Git helper
 */
export const getConfig = () => {
  let config: GitToolConfig = defaultConfig;
  if (fileExists(".gittoolrc")) {
    config = getRCFile();
    log("Using custom configuration file .gittoolrc");
  }
  else if (fileExists(".gittool.json")) {
    config = getJSONFile()
    log("Using custom configuration file .gittool.json");
  }
  else {
    const packageInfo = getFromPackageFile();
    if (packageInfo) {
      config = packageInfo;
      log("Using custom configuration file from package.json");
    } else {
      log("No custom config found. Using defaults.");
    }
  }

  return config;
}

/**
 * Validate & clean up configuration for commit messages
 * @param {GitToolCommit[]} config Configuration for commits
 * @returns {GitToolCommit[]} Returns cleaned up list of configuration for commits
 */
export const validateCommitConfig = (config?: GitToolCommit[]): GitToolCommit[] => {
  // Check if it's an array
  if (!Array.isArray(config)) {
    log(`'commits' should be an array of strings. Found ${typeof config}`);
    process.exit(1);
  }

  // Clean up config. Remove non-strings & empty strings from validation
  const cleanConfig = config.filter(branch => !!branch.validation && (typeof branch.validation === "string"));

  // Inform the user we removed some configuration because they were invalid
  if (cleanConfig.length && cleanConfig.length !== config.length) {
    log("Some commit message configurations were removed because they had no or an invalid validtion item");
  }
  
  // Inform the user that no validation will happen
  if (!cleanConfig.length) {
    log('No branch definitions found. Commit message rules will be applied to all branches')
  // Inform user if branches validation is something else than a string;
  } else {
    cleanConfig.forEach(conf => {
      if (typeof conf.branches !== "string") {
        log(`'commit.branches' should be of type string. Found '${typeof conf.branches}'`);
        process.exit(1);
      }
    });
  }

  // Return the cleaned up validation
  return cleanConfig;
}

/**
 * Validate & clean up configuration for branch names
 * @param config Git tool branch configuration
 * @returns {GitToolBranch} cleaned up branch configuration
 */
export const validateBranchConfig = (config?: GitToolBranch): GitToolBranch => {
  // If config does not exist, stop execution
  if (!config || !config.validation) {
    log('No configuration found for branches. All branches will be accepted');
    return {};
  }

  if (!Array.isArray(config.validation)) {
    log(`'branches.validation' should be of type Array. Found ${typeof config.validation}`);
    process.exit(1);
  }

  config.validation = config.validation.filter(validation => !!validation && (typeof validation === "string"));

  return config;
}

export const getCommitMessageExamples = (config: GitToolCommit[]): GitToolExamples => config.map(conf => ((Array.isArray(conf.examples)) && conf.examples) || []).flat();