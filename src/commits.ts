#! /usr/bin/env node

import { isCI } from "ci-info";
import { getCommitMessageExamples, getConfig, validateCommitConfig } from "@util/config";
import log from "@util/log";
import { isValidCommmitMessage } from "@util/validation";

const validate = (): void => {
  const config = getConfig();
  
  const commitSettings = validateCommitConfig(config.commits);
  if (isValidCommmitMessage(commitSettings)) {
    log('Commit message validated');
  } else {
    log('Commit message is not valid', ...getCommitMessageExamples(commitSettings));
    process.exit(1)
  }
}

!isCI && validate();