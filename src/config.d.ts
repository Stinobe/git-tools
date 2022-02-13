type GitToolConfig = {
  commits?: GitToolCommit[];
  branches?: GitToolBranch;
}

type GitToolBranch = {
  validation?: string[];
  examples?: GitToolExamples;
  ignore?: string[];
  ignoreExamples?: string[];
}

type GitToolExamples = string[];

type GitToolCommit = {
  branches?: string;
  validation?: string;
  examples?: GitToolExamples;
}