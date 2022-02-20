type GitToolConfig = {
  commits?: GitToolCommit[];
  branches?: GitToolBranch;
}

type GitToolBranch = {
  validation?: RegExp[];
  examples?: GitToolExamples;
  ignore?: string[];
  ignoreExamples?: string[];
}

type GitToolExamples = string[];

type GitToolCommit = {
  branches?: RegExp;
  validation?: RegExp;
  examples?: GitToolExamples;
}