#! /usr/bin/env node

import { getConfig, validateBranchConfig } from "@util/config";
import log from "@util/log";
import { isValidBranchName } from "@util/validation";
import { isCI } from "ci-info";

const validate = () => {
  const config = getConfig();
  const branchSettings = validateBranchConfig(config.branches);

  if (isValidBranchName(branchSettings)) {
    log("Branch name is valid");
  } else {
    log("Branch name is not valid", ...(branchSettings.examples || []));
    process.exit(1);
  }
}

!isCI && validate();