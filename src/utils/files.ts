import { existsSync, lstatSync, readFileSync } from "fs";
import { join } from "path";

/**
 * Find the git directory
 * @returns {string} Git directory
 */
export const findGitDirectory = (): string => {
  // Default path to .git
  let path = join(process.cwd(), '.git');

  // If the directory or file doesn't exist throw an error
  if (!existsSync(path)) throw new Error("Could not find .git director or file.");

  // If .git is a file, get the path to the .git directory from it
  if (!lstatSync(path).isDirectory()) {
    const alternativePath = readFileSync(path, "utf-8")
      .split(":")[1]
      .trim();
    path = join(path, alternativePath);

    if (!existsSync(path)) throw new Error(`Can't find git directory in ${path}`);
  }

  // Return the path
  return path;
}

/**
 * Check if a file exists on the root path
 * @param {string} name - Name of the file
 * @param {string} [root=process.cwd()] - Root path to the file
 * @returns {boolean} True if file exists, false if it doesn't
 */
export const fileExists = (name: string, root: string = process.cwd()): boolean => existsSync(join(root, name));

/**
 * Get the custom configuration RC file
 * @param {string} [name=".gittoolrc"]
 * @returns {GitToolConfig} Custom configuration
 */
export const getRCFile = (name = '.gittoolrc'): GitToolConfig => {
  // Create a place to store the configuration
  let config: GitToolConfig = {};
  // Set the path to the configuration file
  const path = join(process.cwd(), name);
  // Get contents from file
  const fileContent = readFileSync(path, "utf-8");
  // If file is not empty, parse JSON
  if (fileContent) config = JSON.parse(fileContent) as GitToolConfig;
  // return the configuration
  return config;
}

/**
 * Get config from JSON file
 * @param {string} name JSON configuration file
 * @returns {GitToolConfig} Configuration from JSON file
 */
export const getJSONFile = (name = ".gittool.json"): GitToolConfig => {
  let config: GitToolConfig = {};
  const path = join(process.cwd(), name);
  const fileContent = readFileSync(path, "utf-8");
  if (fileContent) config = JSON.parse(fileContent) as GitToolConfig;
  return config;
}

/**
 * Get settings from package.json
 * @returns {GitToolConfig | false}
 */
export const getFromPackageFile = (): GitToolConfig | false => {
  let config: GitToolConfig | false = false;
  const path = join(process.cwd(), "package.json");
  const fileContent = readFileSync(path, "utf-8");
  config = JSON.parse(fileContent).gittool || false;
  return config;
}