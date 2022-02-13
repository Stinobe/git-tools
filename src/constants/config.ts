const defaultConfig: GitToolConfig = {
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
    ],
  }
}

export default defaultConfig;