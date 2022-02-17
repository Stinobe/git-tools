#! /usr/bin/env node

import log from "@util/log";
import { isCI } from "ci-info";
import { getCommitMessageExamples, getConfig, validateCommitConfig } from "@util/config";
import { isValidCommmitMessage } from "@util/validation";

const validate = (): void => {
  const config: GitToolConfig = getConfig();
  const commitSettings: GitToolCommit[] = validateCommitConfig(config.commits);
  
  if (isValidCommmitMessage(commitSettings)) {
    log('Commit message validated');
  } else {
    log('Commit message is not valid', ...getCommitMessageExamples(commitSettings));
    process.exit(1);
  }
}

!isCI && validate();