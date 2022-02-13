# Git Helpers

An tool to help validate commit messages before committing & branch names before pushing them.  
The tool will not run in CI thanks to [ci-info](https://www.npmjs.com/package/ci-info)

> To be used with [Husky](https://typicode.github.io/husky/#/)

## Installation

```bash
npm install @stinobe/git-tools
```

## Setup

> Assuming you haven't installed and/or configured Husky.

Add `precommit` and `prepublish` scripts in `package.json`

```bash
# Set script for commits
npm set-script precommit "stinobe-commit-message"

# Set script for branches
npm set-script prepush "stinobe-branch-name"
```

**If Husky not yet installed**

```bash
# Install Husky
npm install husky --save-dev

# Enable Git hook
npx husky install

# Automatically enable Git hooks after install
npm set-script prepare "husky install"
```

Add previously created NPM scripts to Husky

```bash
# Inform Husky of pre commit script
npx husky add .husky/pre-commit "npm run precommit"

# Inform Husky of pre publish script
npx husky add .husky/pre-publish "npm run prepublish"
```

## Configuration

A default configuration is built in, but you can overwrite those by a `.gittoolrc` , `.gittool.json` or by adding a `gittool` property in the `package.json` file _(in order of hierarchy)_.

Configuration exists of [Commit message configuration](#commit-message-configuration) and [Branch name configuration](#branch-name-configuration).

```json
{
  "commits": [],
  "branches": {}
}
```

> All settings are optional

### Commit message configuration

Commit settings exists of an array containing differenc configuration for different branch names

| Property   | Type       | Description                                              |
| ---------- | ---------- | -------------------------------------------------------- |
| branches   | `string`   | Regex to check if rules apply on current branch          |
| validation | `string`   | Regex where commit message will be tested against        |
| examples   | `string[]` | Will be printed out in the console when validation fails |

How the default commit message settings look like

```json
{
  "commits": [
    {
      "branches": ".*",
      "validation": "([Cc]lose[sd]?|[Ff]ix(e[sd])?|[Rr]esolve[sd]?) #[1-9]+\\d*",
      "examples": [
        "Commit message contains one of:",
        "\tclose #[issue-number]",
        "\tcloses #[issue-number]",
        "\tclosed #[issue-number]",
        "\tfix #[issue-number]",
        "\tfixes #[issue-number]",
        "\tfixed #[issue-number]",
        "\tresolve #[issue-number]",
        "\tresolves #[issue-number]",
        "\tresolved #[issue-number]"
      ]
    }
  ],
  "branches": {}
}
```

> `branches` property can be an empty string or be left out but will cause a log in the output.

### Branch name configuration

| Property   | Type       | Description                                                      |
| ---------- | ---------- | ---------------------------------------------------------------- |
| validation | `string[]` | List of regular expressions with allowed branch names            |
| examples   | `string[]` | List of example branch names, will be logged if validation fails |

How the default branch name settings look like

```json
{
  "commit": [],
  "branches": {
    "validation": [
      "^(feature|bug|docs|hotfix)/(\\d+)-[a-z-]+",
      "^wip/[a-z1-9]+[a-z0-9]*"
    ],
    "examples": [
      "feature/[issue_number]-[subject]",
      "bug/[issue_number]-[subject]",
      "docs/[issue_number]-[subject]",
      "hotfix/[issue_number]-[subject]"
    ]
  }
}
```
